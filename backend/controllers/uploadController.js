const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");
const File = require("../models/File");
const Meeting = require("../models/Meeting");

// Cloudinary Storage
const storage = new CloudinaryStorage({
cloudinary,
params: async (req, file) => {
  const isMedia =
    file.mimetype.startsWith("audio/") ||
    file.mimetype.startsWith("video/");

  return {
    folder: isMedia ? "meetings" : "files",
    resource_type: isMedia ? "video" : "raw",
    public_id: `${Date.now()}-${file.originalname}`,
    type: "upload"
  };
},
});

// File Filter
const fileFilter = (req, file, cb) => {
const allowedTypes = [
"application/pdf",
"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
"audio/mpeg",
"audio/wav",
"audio/mp4",
"audio/x-m4a",
"video/mp4",
];

if (allowedTypes.includes(file.mimetype)) {
cb(null, true);
} else {
cb(new Error("Unsupported file type"), false);
}
};

const upload = multer({ storage, fileFilter });

exports.uploadFile = [
upload.single("file"),
async (req, res) => {
try {
if (!req.file) {
return res.status(400).json({
message: "No file uploaded",
});
}


  const userId = req.body.userId;

  if (!userId) {
    return res.status(400).json({
      message: "userId is required",
    });
  }

  const newFile = await File.create({
    userId,
    filename: req.file.originalname,
    fileType: req.file.mimetype,
    fileUrl: req.file.path,
  });
console.log(JSON.stringify(req.file, null, 2));
  const isMeeting =
    req.file.mimetype.startsWith("audio/") ||
    req.file.mimetype.startsWith("video/");

  let meetingDoc = null;

  if (isMeeting) {
    meetingDoc = await Meeting.create({
      userId,
      meetingTitle: req.file.originalname,
      meetingType: "recording",
      meetingDate: new Date(),
      uploadDate: new Date(),

      fileName: req.file.originalname,
      fileUrl: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size,

      notes: "Notes will be generated soon...",
    });
  }

  res.status(201).json({
    message: "Uploaded successfully",
    fileId: newFile._id,
    meetingId: meetingDoc?._id || null,
    meetingSaved: !!meetingDoc,
    fileUrl: req.file.path,
  });
} catch (error) {
  console.error("UPLOAD ERROR:", error);

  res.status(500).json({
    error: error.message,
  });
}


},
];
