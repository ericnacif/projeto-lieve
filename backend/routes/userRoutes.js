const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Certifique-se que o User.js existe em models/

// ROTA: POST /api/users/register-guest
// Descrição: Cria um usuário rápido baseado nos dados do Onboarding do App
router.post('/register-guest', async (req, res) => {
    try {
        const { name, email, password, profile } = req.body;

        // Verifica se já existe (opcional, para evitar duplicata em testes)
        let user = await User.findOne({ email });
        if (user) {
            // Se já existe, apenas atualiza os dados corporais
            user.profile = { ...user.profile, ...profile };
            await user.save();
            return res.json(user);
        }

        // Se não existe, cria novo
        user = new User({
            name,
            email,
            password, // Em produção, criptografaríamos isso com bcrypt
            profile,
            onboardingCompleted: true,
            currentPhase: 'analysis_week'
        });

        await user.save();

        console.log("✅ Novo usuário criado via App:", user.email);
        res.status(201).json(user);

    } catch (err) {
        console.error("❌ Erro ao registrar usuário:", err.message);
        res.status(500).send('Erro no servidor ao salvar usuário');
    }
});

module.exports = router;