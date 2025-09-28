import React, { useState } from 'react';
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
  IconButton,
  Divider,
  Checkbox,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const CreateAccountPage = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleCreateAccount = () => {
    console.log('Create Account pressed', { firstName, lastName, email, password, confirmPassword });
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
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join us today</Text>
          </View>

          <Surface style={styles.formContainer} elevation={8}>
            <View style={styles.form}>

              <View style={styles.nameRow}>
                <View style={styles.nameInputContainer}>
                  <Text style={styles.inputLabel}>First Name</Text>
                  <TextInput
                    mode="outlined"
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="First name"
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

                <View style={styles.nameInputContainer}>
                  <Text style={styles.inputLabel}>Last Name</Text>
                  <TextInput
                    mode="outlined"
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Last name"
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
              </View>

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
                    colors: {
                      background: '#FFFFFF',
                    },
                  }}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  mode="outlined"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
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
                          name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                          size={20}
                          color="#807979"
                        />
                      )}
                      onPress={() => setShowPassword(!showPassword)}
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
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm your password"
                  secureTextEntry={!showConfirmPassword}
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
                          name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                          size={20}
                          color="#807979"
                        />
                      )}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
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
                    status={agreeToTerms ? 'checked' : 'unchecked'}
                    onPress={() => setAgreeToTerms(!agreeToTerms)}
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
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
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
    marginHorizontal: 40,
  },
  form: {
    padding: 30,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  nameInputContainer: {
    flex: 1,
    marginRight: 10,
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

export default CreateAccountPage;
