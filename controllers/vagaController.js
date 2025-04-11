const Vaga = require('../models/Vaga'); // Importa o modelo Vaga

// Criar uma nova vaga
const criarVagas = async (req, res) => {
  try {
    const vagas = req.body;

    // Validação: Verifica se todas as vagas possuem o campo "tipo"
    const validaVagas = vagas.every((vaga) => vaga.tipo);
    if (!validaVagas) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes em algumas vagas.' });
    }

    // Insere as vagas no banco
    await Vaga.insertMany(vagas);
    res.status(201).json({ message: `${vagas.length} vagas criadas com sucesso.` });
  } catch (error) {
    console.error('Erro ao criar vagas:', error);
    res.status(500).json({ error: 'Erro ao criar vagas.' });
  }
};



// Listar todas as vagas
const listarVagas = async (req, res) => {
    try {
        const vagas = await Vaga.find();
        res.send(vagas);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Atualizar uma vaga
const atualizarVaga = async (req, res) => {
    try {
        const vaga = await Vaga.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vaga) return res.status(404).send({ error: 'Vaga não encontrada' });
        res.send(vaga);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Deletar uma vaga
const deletarVaga = async (req, res) => {
    try {
        const vaga = await Vaga.findByIdAndDelete(req.params.id);
        if (!vaga) return res.status(404).send({ error: 'Vaga não encontrada' });
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { criarVagas, listarVagas, atualizarVaga, deletarVaga };