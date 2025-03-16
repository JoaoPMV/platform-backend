require("dotenv").config();

const express = require("express");
const cors = require("cors");
const conn = require("./config/database");
const studentRoutes = require("./routes/StudentRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Configuração do CORS
const corsOptions = {
  origin: [
    "http://localhost:5173", // Frontend local (ajuste se necessário)
    "https://platforma-frontend.vercel.app", // Frontend em produção
  ],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};

// Aplicar o middleware CORS globalmente
app.use(cors(corsOptions));

// Responder a requisições OPTIONS para todas as rotas
app.options("*", cors(corsOptions));

app.use(express.json());

// Conectar ao banco antes de iniciar o servidor
conn()
  .then(() => {
    app.use("/api/students", studentRoutes);
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Não foi possível iniciar o servidor:", err);
  });
