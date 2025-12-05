import React, { useContext } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Image, StatusBar, Dimensions, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from '../context/UserContext';

const COLORS = {
    sageGreen: '#7F9C78',
    sageGreenLight: '#A3BFA0',
    sandBeige: '#EAE0CC',
    softCoral: '#F4A261',
    coffeeBrown: '#4A403A',
    white: '#FFFFFF',
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48 - 15) / 2;

export default function AnalysisWeekScreen({ navigation }) {
    const { userData, meals, uploadMealPhoto } = useContext(UserContext);
    const currentDay = 1;

    const handlePickImage = async (mealId, mealType) => {
        // 1. Permissão
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permissão necessária", "Precisamos de acesso às fotos.");
            return;
        }

        // 2. Galeria (CORREÇÃO DO AVISO AQUI)
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaType.Images, // <--- Mudou de MediaTypeOptions para MediaType
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        // 3. Enviar
        if (!result.canceled) {
            const selectedUri = result.assets[0].uri;
            uploadMealPhoto(mealId, mealType, selectedUri);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.sandBeige} />

            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Semana de Análise</Text>
                    <Text style={styles.subTitle}>
                        Meta: {userData.targetWeight ? `${userData.targetWeight}kg` : '...'}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Result')}>
                    <Feather name="bar-chart-2" size={24} color={COLORS.coffeeBrown} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.progressSection}>
                    <View style={styles.circleOuter}>
                        <View style={styles.circleInner}>
                            <Text style={styles.dayLabel}>Dia {currentDay}</Text>
                            <Text style={styles.totalLabel}>de 7</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.mealsGrid}>
                    {meals.map((meal) => (
                        <TouchableOpacity
                            key={meal.id}
                            style={[styles.mealCard, meal.hasEntry && styles.mealCardActive]}
                            onPress={() => handlePickImage(meal.id, meal.type)}
                        >
                            <View style={styles.cardHeader}>
                                <Text style={styles.mealTitle}>{meal.type}</Text>
                                {meal.hasEntry && <Feather name="check-circle" size={16} color={COLORS.sageGreen} />}
                            </View>

                            <View style={styles.cardContent}>
                                {meal.hasEntry && meal.imageUri ? (
                                    <Image source={{ uri: meal.imageUri }} style={styles.foodImage} />
                                ) : (
                                    <View style={styles.emptyState}>
                                        <Feather name="camera" size={28} color={COLORS.sageGreenLight} style={{ opacity: 0.5 }} />
                                        <Text style={styles.emptyText}>Tocar p/ foto</Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>

            <TouchableOpacity
                style={styles.fabMain}
                onPress={() => navigation.navigate('Result')}
            >
                <Feather name="arrow-right" size={30} color={COLORS.white} />
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.sandBeige },
    header: { paddingHorizontal: 24, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.coffeeBrown },
    subTitle: { fontSize: 14, color: COLORS.sageGreen, fontWeight: '600' },
    scrollContent: { paddingHorizontal: 24, paddingBottom: 100 },
    progressSection: { alignItems: 'center', marginVertical: 30 },
    circleOuter: { width: 140, height: 140, borderRadius: 70, borderWidth: 8, borderColor: '#D3C5B0', justifyContent: 'center', alignItems: 'center' },
    circleInner: { alignItems: 'center' },
    dayLabel: { fontSize: 24, fontWeight: 'bold', color: COLORS.coffeeBrown },
    totalLabel: { fontSize: 14, color: COLORS.coffeeBrown, opacity: 0.6 },
    mealsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    mealCard: { width: CARD_WIDTH, height: CARD_WIDTH * 1.1, backgroundColor: COLORS.white, borderRadius: 20, padding: 12, marginBottom: 15, justifyContent: 'space-between', elevation: 3 },
    mealCardActive: { borderColor: COLORS.sageGreen, borderWidth: 1 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    mealTitle: { fontSize: 14, fontWeight: '600', color: COLORS.coffeeBrown },
    cardContent: { flex: 1, borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9F5EF', overflow: 'hidden' },
    foodImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    emptyState: { alignItems: 'center' },
    emptyText: { marginTop: 5, fontSize: 12, color: COLORS.sageGreenLight },
    fabMain: { position: 'absolute', bottom: 30, right: 30, width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.softCoral, justifyContent: 'center', alignItems: 'center', elevation: 6 }
});