const Funcionarios = require('../models/FuncionariosModel')

exports.index = async (req, res) => {
    const funcionario = await Funcionarios.buscaFuncionario()
    res.render('funcionarios', { funcionario });
  };

  exports.registrar = (req,res) => {
    res.render('reg-funcionario', {
        funcionario: {}
    })
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
        res.redirect(req.get("Referrer") || `/funcionarios`);
        return
});
    } catch(e) {
        console.log(e)
        return res.render('404')
    }
};

exports.editIndex = async (req,res) => {
    try {
        if(!req.params.id) return res.render('404')

            const funcionario = await Funcionarios.buscaPorId(req.params.id)
        
            if(!funcionario) return res.render('404');
        
            res.render('reg-funcionario', {funcionario})
    } catch(e) {
        console.log(e)
        return res.render('404')
    }
    
}

exports.edit = async (req,res) => {
    try {
        if(!req.params.id) return res.render('404')
            const funcionario = new Funcionarios(req.body)
            await funcionario.edit(req.params.id)
        
                if (funcionario.errors.length > 0) {
                    req.flash('errors', funcionario.errors);
                    req.session.save(function () {
                        res.redirect(req.get("Referrer") || `/funcionarios/registrar/${req.params.id}`);
                        return
                });
                return;
            }
            req.flash('success', 'Contato editado com sucesso.');
            req.session.save(function () {
                res.redirect(req.get("Referrer") || `/funcionarios/registrar/${funcionario.user._id}`);
                return
            })

    } catch(e) {
        console.log(e)
        return res.render('404')
    }
};

exports.delete = async (req,res) => {
    try {
        if(!req.params.id) return res.render('404')

            const funcionario = await Funcionarios.delete(req.params.id)
        
            if(!funcionario) return res.render('404');

            req.flash('success', 'Contato apagado com sucesso.');
            req.session.save(function () {
                res.redirect(req.get("Referrer") || `/funcionarios`);
                return
            })
        
            
    } catch(e) {
        console.log(e)
        return res.render('404')
    }
}