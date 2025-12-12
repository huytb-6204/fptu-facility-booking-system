import { Router } from "express";
import User from "../models/User.js";

const router = Router();

router.post("/", async (req, res) => res.json(await User.create(req.body)));
router.get("/", async (req, res) => res.json(await User.find()));
router.get("/:id", async (req, res) => res.json(await User.findById(req.params.id)));
router.put("/:id", async (req, res) => res.json(await User.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
