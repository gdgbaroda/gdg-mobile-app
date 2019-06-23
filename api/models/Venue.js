const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VenueSchema = new Schema({
    address: String,
    city: String,
    state: String,
    country: String,
    pinCode: Number,
});

module.exports = mongoose.model('Venue', VenueSchema);
