import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Krijo clientin e GenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// Endpoint i testit
app.get("/", (req, res) => {
  res.send("Serveri po punon 🚀");
});

// Endpoint për chat
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message
    });

app.post("/chat", (req, res) => {
  res.json({ reply: "Test OK" });
});

    res.json({
      reply: response.text
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
