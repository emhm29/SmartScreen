import React, { useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Home = ({ navigation }) => {
    useEffect(() => {
        console.log('Home screen loaded');
    }, []);

    return (
        <View style={styles.view}>
            <Image
                style={styles.image}
                contentFit="cover"
                source={require("../assets/home.png")}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Help')} style={styles.helpButton}>
                <Text style={styles.help}>Help</Text>
            </TouchableOpacity>
            <Text style={styles.SmartScreen}>{`Smart Screen`}</Text>
            <Text style={styles.description}>
                Capturez, convertissez et gérez facilement vos factures avec Smart Scan.
                Prenez une photo, convertissez-la au format PDF et organisez tout en
                toute sécurité au même endroit.
            </Text>
            <TouchableOpacity 
    style={styles.photoButton}
    onPress={() => navigation.navigate('PdfScanner')} >
    <Text style={styles.takePhoto}>
        <Feather name="camera" size={24} color="white" style={styles.c}/>  Commencer
    </Text>
</TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: "#E0F7FA",
        alignItems: "center",
        paddingHorizontal: width * 0.05,
    },
    image: {
        width: '100%',
        height: height * 0.4,
        borderRadius: 20,
        marginTop: height * 0.03,
    },
    helpButton: {
        position: "absolute",
        top: height * 0.05,
        right: width * 0.05,
    },
    help: {
        fontSize: 18,
        color: "#FFFFFF",
    },
    SmartScreen: {
        marginTop: height * 0.02,
        fontSize: 25,
        color: "#0D1D40",
        textAlign: "center",
        textShadowColor: "rgba(0, 0, 0, 0.25)",
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 7,
    },
    description: {
        marginTop: height * 0.02,
        fontSize: 19,
        color: "#000000",
        textAlign: "center",
        paddingHorizontal: width * 0.02,
    },
    photoButton: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: height * 0.03,
        backgroundColor: "#77CAEE",
        borderRadius: 20,
        width: 200,
        height: 40,
        justifyContent: "center"
    },
    takePhoto: {
        fontSize: 18,
        color: "white",
    },
    invoiceButton: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: height * 0.02,
        backgroundColor: "#4CAF50",
        borderRadius: 20,
        width: 200,
        height: 40,
        justifyContent: "center"
    },
    scanInvoice: {
        fontSize: 18,
        color: "white",
    },
    recognitionButton: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: height * 0.02,
        backgroundColor: "#A7C957",
        borderRadius: 50,
        width: 200,
        height: 40,
        justifyContent: "center"
    },
    recognitionText: {
        fontSize: 18,
        color: "white",
    },
    c: {
        marginRight: 50,
    }
});

export default Home;