import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import projects from "../models/projectModels.js";
import user from "../models/userModel.js";

const router = express.Router();

// invite collaborater through email
router.post("/invite/:projectId", auth, async (req, res, next) => {
  try {
    const { email } = req.body;
    const project = await projects.findById(req.params.projectId);

    if (!project) return res.status(404).json({ message: "Project not found" });

    // only owner can invite
    if (!project.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "Only owner can invite members" });
    }

    const user = await user.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (project.members.includes(user._id)) {
      return res.status(400).json({ message: "User already a collaborator" });
    }

    project.members.push(user._id);
    await project.save();

    res.json({ message: "User invited successfully", project });
  } catch (e) {
    next(e);
  }
});

// gathering all collaboraters of the project
router.get("/:projectId", auth, async (req, res, next) => {
  try {
    const project = await projects
      .findById(req.params.projectId)
      .populate("members", "name email");

    if (!project) return res.status(404).json({ message: "Project not found" });

    const isMember =
      project.owner.equals(req.user._id) ||
      project.members.some((m) => m._id.equals(req.user._id));
    if (!isMember)
      return res.status(403).json({ message: "Forbidden Request" });

    res.json(project.members);
  } catch (e) {
    next(e);
  }
});

// remove collaborator from projects
router.delete("/:projectId/:userId", auth, async (req, res, next) => {
  try {
    const project = await projects.findById(req.params.projectId);

    if (!project) return res.status(404).json({ message: "Project not found" });

    // only owner can remove
    if (!project.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "Only owner can remove members" });
    }

    project.members = project.members.filter(
      (id) => id.toString() !== req.params.userId
    );
    await project.save();

    res.json({ message: "Collaborator removed", project });
  } catch (e) {
    next(e);
  }
});

export default router;