import mongoose from "mongoose";

const daybookSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
});

const daybookModel = mongoose.model("daybookModel", daybookSchema);

export default userModel;
