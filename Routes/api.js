const express = require("express");
const User = require("../models/User");
const saltRounds = 10;
const passport = require("passport");

const router = express.Router();

router.get("/", function(req, res){
    res.render("home");
});

router.get("/login", function(req, res){
    res.render("login");
});

router.get("/register", function(req, res){
    res.render("register");
});

router.get("/secrets", function(req, res){
    if(req.isAuthenticated()){
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

router.post("/register", function(req,res){
    // .register is from passport-local-mongoose
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
    });
});

router.post("/login", function(req,res){
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function(err){
        if (err){
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });  
        }
    });
});

module.exports = router;