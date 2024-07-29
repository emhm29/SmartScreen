import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Image } from "expo-image";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // État initial pour le rôle

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.1.3:3000/register', { email, password, role });
      alert('Inscription réussie');
      navigation.navigate('Login'); // Naviguer vers la page de connexion après inscription
    } catch (error) {
      console.error('Error registering:', error.response ? error.response.data : error.message);
      Alert.alert('Registration Error', error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Register" onPress={handleRegister} />
      <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
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
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
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
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  selectedRoleButton: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  roleButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Register;
