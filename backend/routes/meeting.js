const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getMyMeetings,
  deleteMeeting,
} = require("../controllers/meetingController");

// ✅ Get all meetings of logged in user
router.get("/my", authMiddleware, getMyMeetings);

// ✅ Delete meeting
router.delete("/:id", authMiddleware, deleteMeeting);

module.exports = router;
