import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Text, Avatar, Button, Card, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../Login';
import CreateAccount from '../CreateAccount';


const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');


  const checkLoginStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setIsLoggedIn(true);
        setUserName(user.name || user.fullName || 'User');
        setUserEmail(user.email || '');
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setIsLoggedIn(false);
      setUserName('');
      setUserEmail('');
      setShowCreateAccount(false);
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
                setShowCreateAccount(false);
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
              setShowCreateAccount(true);
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

            <TouchableOpacity style={styles.menuItem}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 5,
  },
  headerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#192031',
  },
  profileContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  profileHeaderCard: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  profileHeaderContent: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#192031',
    marginBottom: 8,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  memberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF9800',
  },
  sectionCard: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#192031',
    marginBottom: 12,
  },
  divider: {
    marginBottom: 12,
    backgroundColor: '#F0F0F0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#192031',
    marginBottom: 4,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  itemDivider: {
    marginLeft: 56,
    backgroundColor: '#F5F5F5',
  },
  logoutButton: {
    borderColor: '#FF3B30',
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 2,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutButtonContent: {
    paddingVertical: 12,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  },
});

export default ProfileScreen;
