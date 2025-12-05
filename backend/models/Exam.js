const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    uploadDate: { type: Date, default: Date.now },

    // Link do PDF (se fizermos upload do arquivo)
    fileUrl: String,

    // Dados extraídos (Biomarcadores)
    markers: {
        glucose: Number,    // Glicose
        insulin: Number,    // Insulina
        crp: Number,        // PCR (Inflamação)
        cortisol: Number,   // Cortisol
        vitaminD: Number
        // Podemos adicionar mais conforme a necessidade médica
    }
});

module.exports = mongoose.model('Exam', ExamSchema);