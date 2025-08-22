import { NextResponse } from "next/server";
import connectDB from "../../../../../server/src/config/database.js"
import Project from "../../../../../server/src/models/projectModels.js"

// GET all projects
export async function GET(req) {
  try {
    await connectDB();

    const projects = await Project.find(); // fetch all projects
    return NextResponse.json({ projects }, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch projects:", err);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST a new project
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, description } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Project title is required" },
        { status: 400 }
      );
    }

    const newProject = await Project.create({ title, description });
    return NextResponse.json({ project: newProject }, { status: 201 });
  } catch (err) {
    console.error("Failed to create project:", err);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
