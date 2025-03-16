require("dotenv").config();

const express = require("express");
const cors = require("cors");
const conn = require("./config/database");
const studentRoutes = require("./routes/StudentRoutes");

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: [
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
    app.listen(process.env.PORT || 3003, () => {
      console.log("Servidor rodando na porta " + (process.env.PORT || 3003));
    });
  })
  .catch((err) => {
    console.error("Não foi possível iniciar o servidor:", err);
  });

// Expor o app para o Vercel gerenciar
module.exports = app;
