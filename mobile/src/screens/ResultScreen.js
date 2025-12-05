import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    StatusBar
} from 'react-native';
// Usando a biblioteca correta instalada no seu package.json
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

// IMPORTAÇÃO COMENTADA PARA EVITAR O ERRO NO REACT 19
// import { RadarChart } from 'react-native-chart-kit';

const COLORS = {
    sageGreen: '#7F9C78',
    darkGreen: '#556B50',
    sandBeige: '#EAE0CC',
    softCoral: '#F4A261',
    coffeeBrown: '#4A403A',
    white: '#FFFFFF',
    bgCream: '#FDFBF7',
    grayText: '#8A8A8A'
};

const screenWidth = Dimensions.get("window").width;

export default function ResultScreen({ navigation }) {

    // Dados mantidos para uso futuro
    const chartData = {
        labels: ["Inflamação", "Sono", "Energia", "Foco", "Digestão"],
        datasets: [
            {
                data: [80, 50, 40, 60, 30],
                color: (opacity = 1) => `rgba(244, 162, 97, ${opacity})`,
                strokeWidth: 2
            },
            {
                data: [20, 90, 90, 90, 90],
                color: (opacity = 1) => `rgba(127, 156, 120, ${opacity})`,
                strokeWidth: 2
            }
        ]
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.sageGreen} />

            <View style={styles.topBackground}>
                <SafeAreaView edges={['top', 'left', 'right']}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Feather name="arrow-left" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Seu Plano Lieve</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    <View style={styles.congratsContainer}>
                        <Feather name="sun" size={40} color={COLORS.softCoral} style={{ marginBottom: 10 }} />
                        <Text style={styles.congratsTitle}>Plano Pronto!</Text>
                        <Text style={styles.congratsSub}>Baseado na sua bioquímica.</Text>
                    </View>
                </SafeAreaView>
            </View>

            <View style={styles.contentContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                >

                    {/* --- CARD DO GRÁFICO (MODO DE SEGURANÇA) --- */}
                    <View style={styles.chartCard}>
                        <Text style={styles.sectionTitle}>Sua Análise Atual</Text>

                        {/* GRÁFICO DESATIVADO TEMPORARIAMENTE DEVIDO A ERRO DE VERSÃO */}
                        {/* <RadarChart
              style={styles.chartStyle}
              data={chartData}
              width={screenWidth - 80}
              height={220}
              chartConfig={chartConfig}
              options={{ legend: { display: false } }}
            />
            */}

                        {/* Placeholder visual para o GitHub não receber código quebrado */}
                        <View style={styles.placeholderChart}>
                            <Feather name="pie-chart" size={50} color={COLORS.sageGreen} style={{ opacity: 0.5 }} />
                            <Text style={styles.placeholderText}>Gráfico sendo calibrado...</Text>
                        </View>

                        <View style={styles.legendContainer}>
                            <View style={styles.legendItem}>
                                <View style={[styles.dot, { backgroundColor: COLORS.softCoral }]} />
                                <Text style={styles.legendText}>Atual</Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.dot, { backgroundColor: COLORS.sageGreen }]} />
                                <Text style={styles.legendText}>Meta Lieve</Text>
                            </View>
                        </View>
                    </View>

                    {/* --- Card de Destaque --- */}
                    <View style={[styles.infoCard, { backgroundColor: '#FDEADD', borderColor: COLORS.softCoral }]}>
                        <View style={styles.cardHeader}>
                            <Feather name="alert-circle" size={20} color={COLORS.softCoral} />
                            <Text style={[styles.cardTitle, { color: COLORS.softCoral }]}>Destaque do seu Plano</Text>
                        </View>
                        <Text style={styles.cardBody}>
                            Baseado nos seus exames, focamos em <Text style={{ fontWeight: 'bold' }}>alimentos anti-inflamatórios</Text> para reduzir o inchaço matinal.
                        </Text>
                    </View>

                    {/* --- Sugestão de Café da Manhã --- */}
                    <View style={styles.recipeCard}>
                        <Text style={styles.cardTitleDark}>Sugestão de Café da Manhã</Text>
                        <View style={styles.recipeContent}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1588137372308-15f75323ca8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }}
                                style={styles.recipeImage}
                            />
                            <View style={styles.recipeTextContainer}>
                                <Text style={styles.recipeName}>Torrada de Abacate & Ovos</Text>
                                <Text style={styles.recipeReason}>Substitua o pão branco por integral para menor pico glicémico.</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.buttonPrimary}>
                        <Text style={styles.buttonText}>Ver Plano Completo</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: COLORS.sageGreen },
    topBackground: { height: 220, paddingHorizontal: 24 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
    headerTitle: { color: COLORS.white, fontSize: 18, fontWeight: '600' },
    congratsContainer: { alignItems: 'center', marginTop: 20 },
    congratsTitle: { fontSize: 28, fontWeight: 'bold', color: COLORS.white, marginBottom: 5 },
    congratsSub: { fontSize: 14, color: COLORS.white, opacity: 0.9 },
    contentContainer: { flex: 1, backgroundColor: COLORS.bgCream, borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 24, paddingTop: 30, marginTop: 10 },
    chartCard: { backgroundColor: COLORS.white, borderRadius: 20, padding: 20, alignItems: 'center', marginBottom: 20, elevation: 3 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.coffeeBrown, marginBottom: 10 },
    placeholderChart: { height: 180, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F5', borderRadius: 15, marginVertical: 10 },
    placeholderText: { color: COLORS.grayText, marginTop: 10, fontSize: 12 },
    legendContainer: { flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 10 },
    legendItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 },
    dot: { width: 10, height: 10, borderRadius: 5, marginRight: 6 },
    legendText: { fontSize: 12, color: COLORS.coffeeBrown },
    infoCard: { borderRadius: 15, padding: 15, marginBottom: 20, borderWidth: 1, borderStyle: 'dashed' },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    cardTitle: { fontSize: 14, fontWeight: 'bold', marginLeft: 8 },
    cardBody: { fontSize: 13, color: COLORS.coffeeBrown, lineHeight: 20 },
    cardTitleDark: { fontSize: 16, fontWeight: 'bold', color: COLORS.coffeeBrown, marginBottom: 10 },
    recipeCard: { backgroundColor: COLORS.white, borderRadius: 20, padding: 15, marginBottom: 20, elevation: 2 },
    recipeContent: { flexDirection: 'row', alignItems: 'center' },
    recipeImage: { width: 70, height: 70, borderRadius: 12 },
    recipeTextContainer: { flex: 1, marginLeft: 15 },
    recipeName: { fontSize: 14, fontWeight: '700', color: COLORS.coffeeBrown, marginBottom: 4 },
    recipeReason: { fontSize: 11, color: COLORS.grayText, lineHeight: 16 },
    buttonPrimary: { backgroundColor: COLORS.sageGreen, paddingVertical: 18, borderRadius: 30, alignItems: 'center', marginTop: 10, marginBottom: 40, elevation: 5 },
    buttonText: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' }
});