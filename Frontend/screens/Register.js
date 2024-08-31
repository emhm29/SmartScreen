import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Image } from "expo-image";
import { FontAwesome } from '@expo/vector-icons';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    // Updated validation: at least 8 characters, one uppercase, one lowercase, one number, and one special character
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return re.test(password);
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse e-mail valide.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Erreur', 'Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.8:3000/register', { email, password, role });
      Alert.alert('Succès', 'Inscription réussie');
      navigation.navigate('Login');
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : error.message;
      const alertMessage = `${errorMessage}\n\nVeuillez réessayer.`;
      Alert.alert('Erreur d\'inscription', alertMessage, [{ text: 'OK' }]);
    } finally {
      setEmail('');
      setPassword('');
      setRole('user');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Login')}
        >
          <FontAwesome name="arrow-left" size={24} color="#77CAEE" />
          <Text style={styles.backButtonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../assets/companyLogo.png')} // Replace with your image URL
        style={styles.logo}
      />
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={styles.label}>Select Role:</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, role === 'user' && styles.selectedRoleButton]}
          onPress={() => setRole('user')}
        >
          <Text style={styles.roleButtonText}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'comptable' && styles.selectedRoleButton]}
          onPress={() => setRole('comptable')}
        >
          <Text style={styles.roleButtonText}>Comptable</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'admin' && styles.selectedRoleButton]}
          onPress={() => setRole('admin')}
        >
          <Text style={styles.roleButtonText}>Admin</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'absolute',
    top: 50,
    left: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -8,
  },
  backButtonText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#77CAEE',
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
    fontWeight: 'bold',
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
  label: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  roleButton: {
    padding: 10,
    borderWidth: 2, // Assurez-vous que la largeur de la bordure correspond à la propriété borderWidth
    borderColor: 'transparent', // Utilisez 'transparent' pour une bordure transparente
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  selectedRoleButton: {
    backgroundColor: '#77CAEE',
    borderColor: '#77CAEE',
  },
  roleButtonText: {
    fontSize: 16,
    color: '#fff',
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
    color: '#fff',
    fontSize: 16,
  },
});

export default Register;