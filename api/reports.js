const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const ReportModel = require("../models/ReportModel");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");
const router = express.Router();

//CREATE REPORT
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { 
      reportedUser, 
      reportedPost, 
      reportedComment, 
      reason, 
      description 
    } = req.body;
    const { userId } = req;

    if (!reason) {
      return res.status(400).send("Report reason is required");
    }

    // Check if user is trying to report themselves
    if (reportedUser && reportedUser === userId) {
      return res.status(400).send("Cannot report yourself");
    }

    // Check if already reported
    const existingReport = await ReportModel.findOne({
      reporter: userId,
      $or: [
        { reportedUser },
        { reportedPost },
        { reportedComment }
      ]
    });

    if (existingReport) {
      return res.status(400).send("Content already reported");
    }

    const report = new ReportModel({
      reporter: userId,
      reportedUser,
      reportedPost,
      reportedComment,
      reason,
      description
    });

    await report.save();

    return res.status(201).json({ message: "Report submitted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//GET REPORTS (Admin only)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const user = await UserModel.findById(userId);

    if (user.role !== "root") {
      return res.status(403).send("Access denied");
    }

    const reports = await ReportModel.find()
      .populate("reporter", "name username")
      .populate("reportedUser", "name username")
      .populate("reportedPost")
      .populate("reviewedBy", "name username")
      .sort({ createdAt: -1 });

    return res.status(200).json(reports);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//UPDATE REPORT STATUS (Admin only)
router.put("/:reportId", authMiddleware, async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status, adminNotes } = req.body;
    const { userId } = req;

    const user = await UserModel.findById(userId);
    if (user.role !== "root") {
      return res.status(403).send("Access denied");
    }

    const report = await ReportModel.findById(reportId);
    if (!report) {
      return res.status(404).send("Report not found");
    }

    report.status = status;
    report.adminNotes = adminNotes;
    report.reviewedBy = userId;
    report.reviewedAt = new Date();

    await report.save();

    return res.status(200).json({ message: "Report updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

//GET USER'S REPORTS
router.get("/my-reports", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;

    const reports = await ReportModel.find({ reporter: userId })
      .populate("reportedUser", "name username")
      .populate("reportedPost")
      .sort({ createdAt: -1 });

    return res.status(200).json(reports);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
