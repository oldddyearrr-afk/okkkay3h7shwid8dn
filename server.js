import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.static("public"));

app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.sendStatus(400);

  try {
    const r = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*"
      }
    });
    res.sendStatus(r.ok ? 200 : 502);
  } catch {
    res.sendStatus(502);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on", PORT));
