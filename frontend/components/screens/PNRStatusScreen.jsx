import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const PNRStatusScreen = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#005667', '#192031']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.content}>
          <Text style={styles.title}>PNR Status</Text>
          <Text style={styles.demoText}>This is a demo page for PNR Status</Text>
          <Text style={styles.demoText}>The actual PNR functionality will be implemented later</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  gradient: { 
    flex: 1 
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  demoText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    opacity: 0.8
  }
});

export default PNRStatusScreen;