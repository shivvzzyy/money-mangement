import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
const openai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/", async (req, res) => {
  const { msg } = req.body;

  try {
    const model = openai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);
    const response = result.response;
    const text = response.text();
    res.json({ text });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default app;
