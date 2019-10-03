const express = require('express');
const router = express.Router();
let axios = require('axios');
const mongoose = require('mongoose');
let config = require('../config/config');


mongoose.connect(config.MONGODB_CONNECTION, {useNewUrlParser: true});


router.get('/', function (req, res) {
    let user = req.flash("user");
    let access_token = user[0].access_token;

    axios.get('https://api.meetup.com/self/groups', {
        headers: {
            Authorization: "Bearer " + access_token,
        }
    }).then((data) => {
        return res.json(data.data)
    }).catch((error) => {
        console.error(error)
    });
});


module.exports = router;
