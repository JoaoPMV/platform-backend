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
    origin: "https://platforma-frontend.vercel.app",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);

app.options("*", cors());

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
