const express = require("express");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

router.post("/register", function(req,res){
    bcrypt.hash(req.body.password, saltRounds, function(err, hash){
        const newUser = new User({
            email: req.body.username,
            password: hash
        });
        newUser.save(function(err){
            if(err){
                console.log(err);
            }else{
                res.render("secrets");
            }
        });
    })
});


router.post("/login", function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}, function(err, foundUser){
        if(err){
            console.log(err)
        }else{
            if(foundUser){
                bcrypt.compare(password, foundUser.password, function(err, hashResult){
                    if(hashResult === true){
                        res.render("secrets");
                    }
                });
            }
        }
    });
});

module.exports = router;