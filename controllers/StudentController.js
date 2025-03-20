const StudentService = require("../services/StudentService");
const jwt = require("jsonwebtoken");

class StudentController {
  // Registrar estudante
  static async register(req, res) {
    try {
      // Verifica se o corpo da requisição é um JSON válido
      JSON.parse(JSON.stringify(req.body));

      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        console.log("❌ Campos obrigatórios ausentes!");
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios!" });
      }

      // Verifica se já existe um estudante com esse email
      const studentExists = await StudentService.findStudentByEmail(email);
      if (studentExists) {
        console.log("⚠️ E-mail já cadastrado!");
        return res.status(400).json({ message: "E-mail já cadastrado!" });
      }

      // Criar estudante
      console.log("🛠 Criando novo estudante...");
      const student = await StudentService.createStudent({
        name,
        email,
        password,
      });

      console.log("🎉 Estudante criado com sucesso!");
      return res
        .status(201)
        .json({ message: "Estudante criado com sucesso!", student });
    } catch (error) {
      console.error("❌ Erro ao criar o estudante:", error);
      return res
        .status(500)
        .json({ message: "Erro no servidor!", error: error.message });
    }
  }

  // Login de estudante
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        console.log("❌ Campos obrigatórios ausentes no login!");
        return res
          .status(400)
          .json({ message: "Email e senha são obrigatórios!" });
      }

      // Buscar estudante pelo e-mail

      const student = await StudentService.findStudentByEmail(email);
      if (!student) {
        console.log("Estudante não encontrado!");
        return res.status(404).json({ message: "Estudante não encontrado!" });
      }

      // Verificar senha

      const isPasswordValid = await StudentService.checkPassword(
        password,
        student.password
      );
      if (!isPasswordValid) {
        console.log("🚫 Senha incorreta!");
        return res.status(401).json({ message: "Senha incorreta!" });
      }

      // Gerar token JWT
      const token = jwt.sign(
        { id: student._id, name: student.name, email: student.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({ message: "Login bem-sucedido!", token });
    } catch (error) {
      console.error("❌ Erro ao fazer login:", error);
      return res
        .status(500)
        .json({ message: "Erro no servidor!", error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      // Verifica se o corpo da requisição é um JSON válido
      JSON.parse(JSON.stringify(req.body));

      const { email } = req.body;
      // Buscar estudante pelo e-mail
      const student = await StudentService.findStudentByEmail(email);
      if (!student) {
        console.log("Estudante não encontrado!");
        return res.status(404).json({ message: "Estudante não encontrado!" });
      }
      // Deletar estudante
      await StudentService.deleteStudentByEmail(email);
      return res
        .status(200)
        .json({ message: "Estudante deletado com sucesso!" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao tentar deletar o estudante!" });
    }
  }
}

module.exports = StudentController;
