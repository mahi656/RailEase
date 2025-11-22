import React, { useReducer } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Surface,
  Checkbox,
  IconButton,
  Divider,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { LinearGradient } from 'expo-linear-gradient';

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
    <View style={styles.container}>
      <View
        style={[styles.gradient, { backgroundColor: '#F3F6FF' }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContainer}
          contentInsetAdjustmentBehavior="always"
          showsVerticalScrollIndicator={false}>
          <View style={styles.header} >
            <Text style={styles.title}>Create Account</Text>
          </View>

          <Surface style={styles.formContainer} elevation={8}>
            <View style={styles.form}>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  mode="outlined"
                  value={state.fullName}
                  onChangeText={(v) => dispatch({ type: 'SET_FIELD', field: 'fullName', value: v })}
                  placeholder="Enter your full name"
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <Ionicons name="person-outline" size={20} color="#64b5f6" />
                      )}
                    />
                  }
                  style={styles.input}
                  outlineColor="#F3F3F6"
                  activeOutlineColor="#192031"
                  theme={{
                    colors: {
                      background: '#FFFFFF',
                    },
                  }}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  mode="outlined"
                  value={state.email}
                  onChangeText={(v) => dispatch({ type: 'SET_FIELD', field: 'email', value: v })}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <Ionicons name="mail-outline" size={20} color="#64b5f6" />
                      )}
                    />
                  }
                  style={styles.input}
                  outlineColor="#F3F3F6"
                  activeOutlineColor="#192031"
                  theme={{
                    colors: {
                      background: '#FFFFFF',
                    },
                  }}
                />
                <View style={styles.otpButtonsRow}>
                  <Button
                    mode="outlined"
                    onPress={() => dispatch({ type: 'SET_FIELD', field: 'isOtpSent', value: true })}
                    style={styles.otpButton}
                    textColor="#0d47a1"
                  >
                    {state.isOtpSent ? 'Resend OTP' : 'Send OTP'}
                  </Button>
                </View>
              </View>

              {state.isOtpSent && (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>OTP</Text>
                  <TextInput
                    mode="outlined"
                    value={state.otp}
                    onChangeText={(v) => dispatch({ type: 'SET_FIELD', field: 'otp', value: v.replace(/\D/g, '').slice(0, 6) })}
                    placeholder="Enter 6-digit code"
                    keyboardType="number-pad"
                    left={
                      <TextInput.Icon
                      icon={() => (
                        <Ionicons name="key-outline" size={20} color="#64b5f6" />
                      )}
                      />
                    }
                    style={styles.input}
                    outlineColor="#F3F3F6"
                    activeOutlineColor="#192031"
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
                      textColor="#0d47a1"
                    >
                      Verify OTP
                    </Button>
                    {state.isOtpVerified && (
                      <Text style={styles.otpVerifiedText}>Verified</Text>
                    )}
                  </View>
                </View>
              )}

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  mode="outlined"
                  value={state.password}
                  onChangeText={(v) => dispatch({ type: 'SET_FIELD', field: 'password', value: v })}
                  placeholder="Enter your password"
                  secureTextEntry={!state.showPassword}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <Ionicons
                          name="lock-closed-outline"
                          size={20}
                          color="#64b5f6"
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
                          color="#64b5f6"
                        />
                      )}
                      onPress={() => dispatch({ type: 'TOGGLE', field: 'showPassword' })}
                    />
                  }
                  style={styles.input}
                  outlineColor="#F3F3F6"
                  activeOutlineColor="#192031"
                  theme={{
                    colors: {
                      background: '#FFFFFF',
                    },
                  }}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput
                  mode="outlined"
                  value={state.confirmPassword}
                  onChangeText={(v) => dispatch({ type: 'SET_FIELD', field: 'confirmPassword', value: v })}
                  placeholder="Confirm your password"
                  secureTextEntry={!state.showConfirmPassword}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <Ionicons
                          name="lock-closed-outline"
                          size={20}
                          color="#64b5f6"
                        />
                      )}
                    />
                  }
                  right={
                    <TextInput.Icon
                      icon={() => (
                        <Ionicons
                          name={state.showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                          size={20}
                          color="#64b5f6"
                        />
                      )}
                      onPress={() => dispatch({ type: 'TOGGLE', field: 'showConfirmPassword' })}
                    />
                  }
                  style={styles.input}
                  outlineColor="#F3F3F6"
                  activeOutlineColor="#192031"
                  theme={{
                    colors: {
                      background: '#FFFFFF',
                    },
                  }}
                />
              </View>

              <View style={styles.termsContainer}>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    status={state.agreeToTerms ? 'checked' : 'unchecked'}
                    onPress={() => dispatch({ type: 'TOGGLE', field: 'agreeToTerms' })}
                    color="#192031"
                  />
                  <Text style={styles.termsText}>
                    I agree to the{' '}
                    <Text style={styles.termsLink}>Terms of Service</Text>
                    {' '}and{' '}
                    <Text style={styles.termsLink}>Privacy Policy</Text>
                  </Text>
                </View>
              </View>

              <Button
                mode="contained"
                onPress={handleCreateAccount}
                style={styles.createAccountButton}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonText}
                buttonColor="#192031"
              >
                Create Account
              </Button>

              <View style={styles.dividerContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.dividerText}>Or continue with</Text>
                <Divider style={styles.divider} />
              </View>

              <View style={styles.socialContainer}>
                <IconButton
                  icon={() => (
                    <Ionicons name="logo-google" size={24} color="#FFFFFF" />
                  )}
                  style={[styles.socialButton, { backgroundColor: '#DB4437' }]}
                  onPress={() => handleSocialSignup('Google')}
                />
                <IconButton
                  icon={() => (
                    <Ionicons name="logo-facebook" size={24} color="#FFFFFF" />
                  )}
                  style={[styles.socialButton, { backgroundColor: '#4267B2' }]}
                  onPress={() => handleSocialSignup('Facebook')}
                />
                <IconButton
                  icon={() => (
                    <Ionicons name="logo-apple" size={24} color="#FFFFFF" />
                  )}
                  style={[styles.socialButton, { backgroundColor: '#000000' }]}
                  onPress={() => handleSocialSignup('Apple')}
                />
              </View>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <Text 
                  style={styles.loginLink} 
                  onPress={navigateToLogin}
                >
                  Login
                </Text>
              </View>
            </View>
          </Surface>
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
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 80,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#F3F6FF',
    textAlign: 'center',
    opacity: 0.8,
  },
  formContainer: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
  },
  form: {
    padding: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#192031',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  termsContainer: {
    marginBottom: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  termsText: {
    fontSize: 14,
    color: '#807979',
    marginLeft: 4,
    flex: 1,
    lineHeight: 20,
  },
  termsLink: {
    color: '#192031',
    fontWeight: '600',
  },
  createAccountButton: {
    borderRadius: 16,
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#192031',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
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
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#F3F3F6',
  },
  dividerText: {
    fontSize: 14,
    color: '#807979',
    marginHorizontal: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 16,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#807979',
  },
  loginLink: {
    fontSize: 16,
    color: '#192031',
    fontWeight: 'bold',
  },
});

export default CreateAccount;