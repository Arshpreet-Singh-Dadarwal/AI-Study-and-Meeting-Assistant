require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const aiRoutes=require('./routes/ai');
const meeting=require('./routes/meeting');
const noteRoutes=require('./routes/notes');
const meetingNotesRoutes=require('./routes/meetingNotes');
const app=express();
const cors=require('cors');
app.use(cors())
app.use(express.json());


(async () => {
  try {
    const res = await mongoose.connect(process.env.Mongodb_URI);
    if (res) {
      console.log("MongoDB Connected");
    }
  } catch (err) {
    console.log("MongoDB error", err);
  }
})();

app.use('/api/auth',authRoutes);
app.use('/api/files',uploadRoutes);
app.use('/api/ai',aiRoutes);
app.use('/api/notes',noteRoutes);
app.use('/api/meeting',meeting);
app.use('/api/meetingNotes',meetingNotesRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Server is running on port 5000");
})