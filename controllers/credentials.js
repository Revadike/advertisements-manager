"use strict";

const express = require("express");
const dot = require("dot-object");
const Database = require("../models/Database");
const router = express.Router();

router.post("/", async(req, res) => {
    try {
        await Database.set("credentials", dot.object(req.body));
        res.redirect("/credentials?success=1");
    } catch (error) {
        console.log(error);
        res.status(500);
        res.redirect("/");
    }
});

router.get("/", async(req, res) => {
    let credentials = await Database.get("credentials");
    let saved = Boolean(req.query.success);
    res.render("credentials", { credentials, saved });
});

module.exports = router;
