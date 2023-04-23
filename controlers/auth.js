module.exports.getLogin = (req, res, next) => {
    const isLoggedin = req.get('Cookie').trim().split('=')[1];
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: isLoggedin,
    });
};

module.exports.postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie', 'loggin=true');
    res.redirect('/');
};