module.exports = function (app, passport) {

    // homepage
    app.get('/', (req, res) => {
        res.render('index.ejs')
    })

    //login form
    app.get('/login', (req, res) => {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') })
    })

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.get('/signup', (req, res) => {
        res.render('signup.ejs', { message: req.flash('signupMessage') })
    })

    //proccess signup
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',  // redirect to the secure profile page
        failureRedirect: '/signup',  // redirect to signup page
        failureFlash: true  // allow falsh messages.
    }))

    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile.ejs', {
            user: req.user // get the user our of session and pass to template
        })
    })

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
    }));

    app.get('/logout', (req, res) => {
        req.logout()
        res.redirect('/')
    })

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next()

        res.redirect('/')
    }
}