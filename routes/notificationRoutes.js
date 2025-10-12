import express from "express";
import prisma from "../lib/prisma.js";

const route = express.Router();

// Get all notifications
route.get("/", async (req, res) => {
  try {
    const { userId, status } = req.query;

    const filter = {
      where: {
        userId: parseInt(userId),
        ...(status === "unread" ? { isRead: false } : {}),
        ...(status === "read" ? { isRead: true } : {}),
      },
      orderBy: { createdAt: "desc" },
    };

    const notifications = await prisma.notification.findMany(filter);
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// Create a new notification
route.post("/", async (req, res) => {
  try {
    const { userId, title, message, type } = req.body;
    const notification = await prisma.notification.create({
      data: {
        userId: parseInt(userId),
        title,
        message,
        type,
      },
    });
    res.json(notification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: "Failed to create notification" });
  }
});

// ✅ Export route
export default route;
