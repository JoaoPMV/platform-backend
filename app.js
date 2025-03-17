require("dotenv").config();

const express = require("express");
const cors = require("cors");
const conn = require("./config/database");
const studentRoutes = require("./routes/StudentRoutes");
const PORTA = process.env.PORT || 3000;

const app = express();

app.use("/api/students", studentRoutes);
// Iniciar o servidor após a conexão com o banco de dados
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});

// Configuração do CORS
const corsOptions = {
  origin: "https://platforma-frontend.vercel.app", // Frontend em produção
  credentials: true, // Permite enviar cookies e tokens entre frontend e backend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Métodos permitidos
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization", // Cabeçalhos permitidos
};

// Aplicar o middleware CORS globalmente
app.use(cors(corsOptions));

// Middleware para responder às requisições OPTIONS
app.options("*", cors(corsOptions));

app.use(express.json());

// Conectar ao banco antes de iniciar o servidor
conn()
  .then(() => {})
  .catch((err) => {
    console.error("Não foi possível iniciar o servidor:", err);
  });

// Expor o app para o Vercel gerenciar
module.exports = app;
