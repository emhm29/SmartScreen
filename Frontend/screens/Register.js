import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import logo from '../assets/companyLogo.png';
import { Image } from "expo-image";


const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
        console.log('Tentative d\'inscription avec:', email, password);
        fetch('http://192.168.1.8:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then((response) => {
            console.log('Réponse brute:', response);
            return response.json().then(data => ({ status: response.status, body: data }));
        })
        .then(({ status, body }) => {
            console.log('Données de la réponse:', body);
            if (status === 201) {
                Alert.alert('Inscription réussie', 'Vous pouvez maintenant vous connecter');
                navigation.navigate('Login');
            } else {
                setError(body.error || 'Erreur lors de l\'inscription');
            }
        })
        .catch((error) => {
            setError('Erreur lors de l\'inscription');
            console.error('Erreur de réseau:', error);
            Alert.alert('Erreur de réseau', error.message);
        });
    };

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.companyName}>Smarteco</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button title="Register" onPress={handleRegister} color="#003366" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#E0F7FA'
    },
    logo: {
        width: 250, 
        height: 50, 
        marginBottom: 20 
    },
    companyName: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8
    },
    error: {
        color: 'red',
        marginBottom: 12
    }
});

export default Register;
