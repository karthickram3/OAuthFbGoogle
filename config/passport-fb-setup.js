const passport = require("passport")
const FacebookStrategy = require("passport-facebook")
const keys = require("./keys")
const User1 = require("../models/user-model-fb")

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User1.findById(id).then(function (user) {
        done(null, user)
    })
})

passport.use(
    new FacebookStrategy({
        //option for google strat
        callbackURL: "/auth/facebook/redirect",
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret

    }, function (accessToken, refreshToken, profile, done) {
        console.log("logging using google+++++++++++")
        console.log(profile)
        //check if user already exists in our db
        User1.findOne({ facebookId: profile.id }).then(function (currentUser) {
            if (currentUser) {
                //already have the User
                console.log("user is " + currentUser)
                done(null, currentUser)

            } else {
                //if not create new User
                new User1({
                    userName: profile.displayName,
                    facebookId: profile.id
                }).save().then(function (newUser) {
                    console.log("newUser created" + newUser)
                    done(null, newUser)
                })
            }

        })

    })
)
