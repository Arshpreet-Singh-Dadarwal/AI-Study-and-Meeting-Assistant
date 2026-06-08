const mongoose = require("mongoose");

const MeetingNoteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  meetingId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Meeting",
  },

  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "File",
  },

  notes: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  tags: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("MeetingNote", MeetingNoteSchema);
