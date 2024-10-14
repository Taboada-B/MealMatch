const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://btaboada123:lmBy8H5YJWEjUGRK@mealmatch.bew00.mongodb.net/?retryWrites=true&w=majority&appName=MealMatch');

module.exports = mongoose.connection;
