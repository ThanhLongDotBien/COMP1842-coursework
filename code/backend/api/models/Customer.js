const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    FullName: {type: String, required: true, trim: true}, 
    Age: {type: Number, min: 0, max: 120, trim: true},
    Address: {type: String, trim: true},
    Email: {type: String, required: true, trim: true},
    PhoneNumber: {type: String, required: true, trim:true},
    Gender: {type: String, enum: ['male', 'female', 'other'], default: 'other'},
    CreatedAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Customer', customerSchema)