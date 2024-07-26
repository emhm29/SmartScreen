import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AuthContext from '../AuthContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from "expo-image";
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.8:3000/login', { email, password });
      const { token, id, role } = response.data;
      console.log('Received token from backend:', token);
      await login(token);
      Alert.alert('Succès', 'Connexion réussie');

      if (!id || !role) {
        throw new Error('Invalid response from server');
      }

      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userId', id.toString());
      await AsyncStorage.setItem('userRole', role);

      if (role === 'user') {
        navigation.navigate('Home');
      } else if (role === 'comptable') {
        navigation.navigate('HomeComptable');
      } else if (role === 'admin') {
        navigation.navigate('AdminInterface');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Login Error', error.response ? error.response.data.error : error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
        <Icon name="user-plus" size={16} color="#fff" />
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <Image
        source={require('../assets/companyLogo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
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
  registerButton: {
    position: 'absolute',
    top: 40,
    right: 16,
    backgroundColor: '#77CAEE',
    padding: 8, // Decreased padding
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 14, // Decreased font size
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

export default Login;
