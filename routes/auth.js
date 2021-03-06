/**
 * Created by on 09.02.2016.
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config/config');

module.exports = function (passport) {

    /* GET login page. */
    router.get('/', function (req, res) {
        res.json({message: req.flash('message')});
    });

    /* Handle Login POST */
    router.post('/login', function (req, res, next) {
        passport.authenticate('login', function (err, user, info) {
            if (user) {
                res.user = user;
                var token = jwt.sign({
                    userId: user._id,
                    name: user.displayName,
                    username: user.login,
                    role: user.role,
                    cartAmount: user.cart.length
                }, config.privateKey, {
                    expiresIn: 1440 * 60 // expires in 24 hours
                });
                res.json({message: "OK", token: token});
            } else {
                res.json({message: req.flash('message')});
            }
        })(req, res, next);
    });

    /* GET Registration Page */
    router.get('/signup', function (req, res) {
        res.json({message: req.flash('message')});
    });

    /* Handle Registration POST */
    router.post('/signup', function (req, res, next) {
        passport.authenticate('signup', function (err, user, info) {
            if (user) {
                res.json({message: "OK"});
            } else {
                res.json({message: req.flash('message')});
            }

        })(req, res, next);
    });

    /* Handle Logout */
    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/hasRole', function (req, res) {
        var user = req.decoded;
        if (user) {
            var roleName = req.query.roleName;
            var roles = config.roles;
            var hasRole = false;
            for (var i in roles) {
                var role = roles[i];
                if (role.id == user.role) {
                    console.log(role.name + ' ' + roleName);
                    if (role.name === roleName) {
                        hasRole = true;
                        break;
                    }
                }
            }
            res.json({hasRole: hasRole});
        } else {
            res.json({hasRole: false});
        }
    });

    router.get('/me', function (req, res) {
        if (req.decoded) {
            res.json(req.decoded);
        } else {
            res.json({userId: 0, role: 0});
        }
    });

    return router;
};
