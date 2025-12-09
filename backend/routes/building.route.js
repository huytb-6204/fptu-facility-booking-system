const express = require("express");
const Building = require("../models/Building");
const router = express.Router();

router.post("/", async (req, res) => {
  const item = await Building.create(req.body);
  res.json(item);
});

router.get("/", async (req, res) => {
  const list = await Building.find().populate("campus");
  res.json(list);
});

router.get("/:id", async (req, res) => {
  const item = await Building.findById(req.params.id).populate("campus");
  res.json(item);
});

router.put("/:id", async (req, res) => {
  const item = await Building.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

router.delete("/:id", async (req, res) => {
  await Building.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
