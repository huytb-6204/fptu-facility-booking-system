import { Router } from "express";
import NotificationLog from "../models/NotificationLog.js";

const router = Router();

router.post("/", async (req, res) => res.json(await NotificationLog.create(req.body)));
router.get("/", async (req, res) => res.json(await NotificationLog.find().populate("user")));

export default router;
