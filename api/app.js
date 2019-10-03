let createError = require('http-errors');
let express = require('express');
let path = require('path');
let flash = require('connect-flash');

let session = require('express-session');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let config = require('./config/config');
// let meetupAuthRouter = require('./routes/meetup-auth');

let meetupDataApi = require('./routes/meetup');
let ticketsApi = require('./routes/tickets');
let meetupDataApiParsed = require('./routes/meetup-parsed');

// let meetupGroupList = require('./routes/meetup-groups-list');
// let meetupEventsList = require('./routes/meetup-event-list');
// let meetupRsvp = require('./routes/meetup-rsvp');

const PORT = 8080;
const HOST = '0.0.0.0';

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    cookie: {maxAge: 60000},
    secret: 'woot',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

//app.use('/meetup/source', meetupDataApi);
app.use('/tickets/', ticketsApi);
app.use('/meetup/', meetupDataApiParsed);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

module.exports = app;
