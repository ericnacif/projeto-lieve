const express = require('express');
const router = express.Router();
const upload = require('../utils/uploadHelper'); // O helper que criamos
const DailyLog = require('../models/DailyLog');

// ROTA: POST /api/dailylog/meal
// Recebe: userId (texto), mealType (texto) e photo (arquivo)
router.post('/meal', upload.single('photo'), async (req, res) => {
    try {
        const { userId, mealType } = req.body;
        const file = req.file; // O arquivo da foto chega aqui

        if (!file) {
            return res.status(400).json({ error: 'Nenhuma foto enviada' });
        }

        if (!userId) {
            return res.status(400).json({ error: 'User ID obrigatório' });
        }

        // URL acessível da imagem (ex: http://localhost:5000/uploads/nomedafoto.jpg)
        // Nota: No Android o localhost vira o IP, mas salvaremos o caminho relativo
        const photoUrl = `/uploads/${file.filename}`;

        // 1. Achar ou Criar o Log do dia para esse usuário
        let today = new Date();
        today.setHours(0, 0, 0, 0);

        let log = await DailyLog.findOne({
            userId: userId,
            date: { $gte: today }
        });

        if (!log) {
            log = new DailyLog({ userId, meals: [] });
        }

        // 2. Adicionar a refeição
        const newMeal = {
            type: mealType,
            photoUrl: photoUrl,
            analyzed: false
        };

        log.meals.push(newMeal);
        await log.save();

        console.log(`✅ Foto recebida! Refeição: ${mealType}`);

        res.json({ success: true, meal: newMeal });

    } catch (err) {
        console.error("❌ Erro no upload:", err);
        res.status(500).json({ error: 'Erro ao salvar refeição' });
    }
});

module.exports = router;