import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Image } from "expo-image";

const ResetPassword = ({ route, navigation }) => {
  const [token, setToken] = useState(route.params?.token || '');
  const [password, setPassword] = useState('');

  const handleResetPassword = async () => {
    try {
        console.log('Sending reset password request to server with token:', token); // Log the token
        const response = await axios.post(`http://192.168.1.8:3000/reset-password/${token}`, {
            password: password // Ensure this is not an empty string
        });
        console.log('Response from server:', response.data);
        Alert.alert('Success', 'Password updated successfully');
        navigation.navigate('Login');
    } catch (error) {
        console.error('Full error response:', error.response ? error.response.data : error.message);
        Alert.alert('Error', error.response ? error.response.data.message : error.message);
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
      <Button title="Reset Password" onPress={handleResetPassword} />
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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default ResetPassword;
