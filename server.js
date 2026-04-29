const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/shorten", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    console.log("Shortening URL:", url);

    const formData = new URLSearchParams();
    formData.append("url", url);

    const response = await fetch("https://cleanuri.com/api/v1/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    console.log("Status:", response.status);

    const text = await response.text();
    console.log("Raw response:", text);

    const data = JSON.parse(text);
    res.json(data);
  } catch (error) {
    console.error("Full error:", error); // 👈 prints full error object
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
