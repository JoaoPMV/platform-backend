class PlatformController {
  static home(req, res) {
    res.send("home");
  }

  // Método para lidar com a rota /platform
  static platform(req, res) {
    // Aqui você já tem acesso ao usuário autenticado através de req.user
    const user = req.user;

    // Verificando se o usuário existe, caso não, retornar erro
    if (!user) {
      return res.status(403).json({ message: "Usuário não autorizado." });
    }

    // Se tudo estiver certo, retorne uma resposta positiva
    return res.status(200).json({
      message: `Bem-vindo à plataforma, ${user.name}!`,
      user: user, // Você pode também enviar os dados do usuário, se necessário
    });
  }

  static music(req, res) {
    console.log("musica funcionando");

    return res.status(200).json({
      message: "Dados de música carregados com sucesso!",
    });
  }

  static video(req, res) {
    console.log("video funcionando");

    return res.status(200).json({
      message: "Dados de video carregados com sucesso!",
    });
  }
}

module.exports = PlatformController;
