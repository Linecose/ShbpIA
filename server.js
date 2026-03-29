app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash",
      contents: message
    });

    const text = response?.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({
      reply: text || "Nuk mora përgjigje"
    });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});