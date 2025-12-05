import axios from 'axios';

// --- CONFIGURAÇÃO DO IP ---
// Passo 1: Abra o terminal do PC e digite 'ipconfig' (Windows) ou 'ifconfig' (Mac/Linux)
// Passo 2: Pegue o número IPv4 (ex: 192.168.1.15)
// Passo 3: Coloque abaixo, mantendo a porta :5000
const API_URL = 'http://192.168.0.128:5000/api';

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000, // 10 segundos para timeout
});

// Logs para ajudar a debugar se der erro
api.interceptors.request.use(async (config) => {
    // console.log(`📡 Enviando Request para: ${config.url}`);
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            console.error("⚠️ ERRO DE CONEXÃO: O celular não achou o servidor.");
            console.error("DICA: Verifique se o IP no arquivo api.js está igual ao do seu PC.");
            console.error("DICA: Verifique se o Backend está rodando (npm start).");
        } else {
            console.error(`❌ Erro API (${error.response.status}):`, error.response.data);
        }
        return Promise.reject(error);
    }
);

export default api;