// Frontend/screens/InvoiceScanner.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { recognizeTextFromImage } from '../ocrService';

const InvoiceScanner = () => {
    const [imageUri, setImageUri] = useState(null);
    const [recognizedText, setRecognizedText] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Désolé, nous avons besoin des permissions pour accéder à la galerie pour que cela fonctionne !');
            } else {
                console.log('Permissions pour la galerie accordées');
            }
        })();
    }, []);

    const pickImage = async () => {
        console.log('Ouverture du sélecteur d\'images');
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log('Résultat du sélecteur d\'images :', result);

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedAsset = result.assets[0];
            console.log('Image sélectionnée :', selectedAsset.uri);
            const compressedImage = await ImageManipulator.manipulateAsync(
                selectedAsset.uri,
                [{ resize: { width: 800 } }],
                { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
            );
            setImageUri(compressedImage.uri);
            setRecognizedText('');
        } else {
            console.log('Sélection d\'image annulée ou aucune image sélectionnée');
            setImageUri(null);
        }
    };

    const analyzeImage = async () => {
        if (!imageUri) {
            console.log('Aucune image sélectionnée pour l\'analyse');
            return;
        }

        setLoading(true);
        console.log('Début de l\'analyse');
        try {
            const text = await recognizeTextFromImage(imageUri);
            console.log('Texte reconnu :', text);
            setRecognizedText(text);
        } catch (error) {
            console.error('Erreur lors de l\'analyse de l\'image :', error);
        } finally {
            setLoading(false);
            console.log('Analyse terminée');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Button title="Sélectionner une image de la galerie" onPress={pickImage} />
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            {imageUri && <Button title="Analyser l'image" onPress={analyzeImage} />}
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {recognizedText ? (
                <Text style={styles.text}>{recognizedText}</Text>
            ) : (
                !loading && <Text style={styles.text}>Aucun texte reconnu pour le moment.</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    image: {
        width: 300,
        height: 300,
        marginVertical: 16,
    },
    text: {
        marginTop: 16,
        fontSize: 16,
    },
});

export default InvoiceScanner;
