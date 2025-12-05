const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Dados Vitais (Coletados na tela acima)
    profile: {
        height: { type: Number }, // em cm
        currentWeight: { type: Number }, // em kg
        targetWeight: { type: Number }, // em kg
        activityLevel: { type: String }, // Descrição da rotina
        isTraining: { type: Boolean, default: false },
    },

    // Status da Jornada
    onboardingCompleted: { type: Boolean, default: false },
    currentPhase: {
        type: String,
        enum: ['onboarding', 'analysis_week', 'plan_active'],
        default: 'onboarding'
    },

    // Referência futura para exames
    bloodWork: [{
        uploadedAt: Date,
        fileUrl: String,
        analyzedData: Object // Onde o JSON dos exames ficará após OCR
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);