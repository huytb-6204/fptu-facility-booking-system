import { Router } from "express";
import Feature from "../models/Feature.js";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, requireRole("Admin"), async (req, res) => res.json(await Feature.create(req.body)));
router.get("/", authMiddleware, requireRole("Admin"), async (req, res) => res.json(await Feature.find()));
router.get("/:id", authMiddleware, requireRole("Admin"), async (req, res) => res.json(await Feature.findById(req.params.id)));
router.put("/:id", authMiddleware, requireRole("Admin"), async (req, res) => res.json(await Feature.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete("/:id", authMiddleware, requireRole("Admin"), async (req, res) => {
  await Feature.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
