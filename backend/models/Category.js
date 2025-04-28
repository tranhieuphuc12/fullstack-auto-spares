const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({    
    name: { type: String, required: true },
    subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }],

}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);