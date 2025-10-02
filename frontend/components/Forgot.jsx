import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Text, TextInput, Button, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Forgot = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    console.log('Password reset requested for', email);
    // Removed navigation to Login page
    // Will only show a console log for now
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#005667', '#192031']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>
          </View>

          <Surface style={styles.formContainer} elevation={8}>
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  mode="outlined"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <Ionicons name="mail-outline" size={20} color="#005667" />
                      )}
                    />
                  }
                  style={styles.input}
                  outlineColor="#F3F3F6"
                  activeOutlineColor="#005667"
                  theme={{
                    colors: { background: '#FFFFFF' },
                  }}
                />
              </View>

              <Button
                mode="contained"
                onPress={handleReset}
                style={styles.resetButton}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonText}
                buttonColor="#005667"
              >
                Send Reset Link
              </Button>

              <Text style={styles.backToLogin} onPress={() => navigation.navigate('Login')}>
                Back to Login
              </Text>
            </View>
          </Surface>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 80,
  },
  header: { alignItems: 'center', marginBottom: 40 },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: { fontSize: 16, color: '#F3F6FF', textAlign: 'center', opacity: 0.8 },
  formContainer: { borderRadius: 24, backgroundColor: '#FFFFFF', marginHorizontal: 20 },
  form: { padding: 30 },
  inputContainer: { marginBottom: 20 },
  inputLabel: { fontSize: 16, fontWeight: '600', color: '#192031', marginBottom: 8 },
  input: { backgroundColor: '#FFFFFF', fontSize: 16 },
  resetButton: { borderRadius: 16, marginTop: 10 },
  buttonContent: { paddingVertical: 8 },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  backToLogin: { marginTop: 16, textAlign: 'center', color: '#005667', fontWeight: '600' },
});

export default Forgot;


