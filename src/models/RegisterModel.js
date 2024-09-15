const mongoose = require('mongoose');
const validator = require('validator')

const RegisterSchema = new mongoose.Schema({
  user: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  
});

const RegisterModel = mongoose.model('Register', RegisterSchema);

class Register {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.valida()
    if(this.errors.length > 0) return;
    try {
      this.user = await RegisterModel.create(this.body)
    } catch(e) {
      console.log(e)
    }
    
  }

  valida() {
    this.cleanUp();
    if(this.body.user.length <5) this.errors.push('Usuário precisa ter mais de 4 caracteres');
    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    if(this.body.password.length < 4 || this.body.password.length >=20) {
      this.errors.push('A senha precisa ter entre 4 e 20 caracteres')
    };

  }

  cleanUp() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      user: this.body.user,
      email: this.body.email,
      password: this.body.password
    }
  }
}

module.exports = Register;
