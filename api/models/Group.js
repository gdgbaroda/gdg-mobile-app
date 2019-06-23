const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    title: String,
    source: String,
    location: Object,
    events: Array,
    lastUpdatedOn: Date,
    isActive: Boolean,
});

module.exports = mongoose.model('Group', GroupSchema);
