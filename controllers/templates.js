"use strict";

const express = require("express");
const Database = require("../models/Database");
const router = express.Router();

router.get("/", async(req, res) => {
    let templates = await Database.get("templates");
    res.render("templates.ejs", { templates });
});

module.exports = router;
