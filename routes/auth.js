import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import { authenticateToken } from "../middleware/auth.js";
import { authorizeRole } from "../middleware/authorizeRole.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ success: false, message: "Email already registered" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const allowedRoles = ["TENANT", "LANDLORD", "STAFF"];
  const assignedRole = allowedRoles.includes(role) ? role : "TENANT";

  const newUser = await prisma.user.create({
    data: { name, email, password: hashedPassword, role: assignedRole },
    select: { id: true, name: true, email: true, role: true },
  });

  const token = jwt.sign({ userId: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: "24h" });

  res.status(201).json({ success: true, message: "User registered", data: { user: newUser, token } });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ success: false, message: "User not found" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ success: false, message: "Invalid password" });

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "48h" });
  const { password: _, ...userWithoutPassword } = user;

  res.json({ success: true, message: "Login successful", data: { user: userWithoutPassword, token } });
});

// Get Profile
router.get("/me", authenticateToken, async (req, res) => {
  res.json({ success: true, data: req.user });
});

// Role-protected routes
router.get("/admin-only", authenticateToken, authorizeRole(["LANDLORD"]), (req, res) => {
  res.json({ success: true, message: "Welcome Landlord!" });
});

router.get("/tenant-only", authenticateToken, authorizeRole(["TENANT"]), (req, res) => {
  res.json({ success: true, message: "Welcome Tenant!" });
});

router.get("/staff-only", authenticateToken, authorizeRole(["STAFF"]), (req, res) => {
  res.json({ success: true, message: "Welcome Staff!" });
});

export default router;
