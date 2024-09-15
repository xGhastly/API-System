const Register = require('../models/RegisterModel')

exports.index = (req, res) => {
    if(req.session.user) return res.render('index')
    return res.render('register');
};

exports.register = async (req, res) => {
    try {   
        const register = new Register(req.body);
        await register.register()

        if (register.errors.length > 0) {
            req.flash('errors', register.errors);
            req.session.save(function () {
                return res.redirect(req.get("Referrer") || "/register");
        });
        return;
    }
    req.flash('success', 'Seu usuário foi criado com sucesso.', 'Você será redirecionado para a tela de Login');
    req.session.save(function () {
        res.redirect(req.get("Referrer") || "/register");
});
    } catch(e) {
        console.log(e)
        return res.render('404')
    }
};
