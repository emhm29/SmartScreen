import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Image } from "expo-image";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://192.168.1.8:3000/forgot-password', { email });
      Alert.alert('Success', `Reset token generated: ${response.data.token}`);
      setToken(response.data.token); // Store the token for later use
    } catch (error) {
      console.error('Error generating reset token:', error);
      Alert.alert('Error', error.response ? error.response.data.message : error.message);
    }
  };

  const handleNavigateToResetPassword = () => {
    navigation.navigate('ResetPassword', { token });
  };

  return (
    <View style={styles.container}>
       <Image
        source={require('../assets/companyLogo.png')} // Replace with your image URL
        style={styles.logo}
      />
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Reset Password" onPress={handleNavigateToResetPassword} />
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

export default ForgotPassword;
