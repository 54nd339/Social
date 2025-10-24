const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportSchema = new Schema(
  {
    reporter: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reportedUser: { type: Schema.Types.ObjectId, ref: "User" },
    reportedPost: { type: Schema.Types.ObjectId, ref: "Post" },
    reportedComment: { type: Schema.Types.ObjectId },
    reason: { 
      type: String, 
      required: true,
      enum: [
        "spam",
        "harassment",
        "hate_speech",
        "violence",
        "nudity",
        "fake_news",
        "copyright",
        "other"
      ]
    },
    description: { type: String },
    status: { 
      type: String, 
      default: "pending",
      enum: ["pending", "reviewed", "resolved", "dismissed"]
    },
    adminNotes: { type: String },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
    reviewedAt: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);
