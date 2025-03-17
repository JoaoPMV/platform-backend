require("dotenv").config();

const express = require("express");
const cors = require("cors");
const conn = require("./config/database"); // A conexão com o banco é importada
const studentRoutes = require("./routes/StudentRoutes");
const PORTA = process.env.PORT || 3000;

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: [
    "https://platforma-frontend.vercel.app", // Frontend na Vercel
    "http://localhost:5173", // Frontend local na porta 5173
  ],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};

// Middleware CORS e JSON antes das rotas
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

// Conectar ao banco de dados, mas sem bloquear o servidor
conn().catch((err) => {
  console.error("Erro ao conectar ao banco de dados:", err.message);
});

// Configuração de rotas
app.use("/api/students", studentRoutes);

// Iniciar o servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});

// Expor o app para o Vercel gerenciar
module.exports = app;
