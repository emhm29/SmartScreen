
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Image } from "expo-image";

const AdminInterface = ({ navigation }) => {
    return (
        <View style={styles.container}>
            
            <Image
        source={require('../assets/companyLogo.png')} 
        style={styles.logo}
      />
            <Button title="Gestion des Comptes" onPress={() => navigation.navigate('AccountManagement')} />
            <Button title="Gestion des Réclamations" onPress={() => navigation.navigate('ManageComplaints')} />
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

export default AdminInterface;
