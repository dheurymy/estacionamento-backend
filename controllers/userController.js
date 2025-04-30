const User = require('../models/User'); // Importa o modelo User


const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', ''); // Obtém o token do cabeçalho de autorização e remove o prefixo 'Bearer '
  if (!token) return res.status(401).json({ message: 'Autorização negada' }); // Verifica se o token está presente, caso contrário, retorna erro 401

  try {
    const decoded = jwt.verify(token, secret); // Verifica o token usando a chave secreta
    req.user = decoded; // Define o usuário decodificado no objeto de requisição
    next(); // Passa para o próximo middleware ou rota
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' }); // Retorna erro 401 se o token for inválido
  }
};

// Registro de usuário
const registerUser = async (req, res) => {
  const { email, password } = req.body; // Extrai nome, email e senha do corpo da requisição

  try {
    const user = new User({ email, password }); // Cria um novo usuário com os dados fornecidos
    await user.save(); // Salva o usuário no banco de dados
    res.status(201).json({ message: 'Usuário registrado com sucesso' }); // Retorna mensagem de sucesso com status 201
  } catch (err) {
    res.status(400).json({ message: err.message }); // Retorna mensagem de erro com status 400
  }
};

// Login de usuário
const loginUser = async (req, res) => {
  const { email, password } = req.body; // Extrai email e senha do corpo da requisição

  try {
    const user = await User.findOne({ email }); // Busca o usuário pelo email no banco de dados
    if (!user || !(await user.comparePassword(password))) { // Verifica se o usuário existe e se a senha é válida
      return res.status(401).json({ message: 'Credenciais inválidas' }); // Retorna mensagem de credenciais inválidas com status 401
    }

    const token = jwt.sign({ userId: user._id, name: user.name, email: user.email }, secret, { // Gera um token JWT com o ID do usuário
      expiresIn: '1h', // Define a expiração do token para 1 hora
    });

    res.json({ token }); // Retorna o token JWT
  } catch (err) {
    res.status(400).json({ message: err.message }); // Retorna mensagem de erro com status 400
  }
};

// Logout de usuário 
const logoutUser =  (req, res) => {
  res.json({ message: 'Logout bem-sucedido' }); // Retorna mensagem de logout bem-sucedido
};



module.exports = { authMiddleware, registerUser, loginUser, logoutUser }; // Exporta os middlewares e funções de registro, login e logout
