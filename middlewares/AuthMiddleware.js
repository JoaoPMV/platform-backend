const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  console.log("Headers recebidos no middleware:", req.headers); // Exibe todos os headers
  console.log("Token recebido:", token); // Exibe o token recebido

  // Verifica se o token existe
  if (!token) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Nenhum token fornecido." });
  }

  // Se o token começa com "Bearer ", removemos o prefixo
  const tokenWithoutBearer = token.startsWith("Bearer ")
    ? token.replace("Bearer ", "")
    : token;

  try {
    // Verificando o token com a chave secreta
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    console.log("Token validado:", decoded); // Exibe o token validado
    req.user = decoded; // Passando os dados do usuário para a requisição
    next(); // Segue para a próxima função ou rota
  } catch (error) {
    console.error("Erro na validação do token:", error); // Log para erro de token
    return res.status(403).json({ message: "Token inválido." });
  }
};

module.exports = authMiddleware;
