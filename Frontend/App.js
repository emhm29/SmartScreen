import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './AuthContext';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Launch from './screens/Launch ';
import Help from './screens/Help';
import PdfScanner from './screens/pdfScanner';
import PdfEditor from './screens/PdfEditor';
import Onboarding from './screens/Onbording';
import ClaimForm from './screens/ClaimForm';
import InvoiceRecognition from './screens/InvoiceRecognition';
import Invoices from './screens/Invoices';

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
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="PdfScanner" component={PdfScanner} />
          <Stack.Screen name="ClaimForm" component={ClaimForm} />
          <Stack.Screen name="PdfEditor" component={PdfEditor} />
          <Stack.Screen name="Invoices" component={Invoices} />
          <Stack.Screen name="InvoiceRecognition" component={InvoiceRecognition} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
