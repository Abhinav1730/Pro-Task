import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import projects from "../models/projectModels.js";
import tasks from "../models/taskModel.js";

const router = express.Router();

// for creating the projects
router.post("/", auth, async (req, res, next) => {
  try {
    const { name, description, members = [] } = req.body;
    const project = await projects.create({
      name,
      description,
      owner: req.user._id,
      members: [req.user._id, ...members],
    });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
});

// read all projects for user
router.get("/", auth, async (req, res, next) => {
  try {
    const projects = await projects
      .find({ $or: [{ owner: req.user._id }, { members: req.user._id }] })
      .sort("-updatedAt");
    res.json(projects);
  } catch (e) {
    next(e);
  }
});

// read single with tasks
router.get("/:id", auth, async (req, res, next) => {
  try {
    const project = await projects.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });
    const isMember =
      project.owner.equals(req.user._id) ||
      project.members.includes(req.user._id);
    if (!isMember) return res.status(403).json({ message: "Forbidden" });
    const task = await tasks.find({ project: project._id }).sort("createdAt");
    res.json({ project, task });
  } catch (e) {
    next(e);
  }
});

// update
router.put("/:id", auth, async (req, res, next) => {
  try {
    const project = await projects.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(project);
  } catch (e) {
    next(e);
  }
});

// delete project + related tasks
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });

    if (!project.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "Only owner can delete project" });
    }

    await Task.deleteMany({ project: project._id });
    await project.deleteOne();

    res.json({ message: "Project and its tasks deleted successfully" });
  } catch (e) {
    next(e);
  }
});

export default router;