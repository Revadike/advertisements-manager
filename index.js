"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const app = express();

async function loadDatabases() {
    let credentials = await fs.readJson("./databases/credentials.json");
    return credentials;
}

(async() => {
    let { "credentials": creds, "advertisements": ads, templates } = await loadDatabases();
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ "extended": true }));
    app.get("/", (req, res) => {
        res.render("index.ejs", { "variable": {} });
    });
})();
