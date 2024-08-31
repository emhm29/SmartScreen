
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
const AccountManagement = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
        source={require('../assets/companyLogo.png')} 
        style={styles.logo}
      />
            <Text style={styles.title}>Gestion des Comptes</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('CreateUser')}
            >
                <Text style={styles.buttonText}>Créer un compte utilisateur</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('EditUser')}
            >
                <Text style={styles.buttonText}>Modifier un compte utilisateur</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('DeleteUser')}
            >
                <Text style={styles.buttonText}>Supprimer un compte utilisateur</Text>
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
        marginBottom: 20,
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

export default AccountManagement;
