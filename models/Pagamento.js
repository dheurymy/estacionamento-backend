const mongoose = require('mongoose'); // Importa o módulo mongoose

const PagamentoSchema = new mongoose.Schema({
  ticket: {
    type: mongoose.Schema.Types.ObjectId, // Referência ao ticket associado ao pagamento
    ref: 'Ticket', // Relaciona com o modelo Ticket
    required: true,
  },
  valor: {
    type: Number, // Valor do pagamento
    required: true,
  },
  metodo: {
    type: String, // Método utilizado (ex.: dinheiro, cartão, pix)
    required: true,
    enum: ['credito', 'debito', 'pix'], // Valores aceitos
  },
  status: {
    type: String, // Status da transação
    required: true,
    enum: ['pendente', 'pago', 'cancelado'], // Possíveis estados
    default: 'pendente', // Inicia como pendente
  },
  dataPagamento: {
    type: Date, // Data e hora em que o pagamento foi realizado
    default: Date.now, // Preenchido automaticamente com a data atual
  },
});

module.exports = mongoose.model('Pagamento', PagamentoSchema); // Exporta o modelo Pagamento baseado no esquema