require("dotenv").config();

const express = require("express");
const cors = require("cors");
const conn = require("./config/database");
const studentRoutes = require("./routes/StudentRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Configuração do CORS
const corsOptions = {
  origin: ["https://platforma-frontend.vercel.app"],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};

// Usar CORS globalmente com as opções definidas
app.use(cors(corsOptions));

// Middleware para garantir que as credenciais sejam permitidas
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

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
