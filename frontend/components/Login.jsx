import React, { useReducer, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Alert, Image, } from 'react-native';
import { TextInput, Button, Text, Divider, } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../CSS/Login';

const initialState = {
  email: '',
  password: '',
  showPassword: false,
  lastUser: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'TOGGLE_PASSWORD':
      return { ...state, showPassword: !state.showPassword };
    case 'SET_LAST_USER':
      return { ...state, lastUser: action.value };
    default:
      return state;
  }
}

const LoginPage = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password, showPassword, lastUser } = state;

  // Load saved email and last user details
  useEffect(() => {
    const loadData = async () => {
      try {
        const lastUserJson = await AsyncStorage.getItem('lastUser');
        if (lastUserJson) {
          dispatch({ type: 'SET_LAST_USER', value: JSON.parse(lastUserJson) });
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
      dispatch({ type: 'SET_FIELD', field: 'email', value: lastUser.email });
      dispatch({ type: 'SET_FIELD', field: 'password', value: lastUser.password });

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
                onChangeText={(text) => dispatch({ type: 'SET_FIELD', field: 'email', value: text })}
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
                onChangeText={(text) => dispatch({ type: 'SET_FIELD', field: 'password', value: text })}
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
                    onPress={() => dispatch({ type: 'TOGGLE_PASSWORD' })}
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

export default LoginPage;