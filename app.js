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
    origin: "https://platforma-frontend.vercel.app", // Frontend URL
    methods: ["GET", "POST", "OPTIONS"], // Incluir OPTIONS para o preflight request
    allowedHeaders: ["Content-Type", "Authorization"], // Adicionando explicitamente o header Authorization
  })
);

// Responde a todas as requisições OPTIONS (preflight)
app.options("*", cors()); // Respondendo a todas as requisições OPTIONS

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
