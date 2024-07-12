import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AuthContext from '../AuthContext'; // Importer le contexte d'authentification

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext); // Utiliser le contexte

    const handleLogin = () => {
        console.log('Tentative de connexion avec:', email, password);
    
        // Mock response for testing
        const mockResponse = {
            status: 200,
            body: {
                token: 'mock-token'
            }
        };
    
        setTimeout(() => {
            console.log('Mock response:', mockResponse);
            if (mockResponse.status === 200) {
                login(mockResponse.body.token);
                console.log('Token:', mockResponse.body.token);
                console.log('Navigation vers Home');
                Alert.alert('Navigation', 'Navigation vers Home');
                navigation.navigate('Home');
            } else {
                setError(mockResponse.body.error || 'Erreur lors de la connexion');
            }
        }, 1000); // Simulate network delay
    };

    return (
        <View style={styles.container}>
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
            <Button title="Login" onPress={handleLogin} color="#003366"/>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.link}>Créer un compte</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#E0F7FA'
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
    },
    link: {
        color: 'blue',
        marginTop: 12,
        textAlign: 'center'
    }
});

export default Login;
