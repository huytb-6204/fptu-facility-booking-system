const express = require("express");
const NotificationTemplate = require("../models/NotificationTemplate");
const router = express.Router();

router.post("/", async (req, res) => res.json(await NotificationTemplate.create(req.body)));
router.get("/", async (req, res) => res.json(await NotificationTemplate.find()));
router.put("/:id", async (req, res) => res.json(await NotificationTemplate.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete("/:id", async (req, res) => res.json(await NotificationTemplate.findByIdAndDelete(req.params.id)));

module.exports = router;
