"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const app = express();

async function loadDatabase(name) {
    let db = {};
    try {
        db = await fs.readJson(`./databases/${name}.json`);
    } catch (error) {
        switch (error.errno) {
            case -4058: // File not found
                await fs.writeJSON(`./databases/${name}.json`, {});
                break;
            default:
                break;
        }
    }
    return db;
}

async function saveDatabase(name, value) {
    let db = await loadDatabase(name);
    await fs.writeJSON(`./databases/${name}.json`, { ...db, ...value });
}

async function credentialsPage(req, res) {
    let credentials = await loadDatabase("credentials");
    let saved = Boolean(req.query.success);
    res.render("credentials.ejs", { credentials, saved });
}

function saveCredentials(req, res) {
    console.log(req.body);
    res.redirect("/credentials?success=1");
}

async function advertisementsPage(req, res) {
    let advertisements = await loadDatabase("advertisements");
    res.render("advertisements.ejs", { advertisements });
}

async function templatesPage(req, res) {
    let templates = await loadDatabase("templates");
    res.render("templates.ejs", { templates });
}

(() => {
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ "extended": true }));
    app.get("/", (req, res) => res.render("index.ejs"));

    app.get("/credentials", credentialsPage);
    app.post("/credentials", saveCredentials);

    app.get("/advertisements", advertisementsPage);
    app.get("/templates", templatesPage);

    app.listen(8080, () => {
        console.log("App running at http://localhost:8080");
    });
})();
