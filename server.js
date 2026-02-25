const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, "public")));

// POST endpoint for report submission
app.post("/submit-report", (req, res) => {
    const { location, issue, observation } = req.body;

    const reportContent = `
GANGA RIVER WATER QUALITY REPORT
----------------------------------
Location: ${location}
Issue Type: ${issue}
Observation: ${observation}
Date: ${new Date().toLocaleString()}
----------------------------------
    `;

    fs.writeFileSync("report.txt", reportContent);

    res.json({ message: "Report saved successfully!" });
});

// Default route to serve index.html for any unknown route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Use PORT provided by Vercel or default 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

