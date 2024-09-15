const mongoose = require('mongoose');
const validator = require('validator')

const FuncionariosSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  idade: { type: Number, required: true },
  email: { type: String, required: true },
  telefone: { type: Number, required: true },
  empresa: { type: String, required: true },
  cargo: { type: String, required: true }
});

const FuncionariosModel = mongoose.model('Funcionarios', FuncionariosSchema);

class Funcionarios {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.valida()
    if(this.errors.length > 0) return;

    await this.userExists()

    if(this.errors.length > 0) return;
  
    this.user = await FuncionariosModel.create(this.body)

  }

  async userExists() {
    const email = await FuncionariosModel.findOne({ email: this.body.email })
    if (email) this.errors.push('Email já cadastrado.')
  }

  valida() {
    this.cleanUp();
    if(this.body.nome.length <= 0) this.errors.push('Coloque um nome.')
    if(this.body.idade.length <= 0) this.errors.push('Coloque uma idade.')
    if(this.body.email.length <= 0) this.errors.push('Coloque um email.')
    if(this.body.telefone.length <= 0) this.errors.push('Coloque um telefone.')
    if(this.body.empresa.length <= 0) this.errors.push('Coloque uma empresa.')
    if(this.body.cargo.length <= 0) this.errors.push('Coloque um cargo.')
    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    if(this.body.idade.length <= 0 || !this.body.idade == Number) this.errors.push('Você deve colocar sua idade em número');
  }

  cleanUp() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      nome: this.body.nome,
      idade: this.body.idade,
      email: this.body.email,
      telefone: this.body.telefone,
      empresa: this.body.empresa,
      cargo: this.body.cargo,
    }
  }
  
}

module.exports = Funcionarios;
