"use strict";

const express = require("express");
const router = express.Router();

router.use("/advertisements", require("./advertisements"));
router.use("/credentials", require("./credentials"));
router.use("/templates", require("./templates"));
router.get("/", (req, res) => {
    res.render("index.ejs");
});

module.exports = router;
