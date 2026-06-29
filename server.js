import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app  = express();
const port = process.env.PORT || 3000;
const ai   = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Mesazhi është bosh." });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message
    });

    const text = response.text;

    res.json({ reply: text || "Nuk mora përgjigje." });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`ShbpIA server running on port ${port}`);
});
