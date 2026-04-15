const mongoose = require('mongoose')

// Định nghĩa schema
const entrySchema = new mongoose.Schema({
  issueCode: {type: String, required: true,unique: true,trim: true},
  Response:  {type: String, required: true,trim: true},
  Category:  {type: String, enum: ['Login', 'Registration', 'Technical', 'Billing', 'Account', 'Network', 'Other'], required: true, trim: true} 
 }, { timestamps: true })

// Xuất model để dùng trong CRUD
module.exports = mongoose.model('Entry', entrySchema)