const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

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

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});