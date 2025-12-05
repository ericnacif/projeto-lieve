require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const dailyLogRoutes = require('./routes/dailyLogRoutes'); // <--- NOVO IMPORT

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Conectado!'))
    .catch((err) => console.error('❌ Erro Mongo:', err));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- ROTAS ---
app.use('/api/users', userRoutes);
app.use('/api/dailylog', dailyLogRoutes); // <--- NOVA ROTA ATIVADA

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));