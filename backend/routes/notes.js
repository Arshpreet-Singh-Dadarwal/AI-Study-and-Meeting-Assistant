const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAllNotes,deleteNote } = require("../controllers/noteController");

router.get("/my", authMiddleware, getAllNotes);
router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;
