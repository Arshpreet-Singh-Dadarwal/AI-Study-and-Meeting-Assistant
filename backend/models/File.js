const mongoose=require("mongoose");
const user = require("./User");
const FileSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    filename:String,          
    fileType:String,
    filePath:String,
    fileUrl:String,
    uploadDate:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model("File",FileSchema);
