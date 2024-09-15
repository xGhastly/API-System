const Funcionarios = require('../models/FuncionariosModel')

exports.index = (req, res) => {
    res.render('funcionarios');
  };

  exports.registrar = (req,res) => {
    res.render('reg-funcionario')
}

exports.send = async (req,res) => {
    try {   
        const funcionario = new Funcionarios(req.body);
        await funcionario.register()

        if (funcionario.errors.length > 0) {
            req.flash('errors', funcionario.errors);
            req.session.save(function () {
                return res.redirect(req.get("Referrer") || "/funcionarios/registrar");
        });
        return;
    }
    req.flash('success', 'Funcionario cadastrado com sucesso!');
    req.session.save(function () {
        res.redirect(req.get("Referrer") || "/funcionarios/registrar");
});
    } catch(e) {
        console.log(e)
        return res.render('404')
    }
};

  