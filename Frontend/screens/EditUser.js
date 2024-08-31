import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Image } from "expo-image";
const EditUser = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleEditUser = () => {
        alert('Compte utilisateur modifié!');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Image
        source={require('../assets/companyLogo.png')} 
        style={styles.logo}
      />
            <Text style={styles.title}>Modifier un compte utilisateur</Text>
            <TextInput
                placeholder="Nom d'utilisateur actuel"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Nouveau nom d'utilisateur"
                value={newUsername}
                onChangeText={setNewUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Nouveau mot de passe"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Modifier" onPress={handleEditUser} />
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
        width: 100,
        height: 20,
        alignSelf: 'center',
        marginBottom: 20,
      },
});

export default EditUser;
