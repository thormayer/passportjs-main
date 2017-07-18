var express = require('express')
var app = express()
var port = process.env.PORT || 8080
var mongoose = require('mongoose')
var passport = require('passport')
var flash = require('connect-flash')
var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
var path = require('path')
var configDB = require('./config/database.js')


// configurations  ------------------------
mongoose.connect(configDB.url) // connect to our DB

require('./config/passport')(passport) // pass passport for configuration 




// set up our express application 
app.use(morgan('dev')) // log every request to the console.. 
app.use(cookieParser())
app.use(bodyParser())

app.set('view-engine', 'ejs')

// required for passport 
app.use(session({secret: 'gilad'})) // session secret
app.use(passport.initialize())
app.use(passport.session()) // presistent login session
app.use(flash()) // use connect-flash for flash messages stored in session


// routes ----------------------------------
require('./app/routes.js')(app, passport) // load our routes and pass in our app and fully configured passport


// launch ----------------------------------

app.listen(port)
console.log('server listen to port '+ port )