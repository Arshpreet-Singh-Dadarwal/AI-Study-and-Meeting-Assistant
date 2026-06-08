const express=require('express');
const router=express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const {generateSummary}=require('../controllers/aiController');

router.post("/summarize",authMiddleware,generateSummary);
router.post("/getmeetingnotes",authMiddleware,generateSummary);
module.exports=router;