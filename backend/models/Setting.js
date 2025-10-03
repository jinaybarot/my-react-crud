import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
  logoUrl: { type: String, required: true },
  searchEnabled: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Setting", settingSchema);
