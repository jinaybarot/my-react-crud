import express from "express";
import Map from "../models/Map.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, async (req, res) => {
    try {
        const { country } = req.body;
        if (!country) return res.status(400).json({ msg: "Country is required" });
        
        const newMap = new Map({ country });
        await newMap.save();
        res.json({ msg: "Country added successfully", map: newMap });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

export default router;