const Register = require('../models/RegisterModel')

exports.index = async (req, res) => {
    const usuario = await Register.buscaUsuario()
    res.render('user', { usuario });
  };