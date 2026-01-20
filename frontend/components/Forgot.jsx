import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const Forgot = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    console.log('Password reset requested for', email);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.gradient, { backgroundColor: '#F3F6FF' }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.illustrationContainer}>
            <Image
              source={require('../photos/Reset password-pana.png')}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Forget Password</Text>
            <Text style={styles.subtitle}>Don't worry it happens. Please enter the address associate with your account</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                placeholder="Email address"
                keyboardType="email-address"
                autoCapitalize="none"
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Ionicons name="mail-outline" size={20} color="#666666" />
                    )}
                  />
                }
                style={styles.input}
                outlineColor="#E0E0E0"
                activeOutlineColor="#2979FF"
                theme={{
                  colors: { background: '#FFFFFF' },
                }}
                outlineStyle={{ borderRadius: 12 }}
              />
            </View>

            <Button
              mode="contained"
              onPress={handleReset}
              style={styles.resetButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonText}
              buttonColor="#2979FF"
            >
              Send OTP
            </Button>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>You remember you password? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 20,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  illustration: {
    width: 250,
    height: 200,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#192031',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 0,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    borderRadius: 12,
  },
  resetButton: {
    borderRadius: 12,
    marginBottom: 30,
    elevation: 4,
    shadowColor: '#2979FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#666666',
  },
  loginLink: {
    fontSize: 14,
    color: '#2979FF',
    fontWeight: '600',
  },
});

export default Forgot;
