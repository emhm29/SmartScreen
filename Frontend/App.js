import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './AuthContext'; // Assurez-vous que le chemin est correct
import Login from './screens/Login'; // Assurez-vous que le chemin est correct
import Register from './screens/Register'; // Assurez-vous que le chemin est correct
import Home from './screens/Home'; // Assurez-vous que le chemin est correct
import Launch from './screens/Launch '; // Assurez-vous que le chemin est correct
import Help from './screens/Help'; // Assurez-vous que le chemin est correct
import pdfScanner from './screens/pdfScanner'; // Assurez-vous que le chemin est correct
import PdfEditor from './screens/PdfEditor'; // Assurez-vous que le chemin est correct
import Onbording from './screens/Onbording'; // Assurez-vous que le chemin est correct
import ClaimForm from'./screens/ClaimForm';
import InvoiceScanner from './screens/InvoiceScanner';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Launch" component={Launch} /> 
          <Stack.Screen name="Onbording" component={Onbording} /> 
          <Stack.Screen name="Help" component={Help} /> 
          <Stack.Screen name="pdfScanner" component={pdfScanner} /> 
          <Stack.Screen name="ClaimForm" component={ClaimForm}/>
          <Stack.Screen name="PdfEditor" component={PdfEditor} /> 
          <Stack.Screen name="InvoiceScanner" component={InvoiceScanner} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
