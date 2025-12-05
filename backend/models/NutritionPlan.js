const mongoose = require('mongoose');

const NutritionPlanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },

    // O Gráfico de Teia (Pentágono) - Seus 5 eixos escolhidos
    radarChart: {
        metabolic: Number,    // 0-100 (Metabólico)
        inflammatory: Number, // 0-100 (Inflamatório)
        vitality: Number,     // 0-100 (Vitalidade)
        digestive: Number,    // 0-100 (Digestivo)
        rest: Number          // 0-100 (Descanso)
    },

    // O Sistema de Blocos de Refeição
    mealBlocks: {
        breakfast: [String], // Ex: ["Opção 1: Ovos mexidos", "Opção 2: Iogurte"]
        lunch: [String],     // Ex: ["1 Proteína Magra + 2 Vegetais Verdes"]
        dinner: [String],
        snacks: [String]
    }
});

module.exports = mongoose.model('NutritionPlan', NutritionPlanSchema);