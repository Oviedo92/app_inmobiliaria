// routes/auth.route.js

import express from "express";
import { login } from "../controller/auth.controller.js";
import { register } from "../controller/auth.controller.js";    
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register); 


// Ruta protegida
router.get("/profile", verifyToken, (req, res) => {
    res.json({
        message: "Acceso autorizado",
        user: req.user.email,
        id: req.user.userId,
    });
});

export default router;
