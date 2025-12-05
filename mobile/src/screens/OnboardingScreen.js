import React, { useContext, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Switch, StatusBar, Alert, ActivityIndicator
} from 'react-native';
// CORREÇÃO DO AVISO: Usando a biblioteca correta
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { UserContext } from '../context/UserContext';

const COLORS = {
  sageGreen: '#7F9C78',
  sandBeige: '#EAE0CC',
  softCoral: '#F4A261',
  coffeeBrown: '#4A403A',
  white: '#FFFFFF',
  inputBg: '#F5F0E6',
};

export default function OnboardingScreen({ navigation }) {
  const { saveUserProfile } = useContext(UserContext);

  // Estados dos inputs
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [target, setTarget] = useState('');
  const [isTraining, setIsTraining] = useState(false);

  // Estado de Carregamento (Loading)
  const [isLoading, setIsLoading] = useState(false);

  const handleStartJourney = async () => {
    // 1. Validação Básica
    if (!weight || !height) {
      Alert.alert("Campos vazios", "Por favor, preencha seu peso e altura para calcularmos seu ritmo.");
      return;
    }

    // 2. Ativa o Loading (Feedback visual)
    setIsLoading(true);

    // 3. Tenta salvar
    const success = await saveUserProfile({
      currentWeight: weight,
      targetWeight: target,
      height: height,
      isTraining: isTraining
    });

    // 4. Desativa o Loading
    setIsLoading(false);

    if (success) {
      // Sucesso: Vamos para a próxima tela
      navigation.navigate('AnalysisWeek');
    } else {
      // Erro: Avisa o usuário, mas deixa ele passar (modo offline)
      Alert.alert(
        "Aviso de Conexão",
        "Não conseguimos conectar ao servidor. Verifique se o IP no arquivo api.js está correto. Vamos continuar em modo offline.",
        [{ text: "OK", onPress: () => navigation.navigate('AnalysisWeek') }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.sandBeige} />

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Feather name="feather" size={24} color={COLORS.sageGreen} style={{ marginRight: 8 }} />
            <Text style={styles.logoText}>Lieve</Text>
          </View>
          <Text style={styles.slogan}>Seu corpo, seu ritmo</Text>
        </View>

        {/* Inputs */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Boas-vindas e Dados</Text>

          <View style={styles.metricsRow}>
            <View style={styles.metricBox}>
              <Text style={styles.labelSmall}>Peso Atual</Text>
              <TextInput
                style={styles.inputMetric}
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
                placeholder="00.0"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.metricBox}>
              <Text style={styles.labelSmall}>Altura (cm)</Text>
              <TextInput
                style={styles.inputMetric}
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
                placeholder="000"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.metricBox}>
              <Text style={styles.labelSmall}>Meta</Text>
              <TextInput
                style={styles.inputMetric}
                keyboardType="numeric"
                value={target}
                onChangeText={setTarget}
                placeholder="00.0"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>

        {/* Switch Treino */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Rotina</Text>
          <View style={styles.switchRow}>
            <Text style={styles.bodyText}>Você treina atualmente?</Text>
            <Switch
              trackColor={{ false: "#D3C5B0", true: COLORS.sageGreen }}
              thumbColor={COLORS.white}
              onValueChange={setIsTraining}
              value={isTraining}
            />
          </View>
        </View>

        {/* Botões */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={handleStartJourney}
            disabled={isLoading} // Trava o botão enquanto carrega
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.buttonTextPrimary}>Começar Jornada</Text>
            )}
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.sandBeige },
  scrollContent: { padding: 24, paddingTop: 40 },
  header: { alignItems: 'center', marginBottom: 40 },
  logoContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: COLORS.sageGreen },
  slogan: { fontSize: 14, color: COLORS.coffeeBrown, opacity: 0.8, letterSpacing: 1 },
  sectionContainer: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.coffeeBrown, marginBottom: 15 },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metricBox: { width: '30%', alignItems: 'center' },
  labelSmall: { fontSize: 12, color: COLORS.coffeeBrown, marginBottom: 8, textAlign: 'center' },
  inputMetric: { width: '100%', height: 60, backgroundColor: COLORS.white, borderRadius: 15, textAlign: 'center', fontSize: 20, fontWeight: '600', color: COLORS.coffeeBrown, elevation: 2 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.white, padding: 15, borderRadius: 15, marginBottom: 10, elevation: 2 },
  bodyText: { fontSize: 14, color: COLORS.coffeeBrown },
  actionContainer: { marginTop: 10, alignItems: 'center' },
  button: { width: '100%', borderRadius: 25, paddingVertical: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15, elevation: 4 },
  buttonPrimary: { backgroundColor: COLORS.sageGreen },
  buttonTextPrimary: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
});