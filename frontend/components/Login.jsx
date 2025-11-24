import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Divider,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Load saved email if remember me was checked
  useEffect(() => {
    const loadSavedEmail = async () => {
      try {
        const savedRememberMe = await AsyncStorage.getItem('rememberMe');
        if (savedRememberMe === 'true') {
          const savedEmail = await AsyncStorage.getItem('savedEmail');
          if (savedEmail) {
            setEmail(savedEmail);
          }
        }
      } catch (error) {
        console.error('Error loading saved email:', error);
      }
    };
    loadSavedEmail();
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const usersJson = await AsyncStorage.getItem('users');
      const users = usersJson ? JSON.parse(usersJson) : [];
      const user = users.find(u => u.email === email.trim());
      if (!user) {
        Alert.alert('Error', 'User not found. Please create an account.');
        return;
      }
      if (user.password !== password) {
        Alert.alert('Error', 'Invalid password');
        return;
      }
      const userData = {
        name: user.fullName || user.name || email.split('@')[0],
        email: user.email,
      };

      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('rememberMe', 'true');
      await AsyncStorage.setItem('savedEmail', email);
      navigation.navigate('MainApp');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Failed to login. Please try again.');
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login pressed`);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.gradient, { backgroundColor: '#F3F6FF' }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            <Image
              source={require('../photos/Mobile-rafiki.png')}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Log In</Text>
            <Text style={styles.subtitle}>Enter valid user name & password to continue</Text>
          </View>

          <View style={styles.form}>
            {/* User Name Input */}
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                placeholder="User name"
                keyboardType="email-address"
                autoCapitalize="none"
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Ionicons name="person-outline" size={20} color="#666666" />
                    )}
                  />
                }
                style={styles.input}
                outlineColor="#E0E0E0"
                activeOutlineColor="#2979FF"
                outlineStyle={{ borderRadius: 12 }}
                theme={{
                  colors: {
                    background: '#FFFFFF',
                  },
                }}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={!showPassword}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#666666"
                      />
                    )}
                  />
                }
                right={
                  <TextInput.Icon
                    icon={() => (
                      <Ionicons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="#666666"
                      />
                    )}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                style={styles.input}
                outlineColor="#E0E0E0"
                activeOutlineColor="#2979FF"
                outlineStyle={{ borderRadius: 12 }}
                theme={{
                  colors: {
                    background: '#FFFFFF',
                  },
                }}
              />
            </View>

            {/* Forget Password Link */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Forgot')}
              style={styles.forgetPasswordLink}
            >
              <Text style={styles.forgetPasswordText}>Forget password</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.loginButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonText}
              buttonColor="#2979FF"
            >
              Login
            </Button>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <Divider style={styles.divider} />
              <Text style={styles.dividerText}>Or Continue with</Text>
              <Divider style={styles.divider} />
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialLogin('Google')}
              >
                <Ionicons name="logo-google" size={32} color="#000000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialLogin('Apple')}
              >
                <Ionicons name="logo-apple" size={32} color="#000000" />
              </TouchableOpacity>
            </View>

            {/* Sign Up Link */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Haven't any account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                <Text style={styles.signupLink}>Sign up</Text>
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
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    borderRadius: 12,
  },
  forgetPasswordLink: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgetPasswordText: {
    fontSize: 14,
    color: '#2979FF',
    fontWeight: '500',
  },
  loginButton: {
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    fontSize: 14,
    color: '#666666',
    marginHorizontal: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 16,
  },
  socialButton: {
    padding: 12,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
  },
  socialButtonText: {
    fontSize: 14,
    color: '#192031',
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#666666',
  },
  signupLink: {
    fontSize: 14,
    color: '#2979FF',
    fontWeight: '600',
  },
});

export default LoginPage;
