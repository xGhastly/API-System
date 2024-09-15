const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require ('./src/controllers/registerController')

// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login', loginController.index);

route.get('/register', registerController.index);
route.post('/register/send', registerController.register);

module.exports = route;
