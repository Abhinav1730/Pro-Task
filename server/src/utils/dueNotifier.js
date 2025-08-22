import Task from "../models/taskModel.js";

/**
 * Checks tasks for due dates and notifies assigned users in real-time via Socket.IO.
 */
export const startDueNotifier = (io) => {
  console.log(" Due notifier started...");

  // Run every minute
  setInterval(async () => {
    try {
      const now = new Date();
      const upcomingTasks = await Task
        .find({
          dueDate: {
            $gte: now,
            $lte: new Date(now.getTime() + 60 * 60 * 1000),
          },
          status: { $ne: "Done" },
        })
        .populate("assignedTo", "name email");

      upcomingTasks.forEach((task) => {
        task.assignedTo.forEach((user) => {
          io.to(user._id.toString()).emit("dueNotification", {
            taskId: task._id,
            title: task.title,
            dueDate: task.dueDate,
            message: ` Reminder: Task "${task.title}" is due soon!!!!`,
          });
        });
      });
    } catch (error) {
      console.error(" Error in dueNotifier:", error.message);
    }
  }, 60 * 1000);
};