import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConfig from "./config/db.config.js";
import auth from "./routes/auth.routes.js";
import expense from "./routes/expense.routes.js";
import chatbot from "./routes/chatbot.routes.js";

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3006",
    credentials: true,
  })
);

dbConfig();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", auth);
app.use("/api/expense", expense);
app.use("/api/chatbot", chatbot);

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
  console.log(`http://localhost:${process.env.PORT || 3000}`);
});
