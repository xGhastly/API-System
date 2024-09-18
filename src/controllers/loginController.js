const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    res.render('login' )
}

exports.login = async (req, res) => {
    try {   
        const login = new Login(req.body)
        await login.login()

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect(req.get("Referrer") || "/login");
        });
        return;
    }
    req.flash('success', 'Você logou com sucesso.');
    req.session.user = login.user;
    req.session.save(function () {
        res.redirect(req.get("Referrer") || "/login");
});
    } catch(e) {
        console.log(e)
        return res.render('404')
    }
};

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect(req.get("Referrer") || "/login");
}