// src/screens/LoginScreen.tsx

import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Image source={require('./assets/logo.png')} style={styles.logo} />
            <Text style={styles.subTitle}>CONNEXION</Text>

            <TextInput placeholder="Email" style={styles.input} />
            <TextInput placeholder="Mot de passe" secureTextEntry style={styles.input} />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Connexion</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkText}>Créer un profil</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A2E665',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 18,
        marginBottom: 30,
    },
    input: {
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    linkButton: {
        marginTop: 20,
    },
    linkText: {
        color: '#000',
        fontSize: 16,
    },
});