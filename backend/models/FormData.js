import mongoose from "mongoose";

const formDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  technologies: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

const FormData = mongoose.model("FormData", formDataSchema);
export default FormData;
