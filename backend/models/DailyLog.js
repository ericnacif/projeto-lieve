const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
    type: { type: String, required: true }, // ex: "Café da Manhã"
    photoUrl: { type: String }, // O caminho da foto no servidor
    description: { type: String },
    analyzed: { type: Boolean, default: false }, // Se a IA já analisou
    createdAt: { type: Date, default: Date.now }
});

const DailyLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: { type: Date, default: Date.now },
    meals: [MealSchema] // Lista de refeições do dia
}, { timestamps: true });

module.exports = mongoose.model('DailyLog', DailyLogSchema);