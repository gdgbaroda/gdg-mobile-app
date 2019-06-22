const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendeeSchema = new Schema({
    fullname: String,
    email: String,
    state: Array,
});

module.exports = mongoose.model('Attendee', AttendeeSchema);
