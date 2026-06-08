const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  meetingTitle: {
    type: String,
    default: "Meeting Recording",
  },

  fileName: String,
  filePath: String,
  fileUrl: String,
  fileType: String,
  fileSize: Number,

  transcript: {
    type: String,
    default: "",
  },


  uploadedate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Meeting", MeetingSchema);
