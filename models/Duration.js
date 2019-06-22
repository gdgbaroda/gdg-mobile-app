const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DurationSchema = new Schema({
    start: Object,
    end: Object,
});

module.exports = mongoose.model('Duration', DurationSchema);
