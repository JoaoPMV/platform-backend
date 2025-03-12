require("dotenv").config();

const express = require("express");
const cors = require("cors");
const conn = require("./config/database");
const studentRoutes = require("./routes/StudentRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173", // Frontend URL
    methods: "GET,POST",
    allowedHeaders: ["Content-Type", "Authorization"], // Adicionando explicitamente o header Authorization
  })
);

// Conectar ao banco antes de iniciar o servidor
conn()
  .then(() => {
    // Registrar as rotas após a conexão com o banco
    app.use("/api/students", studentRoutes);
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Não foi possível iniciar o servidor:", err);
  });
