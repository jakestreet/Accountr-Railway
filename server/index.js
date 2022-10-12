// server/index.js
const cors = require("cors");
const path = require('path');

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.post("/send-email", (req, res) => {
    const body = req.body;
    body.subject = "Subject replaced by server";
    res.json(body);
})
  
app.listen(PORT, () => {
console.log(`Server listening on ${PORT}`);
});