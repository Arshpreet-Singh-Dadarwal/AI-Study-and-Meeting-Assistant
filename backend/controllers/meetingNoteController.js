const MeetingNote = require("../models/MeetingNote");

exports.getMyMeetingNotes = async (req, res) => {
  try {
    const userId = req.userId;

    const notes = await MeetingNote.find({ userId })
      .sort({ createdAt: -1 })
      .populate("meetingId", "meetingTitle fileName uploadedate");

    res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMeetingNote = async (req, res) => {
  try {
    const { id } = req.params;
    await MeetingNote.findByIdAndDelete(id);
    res.status(200).json({ message: "Meeting note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
