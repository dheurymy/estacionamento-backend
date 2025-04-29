const express = require('express'); // Importa o módulo express para criar o servidor
const mongoose = require('mongoose'); // Importa o módulo mongoose para interagir com o MongoDB
const cors = require('cors'); // Importa o módulo cors para permitir requisições de diferentes origens
const dotenv = require('dotenv'); // Importa o módulo dotenv para gerenciar variáveis de ambiente

const veiculoController = require('./controllers/veiculoController');
const vagaController = require('./controllers/vagaController');
const ticketController = require('./controllers/ticketController');


dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express(); // Cria uma instância do aplicativo Express
const PORT = process.env.PORT || 5000; // Define a porta do servidor a partir da variável de ambiente ou usa 5000 como padrão
const MONGO_URI = process.env.MONGO_URI; // Obtém a URI de conexão do MongoDB a partir da variável de ambiente


app.use(cors()); // Utiliza o middleware CORS
app.use(express.json()); // Utiliza o middleware para parsear o corpo das requisições como JSON

app.use((req, res, next) => { 
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin'); 
  next(); 
});

mongoose.connect(MONGO_URI, {
  
})
.then(() => console.log('Connected to MongoDB')) // Mensagem de sucesso na conexão com o MongoDB
.catch(err => console.error('Error connecting to MongoDB:', err.message)); // Mensagem de erro na conexão com o MongoDB





app.get('/', (req, res) => {
  res.send('API do Estaciona Aqui funcionando a todo vapor!')
})

// Rotas para Veículo
app.post('/veiculos', veiculoController.criarVeiculo);
app.get('/veiculos', veiculoController.listarVeiculos);
app.get('/veiculos/:id', veiculoController.pegarVeiculo);

app.delete('/veiculos/:id', veiculoController.deletarVeiculo);




app.post('/veiculos/registrar', veiculoController.registrarVeiculoComTicket);



// Rotas para Vaga
app.post('/vagas', vagaController.criarVagas);
app.get('/vagas', vagaController.listarVagas);
app.put('/vagas/:id', vagaController.atualizarVaga);
app.delete('/vagas/:id', vagaController.deletarVaga);
app.delete('/vagas', vagaController.deletarVagasPorTipo);

// Rotas para Ticket
app.post('/tickets', ticketController.criarTicket);
app.get('/tickets', ticketController.listarTickets);
app.put('/tickets/:id', ticketController.atualizarTicket);
app.delete('/tickets/:id', ticketController.deletarTicket);
app.get('/tickets/:numero', ticketController.pegarTicketPorNumero);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Mensagem indicando que o servidor está rodando na porta especificada
});
