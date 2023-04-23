module.exports.getLogin = (req, res, next) => {
    console.log(req.session.isAuthenticated);
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: false,
    });
};

module.exports.postLogin = (req, res, next) => {
    req.session.isAuthenticated = true;
    res.redirect('/');
};