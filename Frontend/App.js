import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './AuthContext';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import HomeComptable from './screens/HomeComptable';
import AdminInterface from './screens/AdminInterface';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import Launch from './screens/Launch ';
import Help from './screens/Help';
import PdfScanner from './screens/pdfScanner';
import PdfEditor from './screens/PdfEditor';
import Onboarding from './screens/Onbording';
import ClaimForm from './screens/ClaimForm';
import InvoiceRecognition from './screens/InvoiceRecognition';
import Invoices from './screens/Invoices';
import CreateUser from './screens/CreateUser';
import EditUser from './screens/EditUser';
import DeleteUser from './screens/DeleteUser';
import AccountManagement from './screens/AccountManagement';
import ManageComplaints from './screens/ManageComplaints.js';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="HomeComptable" component={HomeComptable} />
          <Stack.Screen name="AdminInterface" component={AdminInterface} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="Launch" component={Launch} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="PdfScanner" component={PdfScanner} />
          <Stack.Screen name="ClaimForm" component={ClaimForm} />
          <Stack.Screen name="PdfEditor" component={PdfEditor} />
          <Stack.Screen name="Invoices" component={Invoices} />
          <Stack.Screen name="InvoiceRecognition" component={InvoiceRecognition} />
          <Stack.Screen name="CreateUser" component={CreateUser} />
        <Stack.Screen name="EditUser" component={EditUser} />
        <Stack.Screen name="DeleteUser" component={DeleteUser} />
        <Stack.Screen name="AccountManagement" component={AccountManagement} />
        <Stack.Screen name="ManageComplaints" component={ManageComplaints} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
