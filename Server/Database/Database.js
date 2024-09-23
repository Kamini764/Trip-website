const mongoose = require ("mongoose");
let mongo_url = "mongodb://localhost:27017/admin";


mongoose.connect(mongo_url)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('MongoDB connection error:', err));