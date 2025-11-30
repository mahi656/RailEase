import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
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
  const [lastUser, setLastUser] = useState(null);

  // Load saved email and last user details
  useEffect(() => {
    const loadData = async () => {
      try {
        const lastUserJson = await AsyncStorage.getItem('lastUser');
        if (lastUserJson) {
          setLastUser(JSON.parse(lastUserJson));
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    };
    loadData();
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const usersJson = await AsyncStorage.getItem('users');
      console.log('Users from storage:', usersJson); // Debug log

      const users = usersJson ? JSON.parse(usersJson) : [];
      console.log('Parsed users:', users); // Debug log

      // Trim and lowercase both for comparison to handle case sensitivity
      const user = users.find(u =>
        u.email.trim().toLowerCase() === email.trim().toLowerCase()
      );

      console.log('Found user:', user); // Debug log

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

      // Save successful login details for "Continue as" feature
      const lastUserData = {
        name: userData.name,
        email: user.email,
        password: user.password, // Storing password for auto-login (consider security implications in prod)
      };
      await AsyncStorage.setItem('lastUser', JSON.stringify(lastUserData));

      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('rememberMe', 'true');
      await AsyncStorage.setItem('savedEmail', email.trim());

      Alert.alert('Success', 'Login successful!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('MainApp');
          },
        },
      ]);
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Failed to login. Please try again.');
    }
  };

  const handleContinueAsUser = () => {
    if (lastUser) {
      setEmail(lastUser.email);
      setPassword(lastUser.password);
      // Automatically trigger login after state update
      // We need to use the values directly since state update is async
      // But handleLogin uses state 'email' and 'password'
      // So we'll call a modified login logic or wait for state update
      // For simplicity, we can just set state and let user click login, 
      // OR better: call login logic directly with values

      // Direct login logic for immediate action
      const performAutoLogin = async () => {
        try {
          const usersJson = await AsyncStorage.getItem('users');
          const users = usersJson ? JSON.parse(usersJson) : [];
          const user = users.find(u =>
            u.email.trim().toLowerCase() === lastUser.email.trim().toLowerCase()
          );

          if (user && user.password === lastUser.password) {
            const userData = {
              name: user.fullName || user.name || lastUser.email.split('@')[0],
              email: user.email,
            };
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            await AsyncStorage.setItem('rememberMe', 'true');
            await AsyncStorage.setItem('savedEmail', lastUser.email);

            navigation.navigate('MainApp');
          } else {
            Alert.alert('Error', 'Auto-login failed. Please login manually.');
          }
        } catch (e) {
          Alert.alert('Error', 'Auto-login failed.');
        }
      };
      performAutoLogin();
    }
  };

  const handleSocialLogin = (provider) => {
    Alert.alert('Info', `${provider} login would be implemented here`);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.gradient, { backgroundColor: '#F3F6FF' }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
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

            {lastUser && (
              <TouchableOpacity style={styles.continueButton} onPress={handleContinueAsUser}>
                <Ionicons name="flash" size={16} color="#2979FF" style={{ marginRight: 8 }} />
                <Text style={styles.continueButtonText}>Continue as {lastUser.name}</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.form}>
            {/* Email Input */}
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
    </View>
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
    paddingTop: 40,
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
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  continueButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2979FF',
  },
});

export default LoginPage;