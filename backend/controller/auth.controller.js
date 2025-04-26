// controller/auth.controller.js
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // Asegúrate de tener esto instalado: npm i bcryptjs

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ Buscar usuario en MongoDB
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // 2️⃣ Comparar contraseña
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)  {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // 3️⃣ Crear token
    const token = jwt.sign(
      { userId: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4️⃣ Enviar respuesta
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      }
    });

  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const register = async (req, res) => {
  try {
    const { email, username, password, fromSQL } = req.body;

    // 🔍 Solo mostrar email y username en consola
    console.log("📥 Datos recibidos:");
    console.log("✉️ Email:", email);
    console.log("👤 Username:", username);

    // 1️⃣ Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log("⚠️ Usuario ya existe");
      return res.status(400).json({ message: "El usuario ya está registrado" });
    }

    // 2️⃣ Hashear la contraseña si viene en texto plano
    let hashedPassword = password;
    if (!fromSQL) {
      hashedPassword = await bcrypt.hash(password, 10);
      console.log("🔐 Contraseña hasheada desde frontend");
    } else {
      console.log("💾 Contraseña ya viene hasheada desde C#");
    }

    // 3️⃣ Crear usuario en MongoDB
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      }
    });

    console.log("✅ Usuario creado correctamente:");
    console.log("🆔 ID:", newUser.id);
    console.log("✉️ Email:", newUser.email);
    console.log("👤 Username:", newUser.username);

    res.status(201).json({
      message: "Usuario registrado con éxito",
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      }
    });

  } catch (error) {
    console.error("❌ Error en el registro:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

