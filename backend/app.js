// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productApiRoutes = require('./routes/productApi');
const categoryApiRoutes = require('./routes/categoryApi');
const carApiRoutes = require('./routes/carApi');
const brandApiRoutes = require('./routes/brandApi');
const adminApiRoutes = require('./routes/adminApi');
const cookieParser = require("cookie-parser");
const uploadRoutes = require("./routes/upload");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;
const clientUrl = process.env.CLIENT_URL || 'http://localhost:8080';

// Middleware
app.use(cors({
  origin: clientUrl,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
// Routes
app.use('/api', [productApiRoutes, categoryApiRoutes, carApiRoutes, brandApiRoutes]);
app.use('/api/admin', adminApiRoutes);
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use('/api/upload', uploadRoutes);

// Connect to MongoDB
if (!mongoUri) {
  console.log('✅ MongoDB URI is not defined in .env file', mongoUri);
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
app.use((req, res, next) => {
console.log("🛠 Request to:", req.url);
next();
});
