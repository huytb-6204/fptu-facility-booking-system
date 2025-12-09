const express = require("express");
const NotificationLog = require("../models/NotificationLog");
const router = express.Router();

router.post("/", async (req, res) => res.json(await NotificationLog.create(req.body)));
router.get("/", async (req, res) => res.json(await NotificationLog.find().populate("user")));

module.exports = router;
