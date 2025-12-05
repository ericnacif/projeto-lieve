const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Importando o modelo que criamos
const jwt = require('jsonwebtoken');

// ROTA: Registrar um novo usuário
// Método: POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        // 1. Receber os dados que vêm do App
        const { name, email, password, height, currentWeight, targetWeight } = req.body;

        // 2. Verificar se o usuário já existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: 'Este e-mail já está cadastrado.' });
        }

        // 3. Criptografar a senha (Segurança)
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // 4. Criar o novo usuário na memória
        const newUser = new User({
            name,
            email,
            password: passwordHash,
            profile: {
                height,
                currentWeight,
                targetWeight
            }
        });

        // 5. Salvar no MongoDB
        await newUser.save();

        res.status(201).json({ msg: 'Usuário criado com sucesso!', userId: newUser._id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro no servidor ao registrar.' });
    }
});

// ROTA: Login (Entrar no App)
// Método: POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Verificar se o usuário existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Usuário não encontrado.' });
        }

        // 2. Verificar se a senha bate (Descriptografar e comparar)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Senha incorreta.' });
        }

        // 3. Gerar a "Pulseira VIP" (Token)
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '7d' }, // O login dura 7 dias
            (err, token) => {
                if (err) throw err;
                // Retorna o Token e os dados básicos para o App saber quem logou
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        status: user.status
                    }
                });
            }
        );

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro no servidor ao logar.' });
    }
});

module.exports = router;