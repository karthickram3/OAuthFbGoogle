const router = require("express").Router()
const passport = require("passport")


//auth login
router.get("/login", function (req, res) {
    res.render("login", { details: req.user })
})

//auth logout
router.get("/logout", function (req, res) {
    req.logout()
    res.redirect("/")
})


//auth with google
router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
}))


//callback route for google to redirect
router.get("/google/redirect", passport.authenticate("google"), function (req, res) {
    res.render("profile", { details: req.user })

})

router.get("/facebook", passport.authenticate("facebook", {
    scope: "email"
}))

router.get("/facebook/redirect", passport.authenticate("facebook"), function (req, res) {
    res.render("profile-fb", { details: req.user })

})


module.exports = router