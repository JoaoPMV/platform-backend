const jwt = require("jsonwebtoken");
const Student = require("../models/StudentModel");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Nenhum token fornecido." });
  }

  const tokenWithoutBearer = token.startsWith("Bearer ")
    ? token.replace("Bearer ", "")
    : token;

  try {
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    const student = await Student.findById(decoded.id);

    if (!student) {
      return res.status(401).json({ message: "Usuário não encontrado." });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Erro na validação do token:", error);
    return res.status(403).json({ message: "Token inválido." });
  }
};

module.exports = authMiddleware;
