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
                source={require("../assets/4adaee0ecdde0cd3ef4995fb04dfda7d-1.png")}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Help')} style={styles.helpButton}>
                <Text style={styles.help}>Help</Text>
            </TouchableOpacity>
            <Text style={styles.smartScan}>{`Smart Screen`}</Text>
            <Text style={styles.description}>
                Capturez, convertissez et gérez facilement vos factures avec Smart Scan.
                Prenez une photo, convertissez-la au format PDF et organisez tout en
                toute sécurité au même endroit.
            </Text>
            <TouchableOpacity 
                style={styles.photoButton}
                onPress={() => navigation.navigate('pdfScanner')} >
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
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        paddingHorizontal: width * 0.05,
    },
    image: {
        width: '114%',
        height: height * 0.5,
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
        top: 20,
    },
    smartScan: {
        marginTop: height * 0.02,
        fontSize: 25,
        color: "#ff9900",
        textAlign: "center",
        textShadowColor: "rgba(0, 0, 0, 0.25)",
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 7,
    },
    description: {
        marginTop: height * 0.03,
        fontSize: 19,
        color: "#000000",
        textAlign: "center",
        paddingHorizontal: width * 0.02,
    },
    photoButton: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: height * 0.05,
    },
    takePhoto: {
        marginLeft: 10,
        fontSize: 18,
        color: "white",
        backgroundColor: "orange",
        borderRadius: 20,
        width: 200,
        height: 40,
        textAlign: "center",
        paddingVertical: 6,
        top: 80,
        left: -5,
    },
});

export default Home;
