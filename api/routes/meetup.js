const express = require('express');
const router = express.Router();
let axios = require('axios');
const mongoose = require('mongoose');
let config = require('../config/config');
const passport = require('passport');
let MeetupOAuth2Strategy = require('passport-oauth2-meetup').Strategy;


mongoose.connect(config.MONGODB_CONNECTION, {useNewUrlParser: true});

passport.use(new MeetupOAuth2Strategy({
    clientID: config.MEETUP_CLIENT_ID,
    clientSecret: config.MEETUP_CLIENT_SECRET,
    callbackURL: config.MEETUP_CALLBACK_URL,
}, function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));


/**
 * @swagger
 * /auth:
 *    get:
 *      description: Will redirect use to authorize their meetup account
 */
router.get('/auth',
    passport.authenticate('meetup', {session: true}),
    function (req, res) {
        return res.json(req.user);
    });


/**
 * @swagger
 * /callback:
 *    get:
 *      description: Handle callback to generate access token for the authorized meetup user
 */
router.get('/callback', function (req, res) {
    axios.post('https://secure.meetup.com/oauth2/access', {}, {
        params: {
            client_id: config.MEETUP_CLIENT_ID,
            client_secret: config.MEETUP_CLIENT_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: config.MEETUP_CALLBACK_URL,
            code: req.query.code
        }
    }).then((data) => {
        req.flash("user", data.data);
        req.session.user = data.data;
        return res.json(data.data)

    }).catch((error) => {
        // console.error(error)
    });
});

/**
 * @swagger
 * /groups:
 *    get:
 *      description: Get groups of the meetup user
 */
router.get('/groups', function (req, res) 
{
    // let user = req.flash("user");

    var bearerHeader = req.headers["authorization"];
    // console.log(bearerHeader);

    axios.get('https://api.meetup.com/self/groups', 
    {
        headers: {
            Authorization: bearerHeader,
        }
    }).then((data) => {

        return res.json(data.data)

    }).catch((error) => {
        console.error(error)
    });

});

/**
 * @swagger
 * /:urlname:
 *    get:
 *      description: Get events by meetup group for which the user is member of
 */
router.get('/:urlname/', function (req, res) {
    
    // let user = req.flash("user");

    var bearerHeader = req.headers["authorization"];
    // console.log(bearerHeader);

    axios.get(`https://api.meetup.com/${req.params.urlname}/events`, {
        headers: {
            Authorization: bearerHeader,
        }
    }).then((data) => {
        return res.json(data.data)
    }).catch((error) => {
        console.error(error)
    });
});

/**
 * @swagger
 * /:urlname/:event_id/rsvp:
 *    get:
 *      description: Get rsvp list for a specific event
 */
router.get('/:urlname/:event_id/rsvp', function (req, res) {
    
    // let user = req.flash("user");

    var bearerHeader = req.headers["authorization"];
    // console.log(bearerHeader);

    axios.get(`https://api.meetup.com/${req.params.urlname}/events/${req.params.event_id}/rsvps`, {
        headers: {
            Authorization: bearerHeader,
        }
    }).then((data) => {
        return res.json(data.data)
    }).catch((error) => {
        console.error(error)
    });

});

module.exports = router;