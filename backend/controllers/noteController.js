const Note = require("../models/Note");

exports.getAllNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const notes = await Note.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({success:true,
      notes});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    await Note.findByIdAndDelete(id);

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

