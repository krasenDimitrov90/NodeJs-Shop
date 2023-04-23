const User = require('../models/user');

module.exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: req.session.isAuthenticated,
    });
};

module.exports.postLogin = (req, res, next) => {
    User.findById('6440206ade342937864e52a8')
        .then(user => {
            req.session.user = user;
            req.session.isAuthenticated = true;
            res.redirect('/');
        })
        .catch(err => console.log(err));
};