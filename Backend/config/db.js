const mongoose = require('mongoose');
require('dotenv').config();

// ✅ Use single env variable name (clean)
const mongoURL = process.env.MONGO_URI;

// ✅ Connect to MongoDB
mongoose.connect(mongoURL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Export mongoose (cleaner usage)
module.exports = mongoose;