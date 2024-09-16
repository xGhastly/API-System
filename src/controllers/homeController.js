const FuncionariosModel = require('../models/FuncionariosModel').FuncionariosModel;

exports.index = async (req, res) => {
  try {
    // Faz a contagem de documentos (funcionários)
    const totalFuncionarios = await FuncionariosModel.countDocuments({});
    
    // Renderiza a página e passa a contagem de funcionários
    res.render('index', { totalFuncionarios });
  } catch (error) {
    console.error('Erro ao obter o total de funcionários:', error);
    res.status(500).send('Erro interno do servidor');
  }
};