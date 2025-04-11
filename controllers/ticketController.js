const Ticket = require('../models/Ticket'); // Importa o modelo Ticket

// Criar um novo ticket
const criarTicket = async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.status(201).send(ticket);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Listar todos os tickets
const listarTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('veiculo vaga');
        res.send(tickets);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Atualizar um ticket
const atualizarTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ticket) return res.status(404).send({ error: 'Ticket não encontrado' });
        res.send(ticket);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Deletar um ticket
const deletarTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) return res.status(404).send({ error: 'Ticket não encontrado' });
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { criarTicket, listarTickets, atualizarTicket, deletarTicket };