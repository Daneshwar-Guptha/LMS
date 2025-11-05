const express = require("express");
const { adminAuth } = require("../middleware/auth");
const User = require("../model/User");
const Course = require("../model/Course");
const Lesson = require("../model/Lesson");

const AdminRoutes = express.Router();

// Dashboard Summary
AdminRoutes.get("/dashboard", adminAuth, async (req, res) => {
  try {
    const userStats = await User.aggregate([
      { $match: { role: { $in: ["user", "instructor"] } } },
      { $group: { _id: "$role", count: { $sum: 1 } } },
    ]);

    const stats = {
      totalUsers: userStats.find((r) => r._id === "user")?.count || 0,
      totalInstructors: userStats.find((r) => r._id === "instructor")?.count || 0,
      totalCourses: await Course.countDocuments(),
      totalLessons: await Lesson.countDocuments(),
    };

    res.status(200).json({ success: true, dashboard: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all users
AdminRoutes.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all instructors
AdminRoutes.get("/instructors", adminAuth, async (req, res) => {
  try {
    const instructors = await User.find({ role: "instructor" }).select("-password");
    res.status(200).json({ success: true, instructors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all courses
AdminRoutes.get("/courses", adminAuth, async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructorId", "name email role")
      .select("title price isPublished totalLessons createdAt");
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete specific user
AdminRoutes.delete("/user/:id", adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete specific instructor
AdminRoutes.delete("/instructor/:id", adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Instructor deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete specific course and its lessons
AdminRoutes.delete("/course/:id", adminAuth, async (req, res) => {
  const session = await Course.startSession();
  session.startTransaction();

  try {
    const courseId = req.params.id;

    await Lesson.deleteMany({ courseId }).session(session);
    await Course.findByIdAndDelete(courseId).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ success: true, message: "Course and all lessons deleted" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, message: error.message });
  }
});

// Promote user → instructor
AdminRoutes.put("/make-instructor/:id", adminAuth, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role: "instructor" },
      { new: true }
    ).select("-password");

    if (!updatedUser)
      return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({
      success: true,
      message: "User promoted to instructor",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = AdminRoutes;
