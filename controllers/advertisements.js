"use strict";

const express = require("express");
const Database = require("../models/Database");
const router = express.Router();

router.get("/", async(req, res) => {
    let advertisements = await Database.get("advertisements");
    res.render("advertisements.ejs", { advertisements });
});

module.exports = router;
