const mongoose = require('mongoose'); // Importa o módulo mongoose

const TicketSchema = new mongoose.Schema({
  numero: {
    type: String, // Identificador único para o ticket
    required: true,
    unique: true, // Garante que não haverá tickets duplicados
  },
  dataEntrada: {
    type: Date, // Registra a data e hora de entrada do veículo
    required: true,
    default: Date.now, // Define a hora atual como padrão
  },
  dataSaida: {
    type: Date, // Registra a data e hora de saída, se aplicável
    default: Date.now, // Define a hora atual como padrão
  },
  valor: {
    type: Number, // Valor a ser pago (calculado na saída)
    default: 0, // Inicialmente será zero
  },
  veiculo: {
    type: mongoose.Schema.Types.ObjectId, // Refere-se ao ID do veículo
    ref: 'Veiculo', // Faz referência ao modelo "Veiculo"
    required: true,
  },
  vaga: {
    type: mongoose.Schema.Types.ObjectId, // Refere-se ao ID da vaga
    ref: 'Vaga', // Faz referência ao modelo "Vaga"
    required: true,
  },
  status: {
    type: String, // Status do ticket (ex: "aberto", "fechado")
    enum: ['aberto', 'fechado'], // Restringe os valores possíveis
    default: 'aberto', // Define o padrão como "aberto"
  },
});

module.exports = mongoose.model('Ticket', TicketSchema); // Exporta o modelo Ticket baseado no esquema