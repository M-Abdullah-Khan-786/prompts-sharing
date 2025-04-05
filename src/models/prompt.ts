import mongoose, { Schema, model, models } from "mongoose";

const promptSchema = new Schema({
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Prompt = models.prompt || model("Prompt", promptSchema);

export default Prompt;
