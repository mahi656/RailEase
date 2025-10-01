import React, { useReducer } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
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
import { LinearGradient } from 'expo-linear-gradient';

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

  const handleCreateAccount = () => {
    const { fullName, email, otp, isOtpVerified, password, confirmPassword } = state;
    console.log('Create Account pressed', { fullName, email, otp, isOtpVerified, password, confirmPassword });
  };

  const handleSocialSignup = (provider) => {
    console.log(`${provider} signup pressed`);
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
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
                        <Ionicons name="person-outline" size={20} color="#005667" />
                      )}
                    />
                  }
                  style={styles.input}
                  outlineColor="#F3F3F6"
                  activeOutlineColor="#005667"
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
                        <Ionicons name="mail-outline" size={20} color="#005667" />
                      )}
                    />
                  }
                  style={styles.input}
                  outlineColor="#F3F3F6"
                  activeOutlineColor="#005667"
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
                    textColor="#005667"
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
                          <Ionicons name="key-outline" size={20} color="#005667" />
                        )}
                      />
                    }
                    style={styles.input}
                    outlineColor="#F3F3F6"
                    activeOutlineColor="#005667"
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
                      textColor="#005667"
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
                          color="#005667"
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
                          color="#807979"
                        />
                      )}
                      onPress={() => dispatch({ type: 'TOGGLE', field: 'showPassword' })}
                    />
                  }
                  style={styles.input}
                  outlineColor="#F3F3F6"
                  activeOutlineColor="#005667"
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
                          color="#005667"
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
                          color="#807979"
                        />
                      )}
                      onPress={() => dispatch({ type: 'TOGGLE', field: 'showConfirmPassword' })}
                    />
                  }
                  style={styles.input}
                  outlineColor="#F3F3F6"
                  activeOutlineColor="#005667"
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
                    color="#005667"
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
                buttonColor="#005667"
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
      </LinearGradient>
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
    color: '#FFFFFF',
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
  // removed first/last name row styles
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
    color: '#005667',
    fontWeight: '600',
  },
  createAccountButton: {
    borderRadius: 16,
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#005667',
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
    color: '#005667',
    fontWeight: 'bold',
  },
});

export default CreateAccount;