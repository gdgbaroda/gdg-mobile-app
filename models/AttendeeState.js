const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendeeStateSchema = new Schema({
    value: String,
    updatedOn: Date,
});

module.exports = mongoose.model('AttendeeState', AttendeeStateSchema);
