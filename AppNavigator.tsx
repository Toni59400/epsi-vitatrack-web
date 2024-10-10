// src/routes/AppNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Login';
import RegisterScreen from './Register';
import HomeScreen from './HomeScreen'; // Votre écran principal

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }} // Cacher l'en-tête pour l'écran de connexion
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }} // Cacher l'en-tête pour l'écran d'inscription
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Accueil' }} // Mettre un titre pour l'écran d'accueil
            />
        </Stack.Navigator>
    );
}
