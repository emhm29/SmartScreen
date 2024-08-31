import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Image } from "expo-image";
const DeleteUser = ({ navigation }) => {
    const [username, setUsername] = useState('');

    const handleDeleteUser = () => {
        Alert.alert(
            "Suppression de compte",
            `Êtes-vous sûr de vouloir supprimer le compte utilisateur "${username}"?`,
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Supprimer",
                    onPress: () => {
                        alert('Compte utilisateur supprimé!');
                        navigation.goBack();
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Image
        source={require('../assets/companyLogo.png')}
        style={styles.logo}
      />
            <Text style={styles.title}>Supprimer un compte utilisateur</Text>
            <TextInput
                placeholder="Nom d'utilisateur"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <Button title="Supprimer" onPress={handleDeleteUser} />
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

export default DeleteUser;
