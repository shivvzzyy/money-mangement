import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful financial planner." },
        { role: "user", content: message },
      ],
    });
    console.log(response.choices[0].message.content);
    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default app;
