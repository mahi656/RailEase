import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Forgot from './components/Forgot';
import SplashScreen from './components/SplashScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Set a timer to hide the splash screen after 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    
    // Clear the timer when component unmounts
    return () => clearTimeout(timer);
  }, []);
  
  // Show splash screen while loading
  if (isLoading) {
    return <SplashScreen />;
  }
  
  // Show main app after loading
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="Forgot" component={Forgot} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}