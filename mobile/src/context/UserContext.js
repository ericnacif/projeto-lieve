import React, { createContext, useState } from 'react';
import { Platform } from 'react-native'; // Importante para ajuste de arquivo no Android
import api from '../services/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // --- ESTADO DO USUÁRIO ---
    const [userData, setUserData] = useState({
        _id: null,
        name: 'Visitante',
        currentWeight: '',
        targetWeight: '',
        height: '',
        isTraining: false,
    });

    // --- ESTADO DAS REFEIÇÕES ---
    const [meals, setMeals] = useState([
        { id: 1, type: 'Café da Manhã', hasEntry: false, imageUri: null },
        { id: 2, type: 'Almoço', hasEntry: false, imageUri: null },
        { id: 3, type: 'Lanche', hasEntry: false, imageUri: null },
        { id: 4, type: 'Jantar', hasEntry: false, imageUri: null },
    ]);

    // FUNÇÃO 1: Salvar Perfil
    const saveUserProfile = async (profileData) => {
        try {
            setUserData(prev => ({ ...prev, ...profileData }));

            const guestEmail = `usuario_${Math.floor(Math.random() * 10000)}@lieve.teste`;
            const payload = {
                name: "Usuário App Mobile",
                email: guestEmail,
                password: "senha_temporaria",
                profile: {
                    height: Number(profileData.height),
                    currentWeight: Number(profileData.currentWeight),
                    targetWeight: Number(profileData.targetWeight),
                    isTraining: profileData.isTraining
                }
            };

            console.log("📡 Enviando perfil...");
            const response = await api.post('/users/register-guest', payload);

            console.log("✅ Usuário ID:", response.data._id);
            setUserData(prev => ({ ...prev, _id: response.data._id }));
            return true;

        } catch (error) {
            console.log("❌ Erro perfil:", error.message);
            return false;
        }
    };

    // FUNÇÃO 2: UPLOAD DA FOTO (A Mágica acontece aqui)
    const uploadMealPhoto = async (mealId, mealType, uri) => {
        // 1. Atualização Otimista (Mostra a foto na tela antes de terminar o upload)
        setMeals(prevMeals => prevMeals.map(meal =>
            meal.id === mealId ? { ...meal, hasEntry: true, imageUri: uri } : meal
        ));

        if (!userData._id) {
            console.log("⚠️ Erro: Usuário não tem ID (não salvou no passo anterior).");
            return;
        }

        try {
            console.log(`📡 Iniciando upload: ${mealType}...`);

            // 2. Criar o pacote do arquivo (FormData)
            const formData = new FormData();

            formData.append('userId', userData._id);
            formData.append('mealType', mealType);

            // Configuração vital para o Android/iOS aceitarem o arquivo
            formData.append('photo', {
                uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
                name: `photo_${Date.now()}.jpg`,
                type: 'image/jpeg',
            });

            // 3. Enviar para o Backend
            // Nota: O Axios gerencia o Content-Type multipart/form-data automaticamente aqui
            const response = await api.post('/dailylog/meal', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("✅ Upload concluído!", response.data);

        } catch (error) {
            console.error("❌ Erro no upload:", error);
            // Se quiser, aqui você pode reverter a imagem do estado se der erro
        }
    };

    return (
        <UserContext.Provider value={{
            userData,
            setUserData,
            saveUserProfile,
            meals,
            uploadMealPhoto // Nova função exportada
        }}>
            {children}
        </UserContext.Provider>
    );
};