const express = require('express');
const router = express.Router();
let axios = require('axios');
const mongoose = require('mongoose');
const passport = require('passport');
let MeetupOAuth2Strategy = require('passport-oauth2-meetup').Strategy;

let User = require('../models/users');
mongoose.connect('mongodb://localhost:27017/raize', {useNewUrlParser: true});

passport.use(new MeetupOAuth2Strategy({
    clientID: '7h0rfilbk1h5bqmaun3rjv5vup',
    clientSecret: '67cf4taabltpu080gsqfi9790c',
    callbackURL: "http://localhost/auth/meetup/callback",
    autoGenerateUsername: true
}, function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

router.get('/auth/meetup',
    passport.authenticate('meetup', {session: false}),
    function (req, res) {
        return res.json(req.user);
    });

router.get('/auth/meetup/callback', function (req, res) {
    let data;
    axios.post('https://secure.meetup.com/oauth2/access', {}, {
        params: {
            client_id: '7h0rfilbk1h5bqmaun3rjv5vup',
            client_secret: 'co86t9hoi3lo58qatlu6c6277m',
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost/auth/meetup/callback',
            code: req.query.code
        }
    }).then((data) => {
        return res.json(data.data)
    }).catch((error) => {
        console.error(error)
    });
});


module.exports = router;