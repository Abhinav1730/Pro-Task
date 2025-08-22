import { NextResponse } from "next/server";
import connectDB from "../../../../../../server/src/config/database.js"
import Project from "../../../../../../server/src/models///projectModels.js"

// GET a single project by ID
export async function GET(req, { params }) {
  const { id } = params;

  try {
    await connectDB();
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch project:", err);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT (update) a project by ID
export async function PUT(req, { params }) {
  const { id } = params;

  try {
    await connectDB();
    const body = await req.json();

    const updatedProject = await Project.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project: updatedProject }, { status: 200 });
  } catch (err) {
    console.error("Failed to update project:", err);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE a project by ID
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await connectDB();
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("Failed to delete project:", err);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
