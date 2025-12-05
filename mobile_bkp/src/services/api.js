// src/services/api.js
import axios from 'axios';

const api = axios.create({
    // SUBSTITUA "SEU_IP_AQUI" PELO NÚMERO QUE VOCÊ ACHOU NO IPCONFIG
    // Mantenha a porta :5000 e o /api no final
    baseURL: 'http://192.168.0.128:5000/api',
});

export default api;