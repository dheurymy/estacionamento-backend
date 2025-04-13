const mongoose = require('mongoose'); // Importa o módulo mongoose


const VeiculoSchema = new mongoose.Schema({ // Cria um novo esquema de veiculo
  placa: {
    type: String, // Define o tipo como String
    required: true, // Campo obrigatório
  },
  tipoVeiculo: {
    type: String, // Define o tipo como String
    required: true, // Campo obrigatório
    enum: ['carro', 'moto']
  },
  preferencial: {
    type: Boolean, // Define o tipo como Booleano
    default: false, // Valor padrão é falso
  },
});



module.exports = mongoose.model('Veiculo', VeiculoSchema); // Exporta o modelo Veiculo baseado no esquema
