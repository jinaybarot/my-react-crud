import express from "express";
import FormData from "../models/FormData.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Form Data
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, description, category, technologies } = req.body;

    const newForm = new FormData({
      userId: req.user.id,
      title,
      description,
      category,
      technologies,
    });

    await newForm.save();
    res.json({ msg: "Form data saved successfully", form: newForm });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get All Form Data of Logged-in User
router.get("/myforms", authMiddleware, async (req, res) => {
  try {
    const forms = await FormData.find({ userId: req.user.id });
    res.json(forms);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update Form Data
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, category, technologies } = req.body;
    const updatedForm = await FormData.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, description, category, technologies },
      { new: true }
    );
    if (!updatedForm) return res.status(404).json({ msg: "Form not found" });
    res.json({ msg: "Form updated successfully", form: updatedForm });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const deletedForm = await FormData.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deletedForm) return res.status(404).json({ msg: "Form not found" });
    res.json({ msg: "Form deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
