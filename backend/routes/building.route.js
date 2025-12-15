import { Router } from "express";
import Building from "../models/Building.js";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, requireRole("Admin"), async (req, res) => {
  const item = await Building.create(req.body);
  res.json(item);
});

router.get("/", authMiddleware, requireRole("Student", "Lecturer", "Admin"), async (req, res) => {
  const list = await Building.find().populate("campus");
  res.json(list);
});

router.get("/:id", authMiddleware, requireRole("Admin"), async (req, res) => {
  const item = await Building.findById(req.params.id).populate("campus");
  res.json(item);
});

router.put("/:id", authMiddleware, requireRole("Admin"), async (req, res) => {
  const item = await Building.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

router.delete("/:id", authMiddleware, requireRole("Admin"), async (req, res) => {
  await Building.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
