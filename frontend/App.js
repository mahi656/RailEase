import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Forgot from './components/Forgot';
import SplashScreen from './components/SplashScreen';
import MainTabNavigator from './components/MainTabNavigator';
import BookInformation from './components/screens/BookInformation';


const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainApp"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="MainApp" component={MainTabNavigator} />
        <Stack.Screen name="BookInformation" component={BookInformation} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
