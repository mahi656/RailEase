import React, { useReducer } from 'react';
import { View, StyleSheet, ScrollView, Platform, Alert, TouchableOpacity, Image, } from 'react-native';
import { TextInput, Button, Text, Checkbox, Divider, } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  showPassword: false,
  showConfirmPassword: false,
  agreeToTerms: false,
  passwordValid: true,
  emailValid: true,
  confirmPasswordValid: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'TOGGLE':
      return { ...state, [action.field]: !state[action.field] };
    case 'VALIDATE_FIELD':
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
}

const CreateAccount = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const checkPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const checkEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleCreateAccount = async () => {
    const { fullName, email, password, confirmPassword, agreeToTerms } = state;



    // Validation
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    if (!checkEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }

    if (!checkPassword(password)) {
      Alert.alert(
        'Error',
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
      );
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

      Alert.alert('Success', 'Account created successfully! Please log in.', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Login');
          },
        },
      ]);
    } catch (error) {
      console.error('Create account error:', error);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  const handleSocialSignup = (provider) => {
    Alert.alert('Info', `${provider} signup would be implemented here`);
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };



  return (
    <View style={styles.container}>
      <View style={[styles.gradient, { backgroundColor: '#F3F6FF' }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContainer}
          contentInsetAdjustmentBehavior="always"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.touchableContainer}>
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
                  blurOnSubmit={false}
                  returnKeyType="next"
                  autoCorrect={false}
                  spellCheck={false}
                />
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={state.email}
                  onChangeText={(v) => {
                    dispatch({ type: 'SET_FIELD', field: 'email', value: v });
                    dispatch({
                      type: 'VALIDATE_FIELD',
                      field: 'emailValid',
                      value: checkEmail(v),
                    });
                  }}
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
                  blurOnSubmit={false}
                  returnKeyType="next"
                  autoCorrect={false}
                  spellCheck={false}
                />
                {state.email.length > 0 && !state.emailValid && (
                  <Text style={styles.errorText}>
                    Please enter a valid email address.
                  </Text>
                )}
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={state.password}
                  onChangeText={(v) => {
                    dispatch({ type: 'SET_FIELD', field: 'password', value: v });
                    dispatch({
                      type: 'VALIDATE_FIELD',
                      field: 'passwordValid',
                      value: checkPassword(v),
                    });
                  }}
                  placeholder="Password"
                  secureTextEntry={!state.showPassword}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <Ionicons name="lock-closed-outline" size={20} color="#666666" />
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
                  blurOnSubmit={false}
                  returnKeyType="next"
                  autoCorrect={false}
                  spellCheck={false}
                />
                {!state.passwordValid && state.password.length > 0 && (
                  <Text style={styles.errorText}>
                    Password must be 8+ characters, include uppercase, lowercase, number & special symbol.
                  </Text>
                )}
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={state.confirmPassword}
                  onChangeText={(v) => {
                    dispatch({ type: 'SET_FIELD', field: 'confirmPassword', value: v });
                    dispatch({
                      type: 'VALIDATE_FIELD',
                      field: 'confirmPasswordValid',
                      value: v === state.password,
                    });
                  }}
                  placeholder="Confirm Password"
                  secureTextEntry={!state.showConfirmPassword}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <Ionicons name="lock-closed-outline" size={20} color="#666666" />
                      )}
                    />
                  }
                  right={
                    <TextInput.Icon
                      icon={() => (
                        <Ionicons
                          name={state.showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                          size={20}
                          color="#666666"
                        />
                      )}
                      onPress={() => dispatch({ type: 'TOGGLE', field: 'showConfirmPassword' })}
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
                  blurOnSubmit={true}
                  returnKeyType="done"
                  autoCorrect={false}
                  spellCheck={false}
                />
                {state.confirmPassword.length > 0 && !state.confirmPasswordValid && (
                  <Text style={styles.errorText}>
                    Passwords do not match.
                  </Text>
                )}
              </View>

              {/* Terms & Conditions */}
              <View style={styles.termsContainer}>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    status={state.agreeToTerms ? 'checked' : 'unchecked'}
                    onPress={() => {
                      dispatch({ type: 'TOGGLE', field: 'agreeToTerms' });
                    }}
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
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 80,
  },
  scrollView: {
    flex: 1,
  },
  touchableContainer: {
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
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