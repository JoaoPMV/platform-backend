const mongoose = require("mongoose");
require("dotenv").config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbURL = `mongodb+srv://${dbUser}:${dbPass}@cluster0.3ximk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(dbURL);
    console.log("🔥 Banco de dados conectado com sucesso!");
    return dbConn;
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco de dados:", error.message);
    process.exit(1); // Encerra a aplicação se der erro
  }
};

module.exports = conn;
