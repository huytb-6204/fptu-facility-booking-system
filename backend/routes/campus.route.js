const express = require("express");
const Campus = require("../models/Campus");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const campus = await Campus.create(req.body);
  res.json(campus);
});

// READ ALL
router.get("/", async (req, res) => {
  const list = await Campus.find();
  res.json(list);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const campus = await Campus.findById(req.params.id);
  res.json(campus);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const campus = await Campus.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(campus);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Campus.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
