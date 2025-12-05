// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { colors } from '../theme/colors';
import api from '../services/api'; // Importando nossa conexão

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        try {
            // Chamando o Backend
            const response = await api.post('/auth/login', { email, password });

            // Se der certo:
            const { user, token } = response.data;
            Alert.alert('Bem-vindo(a)!', `Olá, ${user.name}. Login realizado com sucesso.`);
            console.log('Token recebido:', token);

            // AQUI DEPOIS VAMOS NAVEGAR PARA A PRÓXIMA TELA

        } catch (error) {
            // Se der erro:
            console.log(error);
            Alert.alert('Erro', error.response?.data?.msg || 'Falha ao logar');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Lieve</Text>
                <Text style={styles.subtitle}>Seu corpo, seu ritmo</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                    style={styles.input}
                    placeholder="exemplo@lieve.com"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Sua senha secreta"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        padding: 24,
    },
    header: { alignItems: 'center', marginBottom: 48 },
    title: { fontSize: 42, fontWeight: 'bold', color: colors.primary, fontFamily: 'serif' },
    subtitle: { fontSize: 16, color: colors.text, marginTop: 8 },
    form: { backgroundColor: 'rgba(255,255,255,0.6)', padding: 24, borderRadius: 20 },
    label: { color: colors.text, fontSize: 14, marginBottom: 6, fontWeight: '600' },
    input: {
        backgroundColor: colors.white, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16, marginBottom: 16,
        fontSize: 16, color: colors.text, shadowColor: colors.text, shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
    },
    button: {
        backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 8,
        shadowColor: colors.primaryDark, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 4,
    },
    buttonText: { color: colors.white, fontSize: 16, fontWeight: 'bold' }
});