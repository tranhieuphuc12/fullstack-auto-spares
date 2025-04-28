const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({  
  productId: { type: String, required: true },
  name: { type: String, required: true },
  images: [{ type: String }],
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
