import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Image } from "expo-image";

const ResetPassword = ({ route, navigation }) => {
  const [token, setToken] = useState(route.params?.token || '');
  const [password, setPassword] = useState('');

  const validatePassword = (password) => {
    // Updated validation: at least 8 characters, one uppercase, one lowercase, one number, and one special character
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return re.test(password);
  };

  const handleResetPassword = async () => {
    if (!validatePassword(password)) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.');
      return;
    }

    try {
      const response = await axios.post(`http://192.168.1.8:3000/reset-password/${token}`, {
        password // Ensure this is not an empty string
      });
      Alert.alert('Success', 'Password updated successfully');
      navigation.navigate('Login');
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/companyLogo.png')} // Replace with your image URL
        style={styles.logo}
      />
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Reset Token"
        value={token}
        onChangeText={setToken}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#E0F7FA',
  },
  logo: {
    width: 100,
    height: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
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
    color: '#FFFFFF',  // White text
    fontSize: 16,
  },
});

export default ResetPassword;
