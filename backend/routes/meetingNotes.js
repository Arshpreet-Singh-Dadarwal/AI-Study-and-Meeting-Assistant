const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getMyMeetingNotes, deleteMeetingNote } = require("../controllers/meetingNoteController");

router.get("/my", authMiddleware, getMyMeetingNotes);
router.delete("/:id", authMiddleware, deleteMeetingNote);

module.exports = router;
