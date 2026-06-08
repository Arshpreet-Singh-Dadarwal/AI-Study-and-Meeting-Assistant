const Meeting = require("../models/Meeting");

// ✅ GET /api/meeting/my
exports.getMyMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({ userId: req.userId })
      .sort({ uploadedate: -1 }); 

    return res.status(200).json({ meetings });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch meetings", error });
  }
};

// ✅ DELETE /api/meeting/:id
exports.deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    await Meeting.deleteOne({ _id: meeting._id });

    return res.status(200).json({ message: "Meeting deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete meeting", error });
  }
};
