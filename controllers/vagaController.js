const Vaga = require('../models/Vaga'); // Importa o modelo Vaga

// Criar novas vagas
const criarVagas = async (req, res) => {
  try {
    const vagas = req.body;

    // Validação: Verifica se todas as vagas possuem os campos obrigatórios
    const validaVagas = vagas.every((vaga) => vaga.tipoVaga && vaga.tipoVeiculo);
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
    console.error('Erro ao listar vagas:', error);
    res.status(500).send({ error: 'Erro ao listar vagas.' });
  }
};

// Atualizar uma vaga
const atualizarVaga = async (req, res) => {
  try {
    const vaga = await Vaga.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vaga) return res.status(404).send({ error: 'Vaga não encontrada.' });
    res.send(vaga);
  } catch (error) {
    console.error('Erro ao atualizar vaga:', error);
    res.status(400).send({ error: 'Erro ao atualizar vaga.' });
  }
};

// Deletar uma vaga
const deletarVaga = async (req, res) => {
  try {
    const vaga = await Vaga.findByIdAndDelete(req.params.id);
    if (!vaga) return res.status(404).send({ error: 'Vaga não encontrada.' });
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar vaga:', error);
    res.status(500).send({ error: 'Erro ao deletar vaga.' });
  }
};

// Deletar vagas por tipo e quantidade
const deletarVagasPorTipo = async (req, res) => {
  try {
    const { tipoVaga, tipoVeiculo, quantidade } = req.body;

    // Verifica se os parâmetros são válidos
    if (!tipoVaga || !tipoVeiculo || !quantidade || quantidade <= 0) {
      return res.status(400).json({ error: 'Tipo de vaga, tipo de veículo e quantidade válidos são obrigatórios.' });
    }

    // Contar quantas vagas existem do tipo especificado
    const totalVagas = await Vaga.countDocuments({ tipoVaga, tipoVeiculo });

    // Verifica se a quantidade solicitada é maior do que as vagas disponíveis
    if (quantidade > totalVagas) {
      return res.status(400).json({
        error: `Não é possível deletar ${quantidade} vagas do tipo "${tipoVaga}" para "${tipoVeiculo}". Apenas ${totalVagas} vagas disponíveis.`,
      });
    }

    // Encontrar vagas do tipo especificado e limitar à quantidade solicitada
    const vagasParaDeletar = await Vaga.find({ tipoVaga, tipoVeiculo }).limit(quantidade);

    // Deletar as vagas
    const vagasDeletadas = await Vaga.deleteMany({ _id: { $in: vagasParaDeletar.map((vaga) => vaga._id) } });

    res.status(200).json({
      message: `${vagasDeletadas.deletedCount} vagas do tipo "${tipoVaga}" para "${tipoVeiculo}" deletadas com sucesso.`,
    });
  } catch (error) {
    console.error('Erro ao deletar vagas:', error);
    res.status(500).json({ error: 'Erro ao deletar vagas.' });
  }
};

module.exports = { criarVagas, listarVagas, atualizarVaga, deletarVaga, deletarVagasPorTipo };