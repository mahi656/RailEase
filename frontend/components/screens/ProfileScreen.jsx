import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Avatar, Button, Surface, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    console.log('Logging out...');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Avatar.Text 
            size={80} 
            label="MS" 
            backgroundColor="#807979" 
            color="#FFFFFF" 
          />
          <Text style={styles.name}>Mahi Sawner</Text>
          <Text style={styles.email}>mahi.sawner@example.com</Text>
        </View>

        <Surface style={styles.card} elevation={4}>
          <View style={styles.menuItem}>
            <Ionicons name="person-outline" size={24} color="#005667" />
            <Text style={styles.menuText}>Personal Information</Text>
            <Ionicons name="chevron-forward" size={20} color="#5E6C84" />
          </View>
          <Divider style={styles.divider} />
          <View style={styles.menuItem}>
            <Ionicons name="card-outline" size={24} color="#005667" />
            <Text style={styles.menuText}>Payment Methods</Text>
            <Ionicons name="chevron-forward" size={20} color="#5E6C84" />
          </View>
          <Divider style={styles.divider} />
          <View style={styles.menuItem}>
            <Ionicons name="location-outline" size={24} color="#005667" />
            <Text style={styles.menuText}>Saved Addresses</Text>
            <Ionicons name="chevron-forward" size={20} color="#5E6C84" />
          </View>
          <Divider style={styles.divider} />
          <View style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={24} color="#005667" />
            <Text style={styles.menuText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#5E6C84" />
          </View>
        </Surface>

        <Surface style={styles.card} elevation={4}>
          <View style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={24} color="#005667" />
            <Text style={styles.menuText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#5E6C84" />
          </View>
          <Divider style={styles.divider} />
          <View style={styles.menuItem}>
            <Ionicons name="document-text-outline" size={24} color="#005667" />
            <Text style={styles.menuText}>Terms & Conditions</Text>
            <Ionicons name="chevron-forward" size={20} color="#5E6C84" />
          </View>
          <Divider style={styles.divider} />
          <View style={styles.menuItem}>
            <Ionicons name="shield-outline" size={24} color="#005667" />
            <Text style={styles.menuText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color="#5E6C84" />
          </View>
        </Surface>

        <Button 
          mode="outlined" 
          onPress={handleLogout}
          style={styles.logoutButton}
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
  scrollView: { 
    flex: 1 
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: { 
    alignItems: 'center', 
    marginTop: 20,
    marginBottom: 30 
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#192031',
    marginTop: 16,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#192031',
    opacity: 0.8,
  },
  card: {
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#192031',
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  logoutButton: {
    borderColor: '#FF3B30',
    borderRadius: 8,
    marginTop: 8,
  },
  logoutButtonContent: {
    paddingVertical: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#FF3B30',
  },
});

export default ProfileScreen;
