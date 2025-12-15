import { Router } from "express";
import Campus from "../models/Campus.js";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware.js";

const router = Router();

// CREATE
router.post("/", authMiddleware, requireRole("Admin"), async (req, res) => {
  const campus = await Campus.create(req.body);
  res.json(campus);
});

// READ ALL
router.get("/", authMiddleware, requireRole("Student", "Lecturer", "Admin"), async (req, res) => {
  const list = await Campus.find();
  res.json(list);
});

// READ ONE
router.get("/:id", authMiddleware, requireRole("Student", "Lecturer", "Admin"), async (req, res) => {
  const campus = await Campus.findById(req.params.id);
  res.json(campus);
});

// UPDATE
router.put("/:id", authMiddleware, requireRole("Admin"), async (req, res) => {
  const campus = await Campus.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(campus);
});

// DELETE
router.delete("/:id", authMiddleware, requireRole("Admin"), async (req, res) => {
  await Campus.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
