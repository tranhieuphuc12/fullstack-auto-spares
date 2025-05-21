const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({    
    name: { type: String, required: true },
    logo: { type: String, required: false },   
    type: { type: String, required: true }, 
});

module.exports = mongoose.model('Brand', brandSchema);