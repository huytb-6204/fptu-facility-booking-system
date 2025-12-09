const express = require("express");
const RoomType = require("../models/RoomType");
const router = express.Router();

router.post("/", async (req, res) => res.json(await RoomType.create(req.body)));
router.get("/", async (req, res) => res.json(await RoomType.find()));
router.get("/:id", async (req, res) => res.json(await RoomType.findById(req.params.id)));
router.put("/:id", async (req, res) => res.json(await RoomType.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete("/:id", async (req, res) => {
  await RoomType.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
