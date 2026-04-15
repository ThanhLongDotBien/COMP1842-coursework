const mongoose = require('mongoose')

// Define schema
const entrySchema = new mongoose.Schema({
  issueCode: {type: String, required: true,unique: true,trim: true},
  Response:  {type: String, required: true,trim: true},
  Category:  {type: String, enum: ['Login', 'Registration', 'Technical', 'Billing', 'Account', 'Network', 'Other'], required: true, trim: true} 
 }, { timestamps: true })

// Export model for CRUD operations
module.exports = mongoose.model('Entry', entrySchema)