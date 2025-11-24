import React, { useReducer } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Checkbox,
  IconButton,
  Divider,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  fullName: '',
  email: '',
  otp: '',
  isOtpSent: false,
  isOtpVerified: false,
  password: '',
  confirmPassword: '',
  showPassword: false,
  showConfirmPassword: false,
  agreeToTerms: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'TOGGLE':
      return { ...state, [action.field]: !state[action.field] };
    default:
      return state;
  }
}

const CreateAccount = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCreateAccount = async () => {
    const { fullName, email, otp, isOtpVerified, password, confirmPassword, agreeToTerms } = state;

    // Validation
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    if (!isOtpVerified) {
      Alert.alert('Error', 'Please verify your OTP');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!agreeToTerms) {
      Alert.alert('Error', 'Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    try {
      // Get existing users
      const usersJson = await AsyncStorage.getItem('users');
      const users = usersJson ? JSON.parse(usersJson) : [];

      // Check if user already exists
      const existingUser = users.find(u => u.email === email.trim());
      if (existingUser) {
        Alert.alert('Error', 'An account with this email already exists');
        return;
      }

      // Create new user
      const newUser = {
        fullName: fullName.trim(),
        name: fullName.trim(),
        email: email.trim(),
        password: password, // In real app, hash this password
      };

      // Add to users array
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));

      // Save current user to AsyncStorage
      const userData = {
        name: newUser.fullName,
        email: newUser.email,
      };
      await AsyncStorage.setItem('user', JSON.stringify(userData));

      Alert.alert('Success', 'Account created successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('MainApp');
          }
        }
      ]);
    } catch (error) {
      console.error('Create account error:', error);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  const handleSocialSignup = (provider) => {
    console.log(`${provider} signup pressed`);
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
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
          contentInsetAdjustmentBehavior="always"
          showsVerticalScrollIndicator={false}
        >
          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            <Image
              source={require('../photos/Sign up-cuate.png')}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>Use proper information to continue</Text>
          </View>

          <View style={styles.form}>
            {/* Full Name Input */}
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                value={state.fullName}
                onChangeText={(v) => dispatch({ type: 'SET_FIELD', field: 'fullName', value: v })}
                placeholder="Full name"
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

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <View style={styles.emailRow}>
                <TextInput
                  mode="outlined"
                  value={state.email}
                  onChangeText={(v) => dispatch({ type: 'SET_FIELD', field: 'email', value: v })}
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
                  style={[styles.input, { flex: 1 }]}
                  outlineColor="#E0E0E0"
                  activeOutlineColor="#2979FF"
                  outlineStyle={{ borderRadius: 12 }}
                  theme={{
                    colors: {
                      background: '#FFFFFF',
                    },
                  }}
                />
                <Button
                  mode="contained"
                  onPress={() => dispatch({ type: 'SET_FIELD', field: 'isOtpSent', value: true })}
                  style={styles.sendOtpButton}
                  contentStyle={styles.sendOtpButtonContent}
                  labelStyle={styles.sendOtpButtonLabel}
                  buttonColor="#2979FF"
                >
                  {state.isOtpSent ? 'Resend OTP' : 'Send OTP'}
                </Button>
              </View>
            </View>

            {/* OTP Input */}
            {state.isOtpSent && (
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={state.otp}
                  onChangeText={(v) => dispatch({ type: 'SET_FIELD', field: 'otp', value: v.replace(/\D/g, '').slice(0, 6) })}
                  placeholder="Enter 6-digit code"
                  keyboardType="number-pad"
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <Ionicons name="key-outline" size={20} color="#666666" />
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
                <View style={styles.otpButtonsRow}>
                  <Button
                    mode="outlined"
                    onPress={() => dispatch({ type: 'SET_FIELD', field: 'isOtpVerified', value: true })}
                    disabled={state.otp.length < 4}
                    style={styles.otpButton}
                    textColor="#2979FF"
                  >
                    Verify OTP
                  </Button>
                  {state.isOtpVerified && (
                    <Text style={styles.otpVerifiedText}>Verified</Text>
                  )}
                </View>
              </View>
            )}

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                value={state.password}
                onChangeText={(v) => dispatch({ type: 'SET_FIELD', field: 'password', value: v })}
                placeholder="Password"
                secureTextEntry={!state.showPassword}
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
                        name={state.showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="#666666"
                      />
                    )}
                    onPress={() => dispatch({ type: 'TOGGLE', field: 'showPassword' })}
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

            {/* Terms & Conditions */}
            <View style={styles.termsContainer}>
              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={state.agreeToTerms ? 'checked' : 'unchecked'}
                  onPress={() => dispatch({ type: 'TOGGLE', field: 'agreeToTerms' })}
                  color="#2979FF"
                />
                <Text style={styles.termsText}>
                  By signing up, you are agree to our{' '}
                  <Text style={styles.termsLink}>Terms & Conditions</Text>
                  {' '}and{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </View>
            </View>

            {/* Create Account Button */}
            <Button
              mode="contained"
              onPress={handleCreateAccount}
              style={styles.createAccountButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonText}
              buttonColor="#2979FF"
            >
              Create Account
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
                onPress={() => handleSocialSignup('Google')}
              >
                <Ionicons name="logo-google" size={32} color="#000000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialSignup('Apple')}
              >
                <Ionicons name="logo-apple" size={32} color="#000000" />
              </TouchableOpacity>
            </View>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an Account? </Text>
              <TouchableOpacity onPress={navigateToLogin}>
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
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 80,
  },
  scrollView: {
    flex: 1,
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
  termsContainer: {
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  termsText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
    flex: 1,
    lineHeight: 18,
  },
  termsLink: {
    color: '#2979FF',
    fontWeight: '600',
  },
  createAccountButton: {
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
  emailRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  sendOtpButton: {
    borderRadius: 12,
    justifyContent: 'center',
    height: 50, // Match typical input height
    marginTop: 6, // Align with input
  },
  sendOtpButtonContent: {
    height: 50,
  },
  sendOtpButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  otpButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    gap: 12,
  },
  otpButton: {
    borderRadius: 12,
  },
  otpVerifiedText: {
    color: '#10B981',
    fontWeight: '700',
    fontSize: 14,
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

export default CreateAccount;
