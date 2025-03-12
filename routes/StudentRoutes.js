const express = require("express");
const StudentController = require("../controllers/StudentController");
const PlatformController = require("../controllers/PlatformController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = express.Router();

// Rota para cadastro de estudante

router.get("/home", PlatformController.home);
router.post("/register", StudentController.register);

// Rota para login
router.post("/login", StudentController.login);

router.get("/platform", AuthMiddleware, PlatformController.platform);
router.get("/platform/music", AuthMiddleware, PlatformController.music);
router.get("/platform/video", AuthMiddleware, PlatformController.video);

module.exports = router;
