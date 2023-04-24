const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: req.session.isAuthenticated,
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false
    });
};

module.exports.postLogin = (req, res, next) => {
    User.findById('6440206ade342937864e52a8')
        .then(user => {
            req.session.user = user;
            req.session.isAuthenticated = true;
            req.session.save((err) => {
                console.log(err);
                res.redirect('/');
            });
        })
        .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                return res.redirect('/signup');
            }

            return bcrypt.hash(password, 12);
        })
        .then(hash => {
            const user = new User({
                email: email,
                password: hash,
                cart: { items: [] },
            });

            return user.save();
        })
        .then(result => {
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    })
};