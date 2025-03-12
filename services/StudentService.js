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
}

module.exports = StudentService;
