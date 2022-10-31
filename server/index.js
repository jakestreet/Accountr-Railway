//server/index.js
require('dotenv').config();

const cors = require("cors");
const path = require('path');
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/build')));

//routes
require('./routes/email')(app);

  
app.listen(PORT, () => {
console.log(`Server listening on ${PORT}`);
});