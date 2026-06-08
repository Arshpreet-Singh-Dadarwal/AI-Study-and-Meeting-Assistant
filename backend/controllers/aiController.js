// const axios = require("axios");
// const File = require("../models/File");
// const Note = require("../models/Note");
// const MeetingNote = require("../models/MeetingNote");

// // exports.generateSummary = async (req, res) => {
// //   try {
// //     const userId = req.userId;
// //     console.log("userid=",userId);
// //     const { fileId, type, meetingId } = req.body; 
// //     // type = "pdf" | "meeting"

// //     if (!fileId) {
// //       return res.status(400).json({ message: "fileId is required" });
// //     }
// //     if(!userId){
// //       return res.status(400).json({ message: "userId is required" });
// //     }

// //     const file = await File.findOne({ _id: fileId, userId}); 
// //     if (!file) {
// //       return res.status(404).json({ message: "File not found" });
// //     }

// //     const normalizedPath = file.filePath.replace(/\\/g, "/");

// //     const aiResponse = await axios.post(
// //       "http://localhost:8000/summarize-file",
// //       { file_path: normalizedPath },
// //       { timeout: 300000 }
// //     );

// //     if (!aiResponse.data.summary) {
// //       return res.status(500).json({
// //         message: "AI failed to generate summary",
// //         aiError: aiResponse.data,
// //       });
// //     }

// //     // ✅ Save PDF Notes
// //     if (type === "pdf") {
// //       const note = await Note.create({
// //         userId,
// //         fileId,
// //         summary: aiResponse.data.summary,
// //       });

// //       return res.status(200).json({
// //         message: "PDF summary generated",
// //         summary: note.summary,
// //       });
// //     }

// //     // ✅ Save Meeting Notes (NEW Schema)
// //     if (type === "meeting") {
// //       if (!meetingId) {
// //         return res.status(400).json({ message: "meetingId is required" });
// //       }

// //       const meetingNote = await MeetingNote.create({
// //         userId,
// //         meetingId,
// //         fileId,
// //         notes: aiResponse.data.summary,
// //       });

// //       return res.status(200).json({
// //         message: "Meeting notes generated",
// //         notes: meetingNote.notes,
// //       });
// //     }

// //     return res.status(400).json({ message: "Invalid type (pdf/meeting required)" });
// //   } catch (error) {
// //     console.error("AI CONTROLLER ERROR:", error.message);
// //     res.status(500).json({ message: "Internal AI error", error: error.message });
// //   }
// // };
// exports.generateSummary = async (req, res) => {
//   try {
//     const userId = req.userId;
//     console.log("userid=", userId);

//     const { fileId, meetingId } = req.body;
//     // Backwards-compatible: older frontend only sends { fileId }
//     const type = req.body?.type || "pdf";
//     // type = "pdf" | "meeting"

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     if (!fileId) {
//       return res.status(400).json({ message: "fileId is required" });
//     }

//     // `type` defaults to "pdf" if not provided

//     const file = await File.findOne({ _id: fileId, userId });
//     if (!file) {
//       return res.status(404).json({ message: "File not found" });
//     }

//     const normalizedPath = file.filePath.replace(/\\/g, "/");

//     const aiResponse = await axios.post(
//       "http://localhost:8000/summarize-file",
//       { file_path: normalizedPath },
//       { timeout: 300000 }
//     );

//     if (!aiResponse.data.summary) {
//       return res.status(500).json({
//         message:
//           aiResponse?.data?.error ||
//           aiResponse?.data?.message ||
//           "AI failed to generate summary",
//         aiError: aiResponse.data,
//       });
//     }

//     const { summary, title, tags } = aiResponse.data;

//     // ✅ Save PDF Notes
//     if (type === "pdf") {
//       const note = await Note.create({
//         userId,
//         fileId,
//         summary,
//         title: title || "New Note",
//         tags: tags || [],
//       });

//       return res.status(200).json({
//         message: "PDF summary generated",
//         summary: note.summary,
//         title: note.title,
//         tags: note.tags,
//       });
//     }

//     // ✅ Save Meeting Notes
//     if (type === "meeting") {
//       if (!meetingId) {
//         return res.status(400).json({ message: "meetingId is required" });
//       }

//       const meetingNote = await MeetingNote.create({
//         userId,
//         meetingId,
//         fileId,
//         notes: summary,
//         title: title || "New Meeting",
//         tags: tags || [],
//       });

//       return res.status(200).json({
//         message: "Meeting notes generated",
//         notes: meetingNote.notes,
//         title: meetingNote.title,
//         tags: meetingNote.tags,
//       });
//     }

//     return res.status(400).json({ message: "Invalid type (pdf/meeting required)" });
//   } catch (error) {
//     console.error("AI CONTROLLER ERROR:", error);
//     res.status(500).json({ message: "Internal AI error" });
//   }
// };
const axios = require("axios");
const File = require("../models/File");
const Note = require("../models/Note");
const MeetingNote = require("../models/MeetingNote");

exports.generateSummary = async (req, res) => {
  try {
    const userId = req.userId;

    const { fileId, meetingId } = req.body;
    const type = req.body?.type || "pdf";

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!fileId) {
      return res.status(400).json({
        message: "fileId is required",
      });
    }

    const file = await File.findOne({
      _id: fileId,
      userId,
    });

    if (!file) {
      return res.status(404).json({
        message: "File not found",
      });
    }

    const aiResponse = await axios.post(
      `${process.env.AI_API_URL}/summarize-file`,
      {
        file_url: file.fileUrl,
      },
      {
        timeout: 300000,
      }
    );

    if (!aiResponse.data.summary) {
      return res.status(500).json({
        message:
          aiResponse?.data?.error ||
          aiResponse?.data?.message ||
          "AI failed to generate summary",
        aiError: aiResponse.data,
      });
    }

    const { summary, title, tags } = aiResponse.data;

    if (type === "pdf") {
      const note = await Note.create({
        userId,
        fileId,
        summary,
        title: title || "New Note",
        tags: tags || [],
      });

      return res.status(200).json({
        message: "PDF summary generated",
        summary: note.summary,
        title: note.title,
        tags: note.tags,
      });
    }

    if (type === "meeting") {
      if (!meetingId) {
        return res.status(400).json({
          message: "meetingId is required",
        });
      }

      const meetingNote = await MeetingNote.create({
        userId,
        meetingId,
        fileId,
        notes: summary,
        title: title || "Meeting Notes",
        tags: tags || [],
      });

      return res.status(200).json({
        message: "Meeting notes generated",
        notes: meetingNote.notes,
        title: meetingNote.title,
        tags: meetingNote.tags,
      });
    }

    return res.status(400).json({
      message: "Invalid type",
    });
  } catch (error) {
    console.error("AI CONTROLLER ERROR:", error);

    return res.status(500).json({
      message: "Internal AI error",
      error: error.message,
    });
  }
};