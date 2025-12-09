const express = require("express");
const Feature = require("../models/Feature");
const router = express.Router();

router.post("/", async (req, res) => res.json(await Feature.create(req.body)));
router.get("/", async (req, res) => res.json(await Feature.find()));
router.get("/:id", async (req, res) => res.json(await Feature.findById(req.params.id)));
router.put("/:id", async (req, res) => res.json(await Feature.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete("/:id", async (req, res) => {
  await Feature.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
