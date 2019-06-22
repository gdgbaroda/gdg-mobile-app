const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HostSchema = new Schema({
    fullname: String,
    email: String,
});

module.exports = mongoose.model('Host', HostSchema);
