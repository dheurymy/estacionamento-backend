const mongoose = require('mongoose'); // Importa o módulo mongoose


const VeiculoSchema = new mongoose.Schema({ // Cria um novo esquema de veiculo
  placa: {
    type: String, // Define o tipo como String
    required: true, // Campo obrigatório
  },
  tipo: {
    type: String, // Define o tipo como String
    required: true, // Campo obrigatório
    enum: ['carro', 'moto']
  },
  pne: {
    type: Boolean, // Define o tipo como Booleano
    required: true, // Campo obrigatório
    default: false,
  }
});



module.exports = mongoose.model('Veiculo', VeiculoSchema); // Exporta o modelo Veiculo baseado no esquema
