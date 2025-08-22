import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
      required: true,
      index: true,
    },
    title: {
      type: "String",
      required: true,
    },
    description: {
      type: "String",
    },
    dueDate: { type: Date },
    priority: {
      type: "String",
      enum: ["Lowest , Medium , Highest"],
      default: "Lowest",
    },
    status: {
      type: "String",
      enum: ["To be Done", "In Progress", "Done"],
      default: "To be Done",
      index: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Tasks", taskSchema);
export default Task;