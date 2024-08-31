
import React from "react";
import { View, Text, StyleSheet, Button,TouchableOpacity } from "react-native";
import { Image } from "expo-image";

const AdminInterface = ({ navigation }) => {
    return (
        <View style={styles.container}>
            
            <Image
        source={require('../assets/companyLogo.png')} 
        style={styles.logo}
      />
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AccountManagement')}
            >
                <Text style={styles.buttonText}>Gestion des Comptes</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ManageComplaints')}
            >
                <Text style={styles.buttonText}>Gestion des Réclamations</Text>
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

export default AdminInterface;
