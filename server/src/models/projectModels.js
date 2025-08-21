import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  description: {
    type: "String",
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  ],
},{timestamps:true});

const projects = mongoose.model("Projects", projectSchema);
export default projects;