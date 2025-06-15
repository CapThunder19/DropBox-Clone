const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
    filename:{type:String, required:true},
    originalname:{type:String, required:true},
    mimetype:{type:String, required:true},
    size:{type:Number, required:true},
    url:{type:String,required:true},
    uploadedby:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true}
},{timestamps:true});

module.exports = mongoose.model("File", fileSchema);

