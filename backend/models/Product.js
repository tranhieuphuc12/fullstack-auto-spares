const mongoose = require('mongoose');

function normalize(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

const productSchema = new mongoose.Schema({
  productId: { type: Array, required: true },
  name: { type: String, required: true },
  name_normalized: { type: String, required: true },
  images: [{ type: String }],
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  description_normalized: { type: String, required: true },
  brand: { type: Object, required: true },
  // categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  // carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  category: { type: Object, required: true },
  car: { type: Object, required: true },
  JSAsakashi: { type: String, required: true },
  


}, { timestamps: true });

productSchema.pre('save', function (next) {
  this.name_normalized = normalize(this.name);
  this.description_normalized = normalize(this.description);
  next();
});



module.exports = mongoose.model('Product', productSchema);
