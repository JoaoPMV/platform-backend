const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Middleware para criptografar a senha antes de salvar no banco
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Se a senha não foi modificada, não precisa criptografar
  }

  // Criptografar a senha
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
