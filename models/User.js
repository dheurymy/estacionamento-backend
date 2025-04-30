const mongoose = require('mongoose'); // Importa o módulo mongoose
const bcrypt = require('bcryptjs'); // Importa o módulo bcryptjs para hash de senhas
const jwt = require('jsonwebtoken'); // Importa o módulo jsonwebtoken para autenticação

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// Função para hash da senha antes de salvar
UserSchema.pre('save', async function(next) { 
  const user = this;
  if (user.isModified('password')) { 
    user.password = await bcrypt.hash(user.password, 8); 
  }
  next(); 
});

// Método para comparar senhas
UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Método para gerar token JWT
UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

module.exports = mongoose.model('User', UserSchema);