import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const BOT_ID = "LBtCqLjQExxojWIj5bsabdNxDKB";
const API_KEY = "bp_bak_LBtCqLjQExxojWIj5bsabdNxDKB_ijXru1Q-";
const BOT_API_URL = `https://cdn.botpress.cloud/api/v1/bots/${BOT_ID}/converse`;

app.post("/api/send", async (req, res) => {
  const { sessionId, text } = req.body;

  try {
    const response = await fetch(`${BOT_API_URL}/${sessionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ type: "text", text }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to reach bot." });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
