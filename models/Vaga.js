const mongoose = require('mongoose'); // Importa o módulo mongoose


const VagaSchema = new mongoose.Schema({ // Cria um novo esquema de vaga
  tipo: {
    type: String, // Define o tipo como String
    required: true, // Campo obrigatório
  },
  ocupada: {
    type: Boolean, // Define o tipo como Booleano
    required: true, // Campo obrigatório
    default: false,
  },
  identificador: {
    type: String,
    required: true,
  }
});



module.exports = mongoose.model('Vaga', VagaSchema); // Exporta o modelo Vaga baseado no esquema
