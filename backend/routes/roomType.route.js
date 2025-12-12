import { Router } from "express";
import RoomType from "../models/RoomType.js";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, requireRole("Admin"), async (req, res) => res.json(await RoomType.create(req.body)));
router.get("/", authMiddleware, requireRole("Admin"), async (req, res) => res.json(await RoomType.find()));
router.get("/:id", authMiddleware, requireRole("Admin"), async (req, res) => res.json(await RoomType.findById(req.params.id)));
router.put("/:id", authMiddleware, requireRole("Admin"), async (req, res) => res.json(await RoomType.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete("/:id", authMiddleware, requireRole("Admin"), async (req, res) => {
  await RoomType.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
