const mongoose = require('mongoose');
const RegisterModel = require('./RegisterModel').RegisterModel
const validator = require('validator')
const bcryptjs = require('bcryptjs')

class Login {
  constructor(body) {
    this.body = body;
    this.errors = []
    this.user = null
  }
  async login() {
    this.user = await RegisterModel.findOne({ user: this.body.user })

    if(!this.user) { 
      this.errors.push('Usuário não existe.')
      return;
    };
    if(!bcryptjs.compareSync(this.body.password, this.user.password)){
      this.errors.push('Senha inválida.')
      this.user = null
      return;
    }
    
    
  }
  cleanUp() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      user: this.body.user,
      password: this.body.password
    }
  }

}

module.exports = Login;
