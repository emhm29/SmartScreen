import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Image } from "expo-image";
import { FontAwesome } from '@expo/vector-icons';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleForgotPassword = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse e-mail valide.');
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.1.8:3000/forgot-password', { email });
      const resetToken = response.data.token;
      setToken(resetToken);
      Alert.alert('Success', `Reset token generated: ${resetToken}`);
      setEmail('');
      navigation.navigate('ResetPassword', { token: resetToken });
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.status === 404
          ? 'Cette adresse e-mail introuvable.'
          : error.response.data?.message || 'Une erreur inconnue est survenue.';
        Alert.alert('Erreur', errorMessage);
      } else {
        Alert.alert('Erreur', 'Une erreur inconnue est survenue.');
      }
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
      <FontAwesome name="arrow-left" size={24} color="#77CAEE" />
        <Text style={styles.backButtonText}>Back to Login</Text>
      </TouchableOpacity>
      <Image
        source={require('../assets/companyLogo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E0F7FA',
    padding: 16,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#77CAEE',
    fontSize: 14,
    marginLeft: 5,
  },
  logo: {
    width: 250,
    height: 70,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: 250,
    height: 50,
    borderColor: 'gray',
    borderRadius: 25,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    textAlign: 'center',
    alignSelf: 'center',
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
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  forgotPassword: {
    color: '#243D72',
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  link: {
    alignItems: 'center',
    marginTop: 10,
  }
});

export default ForgotPassword;
