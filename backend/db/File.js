const mongoose = require("mongoose");

// Creating a Schema for uploaded files
const fileSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, "Uploaded file must have a name"],
  }, filename:{
    type:String
  },
  file:{
    data:Buffer,
    contentType:String
  },  type:{
    type:String
  },
  quantity:{
    type: Number,
    required: [true, "Please enter Valid Quantity"],
  },
  description:{
    type:String,
    required: [true, "Please enter description"],
  },
  issueDate:[],
  userId: String
});

// Creating a Model from that Schema
const fileModel = mongoose.model("file", fileSchema,'file');

// Exporting the Model to use it in app.js File.
module.exports = fileModel;


