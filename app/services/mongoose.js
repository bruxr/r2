const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/r2', { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;
