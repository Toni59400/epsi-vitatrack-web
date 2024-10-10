// src/screens/RegisterScreen.tsx

import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
    const navigation = useNavigation();

    const handleRegister = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Image source={require('./assets/logo.png')} style={styles.logo} />
            <Text style={styles.subTitle}>CRÉER UN PROFIL</Text>

            <TextInput placeholder="Nom" style={styles.input} />
            <TextInput placeholder="Prénom" style={styles.input} />
            <TextInput placeholder="Email" style={styles.input} />
            <TextInput placeholder="Mot de passe" secureTextEntry style={styles.input} />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Déjà un compte ? Connexion</Text>
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
