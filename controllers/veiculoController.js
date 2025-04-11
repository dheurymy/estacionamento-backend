const Veiculo = require('../models/Veiculo'); // Importa o modelo Veiculo

// Criar um novo veículo
const criarVeiculo = async (req, res) => {
    try {
        const { placa, tipo, pne } = req.body;

        // Validação de campos obrigatórios
        if (!placa || !tipo) {
            return res.status(400).send({ error: 'Placa e tipo do veículo são obrigatórios.' });
        }

        // Verificar duplicatas
        const veiculoExistente = await Veiculo.findOne({ placa });
        if (veiculoExistente) {
            return res.status(400).send({ error: 'Veículo com esta placa já está registrado.' });
        }

        // Criar e salvar o novo veículo
        const veiculo = new Veiculo({ placa, tipo, pne });
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

module.exports = { criarVeiculo, listarVeiculos, atualizarVeiculo, deletarVeiculo };