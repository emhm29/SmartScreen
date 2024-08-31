// screens/ClaimForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const ClaimForm = ({ navigation }) => {
    const route = useRoute();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [isClaimed, setIsClaimed] = useState(false); // Add this line
  const [imageUrl, setImageUrl] = useState(route.params?.imageUrl || '');

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer votre nom.');
      return;
    }
  
    if (!emailRegex.test(email)) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse email valide.');
      return;
    }
  
    if (!description.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer une description.');
      return;
    }
    axios.post('http://192.168.1.8:3000/claims', {
      name,
      email,
      description,
      imageUrl
    })
    .then(response => {
      if (response.status === 201) {
        Alert.alert('Réclamation Soumise', `Merci, ${name}. Votre réclamation a été enregistrée.`);
        setName('');
        setEmail('');
        setDescription('');
        setImageUrl('');
        navigation.navigate('PdfScanner');
      } else {
        Alert.alert('Erreur', 'Une erreur est survenue lors de la soumission de votre réclamation.');
      }
    })
    .catch(error => {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la soumission de votre réclamation.');
      console.error(error);
    });
  };
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Formulaire de Réclamation</Text>
      <TextInput
        placeholder="Votre nom"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Votre email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Description de la réclamation"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 100 }]}
        multiline
      />
      <TextInput
        placeholder="URL de l'image"
        value={imageUrl}
        onChangeText={setImageUrl}
        style={styles.input}
      />
      <View style={isClaimed ? styles.buttonClaimed : styles.button}>
      <Button
        title="Soumettre la réclamation"
        onPress={handleSubmit}
        color={isClaimed ? '#F43B3B' : '#77CAEE'} // Change color based on claim state
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#E0F7FA'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10
  },
  button: {
    backgroundColor: '#77CAEE'
  },
  buttonClaimed: {
    backgroundColor: '#F43B3B'
  }
});

export default ClaimForm;
