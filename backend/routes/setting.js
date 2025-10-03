import express from "express";
import multer from "multer";
import Setting from "../models/Setting.js";

const router = express.Router();

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// get latest settings
router.get("/", async (req, res) => {
  try {
    const latest = await Setting.findOne().sort({ createdAt: -1 });
    if (!latest) return res.json({ setting: null });
    res.json({ setting: latest });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// save or update settings
router.post("/", upload.single("logo"), async (req, res) => {
  try {
    const { searchEnabled } = req.body;

    // prepare fields to update
    const updateData = {
      searchEnabled: searchEnabled === "1"
    };

    // if logo uploaded, include it
    if (req.file) {
      updateData.logoUrl = req.file.filename;
    }

    // find latest setting and update it
    const setting = await Setting.findOneAndUpdate(
      {},                     // filter (empty = find any one, since we only keep 1 setting)
      updateData,             // update fields
      { new: true, upsert: true } // new = return updated doc, upsert = create if not exist
    );

    res.json({ msg: "Settings saved/updated", setting });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


export default router;
