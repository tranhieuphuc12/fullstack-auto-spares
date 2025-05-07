// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productApiRoutes = require('./routes/productApi');
const categoryApiRoutes = require('./routes/categoryApi');
const carApiRoutes = require('./routes/carApi');
const brandApiRoutes = require('./routes/brandApi');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', [productApiRoutes, categoryApiRoutes, carApiRoutes, brandApiRoutes]);

// Connect to MongoDB
if (mongoUri) {
  console.log('✅ MongoDB URI is defined in .env file', mongoUri);

  process.exit(1);
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Express.js backend!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://backend:${PORT}`);
});
