// config/mongoose.js
const mongoose = require('mongoose');

// Connection string - either from environment or local MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-list-app';
mongoose.set('strictQuery', false);


// Connect to MongoDB using Mongoose
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Connection Error:', error);
});

// Export the mongoose connection
module.exports = mongoose;
