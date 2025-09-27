import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
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


const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    console.log('Login pressed', { email, password });
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login pressed`);
  };

  const navigateToCreateAccount = () => {
    // navigation.navigate('CreateAccount'); // For React Navigation
    console.log('Navigate to Create Account');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#005667', '#192031']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Login to your account</Text>
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
                    colors: {
                      background: '#FFFFFF',
                    },
                  }}
                />
              </View>

              {/* Password Input */}
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

              {/* Remember Me & Forgot Password */}
              <View style={styles.optionsRow}>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    status={rememberMe ? 'checked' : 'unchecked'}
                    onPress={() => setRememberMe(!rememberMe)}
                    color="#005667"
                  />
                  <Text style={styles.checkboxText}>Remember Me</Text>
                </View>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </View>

              {/* Login Button */}
              <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.loginButton}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonText}
                buttonColor="#005667"
              >
                Login
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
                  onPress={() => handleSocialLogin('Google')}
                />
                <IconButton
                  icon={() => (
                    <Ionicons name="logo-facebook" size={24} color="#FFFFFF" />
                  )}
                  style={[styles.socialButton, { backgroundColor: '#4267B2' }]}
                  onPress={() => handleSocialLogin('Facebook')}
                />
                <IconButton
                  icon={() => (
                    <Ionicons name="logo-apple" size={24} color="#FFFFFF" />
                  )}
                  style={[styles.socialButton, { backgroundColor: '#000000' }]}
                  onPress={() => handleSocialLogin('Apple')}
                />
              </View>

              {/* Sign Up Link */}
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <Text 
                  style={styles.signupLink} 
                  onPress={navigateToCreateAccount}
                >
                  Create Account
                </Text>
              </View>
            </View>
          </Surface>
        </ScrollView>
      </LinearGradient>
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
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
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
    marginHorizontal: 10,
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 14,
    color: '#807979',
    marginLeft: 4,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#005667',
    fontWeight: '600',
  },
  loginButton: {
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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
    color: '#807979',
  },
  signupLink: {
    fontSize: 16,
    color: '#005667',
    fontWeight: 'bold',
  },
});

export default LoginPage;