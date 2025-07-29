import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },

  // Reference field (user ki ID ka reference)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // jis model ka reference hai uska naam
 
  }
});

export default mongoose.model("Todo", todoSchema);
