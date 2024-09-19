const mongoose = require('mongoose');
const validator = require('validator')
const bcryptjs = require('bcryptjs')
require('dotenv').config();

const RegisterSchema = new mongoose.Schema({
  user: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now },
  role: { type: String, enum: ['admin', 'user', 'manager'], default: 'user' }
});

const RegisterModel = mongoose.model('Usuários', RegisterSchema);

class Register {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.valida()
    if (this.errors.length > 0) return;

    await this.userExists()

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await RegisterModel.create(this.body);
  }

  async userExists() {
    const email = await RegisterModel.findOne({ email: this.body.email })
    const user = await RegisterModel.findOne({ user: this.body.user })
    if (email) this.errors.push('Email já cadastrado.')
    if (user) this.errors.push('Usuário já cadastrado.')
  }

  static async buscaUsuario() {
    const usuario = await RegisterModel.find()
      .sort({ criadoEm: -1 })
    return usuario
  }

  static async buscaPorId(id) {
    const usuario = await RegisterModel.findById(id);
    return usuario
  }

  async edit(id) {
    if (typeof id !== 'string') return;
    this.user = await RegisterModel.findByIdAndUpdate(id, this.body, { new: true });
  }

  static async delete(id) {
    if (typeof id !== 'string') return;
    const usuario = await RegisterModel.findByIdAndDelete(id);
    return usuario;
  }

  static async createDefaultAdmin() {
    try {
      // Verifica se já existe um administrador no banco de dados
      const admin = await RegisterModel.findOne({ role: 'admin' });
      const adminPassword = process.env.ADMIN_PASSWORD
      const adminEmail = process.env.ADMIN_EMAIL

      if (!admin) {
        // Se não existir, cria um novo administrador padrão
        const hashedPassword = await bcryptjs.hash(adminPassword, 10); // Define uma senha padrão (ex: 'admin123')

        const newAdmin = await RegisterModel.create({
          user: 'admin',
          email: adminEmail,
          password: hashedPassword,
          role: 'admin'
        })
        console.log('Administrador padrão criado com sucesso.');
      } else {
        console.log('Já existe um administrador no sistema.');
      }
    } catch (error) {
      console.error('Erro ao criar administrador padrão:', error);
    }
  }

  valida() {
    this.cleanUp();
    if (this.body.user.length < 5) this.errors.push('Usuário precisa ter mais de 4 caracteres');
    if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    if (this.body.password.length < 4 || this.body.password.length >= 20) {
      this.errors.push('A senha precisa ter entre 4 e 20 caracteres')
    };

  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
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
module.exports.RegisterModel = RegisterModel

