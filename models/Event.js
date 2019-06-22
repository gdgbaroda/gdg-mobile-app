const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    banner: String,
    title: String,
    description: String,
    hosts: Array,
    attendees: Array,
    venue: Object,
    duration: Object,
    isActive: Boolean,
});

module.exports = mongoose.model('Event', EventSchema);
