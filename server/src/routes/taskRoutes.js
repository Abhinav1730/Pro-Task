import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import projects from "../models/projectModels.js";
import tasks from "../models/taskModel.js";

const router = express.Router();

// Create task under a project
router.post("/:projectId", auth, async (req, res, next) => {
  try {
    const { title, description, status = "To be Done", dueDate } = req.body;
    const project = await projects.findById(req.params.projectId);

    if (!project) return res.status(404).json({ message: "Project not found" });

    // check if user is member
    const isMember =
      project.owner.equals(req.user._id) ||
      project.members.includes(req.user._id);
    if (!isMember)
      return res.status(403).json({ message: "Forbidden Request" });

    const task = await tasks.create({
      title,
      description,
      status,
      dueDate,
      project: project._id,
      assignedTo: req.body.assignedTo || null,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (e) {
    next(e);
  }
});

// get all tasks for a project
router.get("/:projectId", auth, async (req, res, next) => {
  try {
    const project = await projects.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const isMember =
      project.owner.equals(req.user._id) ||
      project.members.includes(req.user._id);
    if (!isMember) return res.status(403).json({ message: "Forbidden" });

    const tasks = await tasks.find({ project: project._id }).sort("-createdAt");
    res.json(tasks);
  } catch (e) {
    next(e);
  }
});

// update task
router.put("/:taskId", auth, async (req, res, next) => {
  try {
    const task = await tasks.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // check if user is project member
    const project = await projects.findById(task.project);
    const isMember =
      project.owner.equals(req.user._id) ||
      project.members.includes(req.user._id);
    if (!isMember) return res.status(403).json({ message: "Forbidden" });

    Object.assign(task, req.body);
    await task.save();

    res.json(task);
  } catch (e) {
    next(e);
  }
});

// Delete task
router.delete("/:taskId", auth, async (req, res, next) => {
  try {
    const task = await tasks.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const project = await projects.findById(task.project);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const isMember =
      project.owner.equals(req.user._id) ||
      project.members.includes(req.user._id);
    if (!isMember)
      return res.status(403).json({ message: "Forbidden Request" });

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (e) {
    next(e);
  }
});

export default router;