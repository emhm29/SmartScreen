import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; 

const Help = () => {
  const [selectedOption, setSelectedOption] = useState(true);
  const navigation = useNavigation(); 

  const handleOkPress = () => {
    if (selectedOption === 'accept') {
      navigation.navigate('Home');
    } else {
      Alert.alert(
        'Attention',
        'Merci de cliquer sur "J\'ai lu tous" avant de continuer.',
        [{ text: 'OK', onPress: () => console.log('Alert dismissed') }]
      );
    }
  };
  const RadioButton = ({ selected, onPress, label }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
        <View style={styles.radioButton}>
          {selected ? (
            <Icon name="radio-button-checked" size={24} color="#007AFF" />
          ) : (
            <Icon name="radio-button-unchecked" size={24} color="#007AFF" />
          )}
        </View>
        <Text style={styles.radioButtonLabel}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text1}>
        Bienvenue dans l'application de gestion de factures! Cette application est conçue pour vous aider à capturer, gérer et valider vos factures de manière simple et sécurisée. Voici un guide détaillé pour vous aider à naviguer et à utiliser toutes les fonctionnalités de l'application.
      </Text>
      <Text style={styles.text2}>1. Capture de Factures{'\n\n'}</Text>
      <Text style={styles.text3}>Prendre une Photo: Utilisez la caméra de votre appareil mobile pour capturer une image claire de votre facture.
      Accéder à la Galerie: Vous pouvez également sélectionner une photo existante de votre galerie.
      </Text>
      <Text style={styles.text4}>2. Conversion en PDF</Text>
      <Text style={styles.text5}>Conversion Automatique: Les images capturées sont automatiquement converties en format PDF pour une meilleure gestion.
      Prévisualisation du PDF: Avant d'envoyer, vous pouvez prévisualiser le PDF généré pour vous assurer que toutes les informations sont bien capturées.
      </Text>
      <Text style={styles.text6}>3. Envoi vers la Plateforme</Text>
      <Text style={styles.text7}> Envoi Sécurisé: Une fois le PDF généré, il peut être envoyé de manière sécurisée vers notre plateforme dédiée.
      Confirmation d'Envoi: Vous recevrez une notification confirmant que votre facture a bien été envoyée.
      </Text>
      <Text style={styles.text8}>4. Reconnaissance Automatique des Informations Extraction des Données</Text>
      <Text style={styles.text9}>La plateforme utilise des technologies de reconnaissance pour extraire automatiquement les informations pertinentes telles que le montant, la date, et le fournisseur.
      Révision des Données: Vous pouvez réviser les informations extraites et effectuer des corrections si nécessaire.
      </Text>
      <Text style={styles.text10}>5. Appareils Supportés</Text>
      <Text style={styles.text11}>L'application est compatible avec une large gamme d'appareils mobiles et de systèmes d'exploitation (iOS, Android, etc.).
      </Text>
      <Text style={styles.text12}>6. Interface Utilisateur Intuitive</Text>
      <Text style={styles.text13}>L'application offre une interface conviviale et intuitive pour faciliter la capture et la gestion des factures.
      Guides et Tutoriels: Des guides et tutoriels sont disponibles pour vous aider à utiliser toutes les fonctionnalités de l'application.
      </Text>
      <RadioButton
        label="j'ai lu tous"
        selected={selectedOption === 'accept'}
        onPress={() => setSelectedOption('accept')}
      />
 <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
        <Text style={styles.okButtonText}>OK</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const handleOkPress = () => {
    console.log("OK button pressed");
}

const styles = StyleSheet.create({
    okButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 20,
      },
      okButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    left:20
  },
  radioButton: {
    marginRight: 10,
  },
  radioButtonLabel: {
    fontSize: 16,
  },
  text1: {
    fontSize: 12,
    top:30,
    left:20,
    width:330,
    top:45,
  },
  text2:{
    fontWeight: 'bold',
    fontSize:15,
    width:330,
    left:19,
    top:50,
},
text3:{
    fontSize:12,
    top:17,
    left:20,
    width:330,
},
text4:{
    fontWeight: 'bold',
    fontSize:15,
    width:330,
    left:19,
    top:21,
},
text5:{
    fontSize:12,
    top:23,
    left:20,
    width:330,
},
text6:{
    fontWeight: 'bold',
    fontSize:15,
    width:330,
    left:19,
    top:25,
},
text7:{
    fontSize:12,
    top:30,
    left:20,
    width:330,
},
text8:{
    fontWeight: 'bold',
    fontSize:15,
    width:330,
    left:19,
    top:35,
},
text9:{
    fontSize:12,
    top:40,
    left:20,
    width:330,
},
text10:{
    fontWeight: 'bold',
    fontSize:15,
    width:330,
    left:19,
    top:40,
},
text11:{
    fontSize:12,
    top:43,
    left:20,
    width:330,
},
text12:{
    fontWeight: 'bold',
    fontSize:15,
    width:330,
    left:19,
    top:45,
},
text13:{
    fontSize:12,
    top:49,
    left:20,
    width:330,
},
});

export default Help;
