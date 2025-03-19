const Student = require("../models/StudentModel");
const bcrypt = require("bcryptjs");

class StudentService {
  // Função para verificar se o estudante já existe pelo e-mail
  static async findStudentByEmail(email) {
    return await Student.findOne({ email });
  }

  // Função para criar um novo estudante
  static async createStudent({ name, email, password }) {
    const student = new Student({
      name,
      email,
      password,
    });

    try {
      const savedStudent = await student.save(); // Tentando salvar o estudante
      return savedStudent;
    } catch (error) {
      if (error.code === 11000) {
        // Verificando o código de erro para duplicação de email
        throw new Error("E-mail já cadastrado!");
      }
      throw error;
    }
  }

  // Verificar se a senha fornecida bate com a senha do banco
  static async checkPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Função para deletar estudante por e-mail
  static async deleteStudentByEmail(email) {
    try {
      const result = await Student.deleteOne({ email });
      if (result.deletedCount === 0) {
        throw new Error("Estudante não encontrado para deletar.");
      }
      return result;
    } catch (error) {
      throw new Error("Erro ao tentar deletar estudante: " + error.message);
    }
  }
}

module.exports = StudentService;
