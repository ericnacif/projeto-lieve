import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// IMPORTANTE: Note as chaves { } aqui, pois exportamos como "export const"
import { UserProvider } from './src/context/UserContext';

// Importação das telas
// Se algum arquivo desses não existir ou estiver vazio, o app quebra
import OnboardingScreen from './src/screens/OnboardingScreen';
import AnalysisWeekScreen from './src/screens/AnalysisWeekScreen';
import ResultScreen from './src/screens/ResultScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="AnalysisWeek" component={AnalysisWeekScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}