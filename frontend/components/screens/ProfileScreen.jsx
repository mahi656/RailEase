import React, { useReducer, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Avatar, Button, Card, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../Login';
import CreateAccount from '../CreateAccount';
import styles from '../../CSS/Profile';

const initialState = {
  isLoggedIn: false,
  showCreateAccount: false,
  userName: '',
  userEmail: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        userName: action.name,
        userEmail: action.email,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        userName: '',
        userEmail: '',
        showCreateAccount: false,
      };
    case 'SET_CREATE_ACCOUNT':
      return { ...state, showCreateAccount: action.value };
    case 'LOGIN_FAILURE':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoggedIn, showCreateAccount, userName, userEmail } = state;

  const checkLoginStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        dispatch({
          type: 'LOGIN_SUCCESS',
          name: user.name || user.fullName || 'User',
          email: user.email || '',
        });
      } else {
        dispatch({ type: 'LOGIN_FAILURE' });
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  };
  useEffect(() => {
    checkLoginStatus();

    // Add focus listener to refresh state when screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      checkLoginStatus();
    });

    return unsubscribe;
  }, [navigation]);


  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!isLoggedIn) {
    if (showCreateAccount) {
      return (
        <CreateAccount
          navigation={{
            ...navigation,
            navigate: (route) => {
              if (route === 'Login') {
                dispatch({ type: 'SET_CREATE_ACCOUNT', value: false });
              } else {
                navigation.navigate(route);
              }
            }
          }}
        />
      );
    }
    return (
      <Login
        navigation={{
          ...navigation,
          navigate: (route) => {
            if (route === 'CreateAccount') {
              dispatch({ type: 'SET_CREATE_ACCOUNT', value: true });
            } else if (route === 'MainApp') {
              checkLoginStatus();
              navigation.navigate(route);
            } else {
              navigation.navigate(route);
            }
          }
        }}
      />
    );
  }

  // Profile View
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>

      <ScrollView
        contentContainerStyle={styles.profileContainer}
        showsVerticalScrollIndicator={false}>

        <Card style={styles.profileHeaderCard}>
          <Card.Content style={styles.profileHeaderContent}>
            <View style={styles.avatarContainer}>
              <Avatar.Text
                size={120}
                label={userName.substring(0, 2).toUpperCase()}
                backgroundColor="#4A90E2"
                color="#FFFFFF"
                style={styles.avatar}
              />
              <View style={styles.avatarBadge}>
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              </View>
            </View>
            <Text style={styles.name}>{userName}</Text>

          </Card.Content>
        </Card>

        <Card style={styles.sectionCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Account Information</Text>
            <Divider style={styles.divider} />

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
                  <Ionicons name="person-outline" size={20} color="#4A90E2" />
                </View>
                <View style={styles.menuItemText}>
                  <Text style={styles.menuItemTitle}>Personal Information</Text>
                  <Text style={styles.menuItemSubtitle}>Update your personal details</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <Divider style={styles.itemDivider} />

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
                  <Ionicons name="mail-outline" size={20} color="#4CAF50" />
                </View>
                <View style={styles.menuItemText}>
                  <Text style={styles.menuItemTitle}>Email Address</Text>
                  <Text style={styles.menuItemSubtitle}>{userEmail}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <Divider style={styles.itemDivider} />

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Forgot')}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#FFF3E0' }]}>
                  <Ionicons name="lock-closed-outline" size={20} color="#FF9800" />
                </View>
                <View style={styles.menuItemText}>
                  <Text style={styles.menuItemTitle}>Change Password</Text>
                  <Text style={styles.menuItemSubtitle}>Update your password</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </Card.Content>
        </Card>



        <Card style={styles.sectionCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Support</Text>
            <Divider style={styles.divider} />

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#E1F5FE' }]}>
                  <Ionicons name="help-circle-outline" size={20} color="#03A9F4" />
                </View>
                <View style={styles.menuItemText}>
                  <Text style={styles.menuItemTitle}>Help & Support</Text>
                  <Text style={styles.menuItemSubtitle}>Get help with your account</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <Divider style={styles.itemDivider} />

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#FFF9C4' }]}>
                  <Ionicons name="document-text-outline" size={20} color="#FBC02D" />
                </View>
                <View style={styles.menuItemText}>
                  <Text style={styles.menuItemTitle}>Terms & Privacy</Text>
                  <Text style={styles.menuItemSubtitle}>View terms and privacy policy</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </Card.Content>
        </Card>

        <Button
          mode="outlined"
          onPress={handleLogout}
          style={styles.logoutButton}
          buttonColor="#FFFFFF"
          textColor="#FF3B30"
          contentStyle={styles.logoutButtonContent}
          labelStyle={styles.logoutButtonText}
          icon={() => <Ionicons name="log-out-outline" size={20} color="#FF3B30" />}
        >
          Logout
        </Button>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;