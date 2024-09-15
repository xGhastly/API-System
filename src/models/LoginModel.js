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
    this.user = await RegisterModel.findOne({ email: this.body.email })

    if(!this.user) { 
      this.errors.push('Email não cadastrado.')
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
      email: this.body.email,
      password: this.body.password
    }
  }

}

module.exports = Login;
