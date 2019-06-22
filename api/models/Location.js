const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    city: String,
    country: String,
});

module.exports = mongoose.model('Location', LocationSchema);
