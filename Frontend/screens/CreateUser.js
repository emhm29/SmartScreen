import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from "expo-image";
const CreateUser = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleCreateUser = () => {
        alert('Compte utilisateur créé!');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Image
        source={require('../assets/companyLogo.png')}
        style={styles.logo}
      />
            <Text style={styles.title}>Créer un compte utilisateur</Text>
            <TextInput
                placeholder="Nom d'utilisateur"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
                        <TouchableOpacity
                style={styles.button}
                onPress={handleCreateUser}
            >
                <Text style={styles.buttonText}>Créer</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#E0F7FA',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
    },
    input: {
        width: '80%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    logo: {
        width: 250,
        height: 70,
        alignSelf: 'center',
        marginBottom: 20,
      },
      button: {
        backgroundColor: '#77CAEE',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
        width: '50%',
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
});

export default CreateUser;
