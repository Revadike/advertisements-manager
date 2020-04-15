"use strict";

const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ "extended": true }));
app.use(require("./controllers"));

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
});
