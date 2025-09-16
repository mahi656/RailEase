// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';
import { Provider as PaperProvider, Button, Card } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

// Home Screen
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Card style={{ width: '100%', marginBottom: 20, padding: 20 }}>
        <Text style={{ fontSize: 22, marginBottom: 10 }}>Welcome to RailEase!</Text>
        <Button
          icon="account"
          mode="contained"
          style={{ marginBottom: 10 }}
          onPress={() => navigation.navigate('Profile')}
        >
          Go to Profile
        </Button>
        <Button
          icon="train"
          mode="outlined"
          onPress={() => navigation.navigate('Bookings')}
        >
          Go to Bookings
        </Button>
      </Card>
    </View>
  );
}

// Profile Screen
function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Profile Screen</Text>
      <Button
        icon="arrow-left"
        mode="contained"
        onPress={() => navigation.goBack()}
      >
        Go Back
      </Button>
    </View>
  );
}

// Bookings Screen
function BookingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Bookings Screen</Text>
      <Button
        icon="arrow-left"
        mode="contained"
        onPress={() => navigation.goBack()}
      >
        Go Back
      </Button>
    </View>
  );
}

// App Component
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Bookings" component={BookingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
