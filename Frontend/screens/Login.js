import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity  } from 'react-native';
import AuthContext from '../AuthContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from "expo-image";

const Login = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://192.168.1.8:3000/login', { email, password });
        const { token, id, role } = response.data; // Ensure `id` and `role` are destructured from the response
        console.log('Received token from backend:', token);
        await login(token);
        Alert.alert('Succès', 'Connexion réussie');

        if (!id || !role) { // Check for `id` and `role` in the response data
            throw new Error('Invalid response from server');
        }

        // Save the token and other user data (if needed)
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userId', id.toString());
        await AsyncStorage.setItem('userRole', role);

        // Navigate based on user role
        if (role === 'user') {
            navigation.navigate('Home');
        } else if (role === 'comptable') {
            navigation.navigate('HomeComptable');
        } else if (role === 'admin') {
            navigation.navigate('AdminInterface');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        Alert.alert('Login Error', error.response ? error.response.data.error : error.message); // Use error.response.data.error
    }
};

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/companyLogo.png')} // Replace with your image URL
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
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E0F7FA',
    padding: 16,
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
    backgroundColor: '#243D72',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
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