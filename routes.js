const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require ('./src/controllers/registerController')
const funcionariosController = require ('./src/controllers/funcionariosController')

const { loginRequired } = require('./src/middlewares/middleware') 

// Rotas da home
route.get('/', loginRequired ,homeController.index);

// Rotas de login
route.get('/login', loginController.index);
route.post('/login/entrar', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas de Register
route.get('/register', registerController.index);
route.post('/register/send', registerController.register);

// Rotas de Funcionarios
route.get('/funcionarios', loginRequired, funcionariosController.index)
route.get('/funcionarios/registrar', loginRequired, funcionariosController.registrar)
route.get('/funcionarios/registrar/:id', loginRequired, funcionariosController.editIndex)
route.post('/funcionarios/registrar/edit/:id', loginRequired, funcionariosController.edit)
route.post('/funcionarios/registrar/send', loginRequired, funcionariosController.send)
route.get('/funcionarios/registrar/delete/:id', loginRequired, funcionariosController.delete)



module.exports = route;
