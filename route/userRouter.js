'use strict';
var express = require('express');
var UserRegistration = require('../model/userRegistration.js');
var bodyParser = require('body-parser');
var passport = require('passport');
var userRouter = express.Router();
var verify = require('../verify/verify.js');
var jwt = require('jsonwebtoken');
var config = require('../config/db.js');
userRouter.use(bodyParser.json());
userRouter.post('/register', function(req, res) {
    console.log(req.body);
    UserRegistration.register(new UserRegistration({
        username: req.body.username,
        email: req.body.email,
    }), req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({
                err: err
            });
        }
        return res.status(200).json({
            status: 'Registration Sucessful'
        });
    });
});

userRouter.post('/checkusername', function(req, res) {
    console.log(req.body.username);
    UserRegistration.find({
        username: req.body.username
    }, function(err, user) {
        if (err) {
            return res.status(500).json({
                err: err
            });
        }
        if (!user[0]) {
            return res.status(200).json({
                isRegister: false,
                user: user
            });
        }
        if (user) {
            return res.status(200).json({
                isRegister: true,
                user: user
            });
        }
    });
});
userRouter.post('/login', function(req, res, next) {

    passport.authenticate('local', function(err, user, info) {
        console.log(user);
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            var token = verify.getToken(user);
            res.cookie('auth', token);
            res.status(200).json({
                status: 'Login Sucessfull',
                success: true,
                token: token,
                user: user
            });
        });
    })(req, res, next);
});

userRouter.get('/user', function(req, res) {
    var token = req.cookies.auth;
    if (token) {
        jwt.verify(token, config.secretKey, function(err, decoded) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            } else {
                return res.status(200).json({
                    user: decoded._doc
                });
            }
        });
    } else {
        return res.status(500).json({
            err: 'No token provided'
        });
    }
});
userRouter.get('/logout', function(req, res, next) {
    req.logout();
    res.clearCookie('auth');
    res.status(200).json({
        status: 'Bye'
    });
});

module.exports = userRouter;
