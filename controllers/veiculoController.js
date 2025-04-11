const Veiculo = require('../models/Veiculo'); // Importa o modelo Veiculo

// Criar um novo veículo
const criarVeiculo = async (req, res) => {
    try {
        const veiculo = new Veiculo(req.body);
        await veiculo.save();
        res.status(201).send(veiculo);
    } catch (error) {
        res.status(400).send(error);
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