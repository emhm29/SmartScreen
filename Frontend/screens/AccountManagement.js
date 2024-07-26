// AccountManagement.js
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Image } from "expo-image";
const AccountManagement = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
        source={require('../assets/companyLogo.png')} // Replace with your image URL
        style={styles.logo}
      />
            <Text style={styles.title}>Gestion des Comptes</Text>
            <Button title="Créer un compte utilisateur" onPress={() => navigation.navigate('CreateUser')} />
            <Button title="Modifier un compte utilisateur" onPress={() => navigation.navigate('EditUser')} />
            <Button title="Supprimer un compte utilisateur" onPress={() => navigation.navigate('DeleteUser')} />
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
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 20,
        alignSelf: 'center',
        marginBottom: 20,
      },
});

export default AccountManagement;
