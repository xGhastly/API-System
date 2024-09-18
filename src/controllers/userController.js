const Register = require('../models/RegisterModel')

exports.index = async (req, res) => {
    const usuario = await Register.buscaUsuario()
    res.render('user', { usuario });
  };

  exports.delete = async (req,res) => {
    try {
        if(!req.params.id) return res.render('404')

            const usuario = await Register.delete(req.params.id)
        
            if(!usuario) return res.render('404');

            req.flash('success', 'Usuário apagado com sucesso.');
            req.session.save(function () {
                res.redirect(req.get("Referrer") || `/user`);
                return
            })
        
            
    } catch(e) {
        console.log(e)
        return res.render('404')
    }
}

exports.editIndex = async (req,res) => {
  try {
      if(!req.params.id) return res.render('404')

          const usuario = await Register.buscaPorId(req.params.id)
      
          if(!usuario) return res.render('404');
      
          res.render('edit-user', {usuario})
  } catch(e) {
      console.log(e)
      return res.render('404')
  }
  
}

exports.edit = async (req,res) => {
  try {
      if(!req.params.id) return res.render('404')
          const usuario = new Register(req.body)
          await usuario.edit(req.params.id)
      
              if (usuario.errors.length > 0) {
                  req.flash('errors', usuario.errors);
                  req.session.save(function () {
                      res.redirect(req.get("Referrer") || `/user/edit/${req.params.id}`);
                      return
              });
              return;
          }
          
          req.flash('success', 'Usuario editado com sucesso.');
          req.session.save(function () {
              res.redirect(req.get("Referrer") || `/user/edit/${usuario.user._id}`);
              return
          })

  } catch(e) {
      console.log(e)
      return res.render('404')
  }
};