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



// Deletar vagas por tipo e quantidade
const deletarVagasPorTipo = async (req, res) => {
  try {
    const { tipo, quantidade } = req.body;

    // Verifica se tipo e quantidade são válidos
    if (!tipo || !quantidade || quantidade <= 0) {
      return res.status(400).json({ error: 'Tipo e quantidade válidos são obrigatórios.' });
    }

    // Contar quantas vagas existem do tipo especificado
    const totalVagas = await Vaga.countDocuments({ tipo });

    // Verifica se a quantidade solicitada é maior do que as vagas disponíveis
    if (quantidade > totalVagas) {
      return res.status(400).json({ 
        error: `Não é possível deletar ${quantidade} vagas do tipo "${tipo}". Apenas ${totalVagas} vagas disponíveis.` 
      });
    }

    // Encontrar vagas do tipo especificado e limitar à quantidade solicitada
    const vagasParaDeletar = await Vaga.find({ tipo }).limit(quantidade);

    // Deletar as vagas
    const vagasDeletadas = await Vaga.deleteMany({ _id: { $in: vagasParaDeletar.map(vaga => vaga._id) } });

    res.status(200).json({ 
      message: `${vagasDeletadas.deletedCount} vagas do tipo "${tipo}" deletadas com sucesso.` 
    });
  } catch (error) {
    console.error('Erro ao deletar vagas:', error);
    res.status(500).json({ error: 'Erro ao deletar vagas.' });
  }
};



module.exports = { criarVagas, listarVagas, atualizarVaga, deletarVaga, deletarVagasPorTipo };