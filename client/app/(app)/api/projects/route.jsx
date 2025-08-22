import connectDB from "@/server/database.js";
import Project from "@/server/models/projectModel.js";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await connectDB();

    // Get token from headers
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
    } catch {
      return new Response(JSON.stringify({ message: "Invalid token" }), { status: 401 });
    }

    // Only return projects where the user is owner or member
    const projects = await Project.find({
      $or: [{ owner: userId }, { members: userId }],
    }).sort("-updatedAt");

    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API /projects error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
