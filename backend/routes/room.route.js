import { Router } from "express";
import Room from "../models/Room.js";

const router = Router();

router.post("/", async (req, res) => res.json(await Room.create(req.body)));

router.get("/", async (req, res) => {
  const rooms = await Room.find()
    .populate("building")
    .populate("roomType")
    .populate("features.feature");
  res.json(rooms);
});

router.get("/:id", async (req, res) => {
  const room = await Room.findById(req.params.id)
    .populate("building")
    .populate("roomType")
    .populate("features.feature");
  res.json(room);
});

router.put("/:id", async (req, res) => res.json(await Room.findByIdAndUpdate(req.params.id, req.body, { new: true })));

router.delete("/:id", async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
