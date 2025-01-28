import express from "express";
import bcrypt from "bcryptjs";
import UserModel from "../models/User.model.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

app.post("/register", async (req, res) => {
  const { form } = req.body;
  console.log(form.password);
  const existingUser = await UserModel.findOne({ email: form.email });
  if (existingUser) {
    return res.json({ message: "User Already Exists" }).status(400);
  }
  try {
    const encryptedPassword = await bcrypt.hashSync(form.password);
    console.log(encryptedPassword);
    const newUser = new UserModel({
      name: form.name,
      email: form.email,
      password: encryptedPassword,
    });
    await newUser.save();
    return res.status(200).json({ message: "User Created Successfully" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const { form } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email: form.email });
    if (!existingUser) {
      return res.json({ message: "User Not Found" }).json(404);
    }
    const isPasswordValid = bcrypt.compareSync(
      form.password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const payload = {
      id: existingUser._id,
      email: existingUser.email,
      name: existingUser.name,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    return res.json({
      message: "Login successful",
      user: {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Something went wrong" }).status(500);
  }
});

app.get("/verify", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId, "-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error verifying user:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default app;
