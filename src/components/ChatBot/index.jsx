import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Send user message to the backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/api/chatbot", {
        message: input,
      });

      const botMessage = { text: response.data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        text: "Oops! Something went wrong. Please try again later.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  return (
    <div className="bg-base-200 p-4 rounded-lg shadow-md relative">
      <h1 className="text-2xl text-center my-3 font-bold uppercase">
        Your Personal Budget Planner
      </h1>
      <div className="h-96 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[75%] break-words ${
                msg.sender === "user"
                  ? "bg-primary text-primary-content"
                  : "bg-base-100 text-base-content"
              }`}
            >
              {msg.sender === "bot" ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-4">
        <input
          type="text"
          className="input input-bordered w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me to plan your budget..."
        />
        <button className="btn btn-primary ml-2" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
