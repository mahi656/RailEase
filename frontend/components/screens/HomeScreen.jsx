import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>RailEase</Text>
        <Text style={styles.demoText}>This is a demo page for Home</Text>
        <Text style={styles.demoText}>The actual home functionality will be implemented later</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#F3F6FF', 
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#192031',
    marginBottom: 20,
  },
  demoText: {
    fontSize: 18,
    color: '#192031',
    textAlign: 'center',
    marginBottom: 10,
    opacity: 0.8
  }
});

export default HomeScreen;
