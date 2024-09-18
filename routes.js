const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require ('./src/controllers/registerController')
const funcionariosController = require ('./src/controllers/funcionariosController')
const userController = require ('./src/controllers/userController')

const { loginRequired, requireRoleAdmin, requireRoleManager } = require('./src/middlewares/middleware') 

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
route.get('/funcionarios/registrar', loginRequired, requireRoleManager, funcionariosController.registrar)
route.get('/funcionarios/registrar/:id', loginRequired, requireRoleManager, funcionariosController.editIndex)
route.post('/funcionarios/registrar/edit/:id', loginRequired, requireRoleManager, funcionariosController.edit)
route.post('/funcionarios/registrar/send', loginRequired, requireRoleManager, funcionariosController.send)
route.get('/funcionarios/registrar/delete/:id', loginRequired, requireRoleManager, funcionariosController.delete)

// Rotas de User
route.get('/user', loginRequired, requireRoleAdmin, userController.index)
route.get('/user/edit/:id', loginRequired, requireRoleAdmin, userController.editIndex)
route.post('/user/edit/:id', loginRequired, requireRoleAdmin, userController.edit)
route.get('/user/delete/:id', loginRequired, requireRoleAdmin, userController.index)

module.exports = route;
