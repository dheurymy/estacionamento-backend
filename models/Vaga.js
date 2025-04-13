const mongoose = require('mongoose');

// Cria o esquema de Vaga para o MongoDB
const VagaSchema = new mongoose.Schema({
  tipoVaga: {
    type: String, // Tipo da vaga (ex.: preferencial, comum)
    required: true, // Campo obrigatório
  },
  tipoVeiculo: {
    type: String, // Tipo de veículo associado à vaga (ex.: carro, moto)
    required: true, // Campo obrigatório
    enum: ['carro', 'moto'], // Restringe os valores possíveis
  },
  ocupada: {
    type: Boolean, // Indica se a vaga está ocupada
    required: true, // Campo obrigatório
    default: false, // Valor padrão: vaga desocupada
  },
});

module.exports = mongoose.model('Vaga', VagaSchema); // Exporta o modelo Vaga baseado no esquema