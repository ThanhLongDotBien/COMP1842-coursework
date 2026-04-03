const mongoose = require('mongoose')

// Định nghĩa schema
const entrySchema = new mongoose.Schema({
  issueCode: {type: String, required: true,unique: true,trim: true},
  response:  {type: String, required: true,trim: true},
  category:  {type: String,required: true,}, 
  Date: {type: Date, default: Date.now}  
})

// Xuất model để dùng trong CRUD
module.exports = mongoose.model('Entry', entrySchema)