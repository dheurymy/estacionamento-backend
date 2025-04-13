const Veiculo = require('../models/Veiculo'); // Importa o modelo Veiculo
const Ticket = require('../models/Ticket');
const Vaga = require('../models/Vaga');

// Criar um novo veículo
const criarVeiculo = async (req, res) => {
    try {
        const { placa, tipoVeiculo, preferencial } = req.body;

        // Validação de campos obrigatórios
        if (!placa || !tipoVeiculo) {
            return res.status(400).send({ error: 'Placa e tipo do veículo são obrigatórios.' });
        }

        // Verificar duplicatas
        const veiculoExistente = await Veiculo.findOne({ placa });
        if (veiculoExistente) {
            return res.status(400).send({ error: 'Veículo com esta placa já está registrado.' });
        }

        // Criar e salvar o novo veículo
        const veiculo = new Veiculo({ placa, tipoVeiculo, preferencial});
        await veiculo.save();

        res.status(201).send(veiculo);
    } catch (error) {
        console.error('Erro ao criar veículo:', error);
        res.status(500).send({ error: 'Erro interno do servidor.' });
    }
};

// Listar todos os veículos
const listarVeiculos = async (req, res) => {
    try {
        const veiculos = await Veiculo.find();
        res.send(veiculos);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Atualizar um veículo
const atualizarVeiculo = async (req, res) => {
    try {
        const veiculo = await Veiculo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!veiculo) return res.status(404).send({ error: 'Veículo não encontrado' });
        res.send(veiculo);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Deletar um veículo
const deletarVeiculo = async (req, res) => {
    try {
        const veiculo = await Veiculo.findByIdAndDelete(req.params.id);
        if (!veiculo) return res.status(404).send({ error: 'Veículo não encontrado' });
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
};

// Registrar veículo e gerar ticket

const registrarVeiculoComTicket = async (req, res) => {
  try {
    const { placa, tipoVeiculo, preferencial } = req.body;
    const tipoVaga = preferencial ? 'preferencial' : 'comum'; // Define o tipo de vaga com base na preferência

    // Verifica se há vagas disponíveis para o tipo de veículo
    const vagaDisponivel = await Vaga.findOne({ tipoVeiculo, tipoVaga, ocupada: false });
    if (!vagaDisponivel) {
      return res.status(400).json({ error: 'Não há vagas disponíveis para este tipo de veículo.' });
    }

    // Verificar duplicatas
    const veiculoExistente = await Veiculo.findOne({ placa });
    if (veiculoExistente) {
        return res.status(400).send({ error: 'Veículo com esta placa já está registrado.' });
    }

    // Cria o veículo no banco de dados
    const veiculo = new Veiculo({ placa, tipoVeiculo, preferencial });
    await veiculo.save();

    // Cria o ticket associado ao veículo e à vaga
    const ticket = new Ticket({
      numero: `TICKET-${Date.now()}`,
      veiculo: veiculo._id,
      vaga: vagaDisponivel._id,
    });
    await ticket.save();

    // Atualiza o status da vaga para ocupada
    vagaDisponivel.ocupada = true;
    await vagaDisponivel.save();

    // Retorna informações do veículo, ticket e vaga
    res.status(201).json({
      message: 'Veículo registrado com sucesso, ticket gerado e vaga atualizada.',
      veiculo,
      ticket,
      vaga: vagaDisponivel,
    });
  } catch (error) {
    console.error('Erro ao registrar veículo:', error);
    res.status(500).json({ error: 'Erro ao registrar veículo e gerar ticket.' });
  }
};



module.exports = { registrarVeiculoComTicket, criarVeiculo, listarVeiculos, atualizarVeiculo, deletarVeiculo };