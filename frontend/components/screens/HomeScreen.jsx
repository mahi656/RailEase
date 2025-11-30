import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Platform, StatusBar } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();

  const bannerImageUri = "https://plus.unsplash.com/premium_photo-1673443701408-38bae3c1aec0?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  const scrollimages = [
    "https://images.unsplash.com/photo-1582217900003-2b19c0e3a7d0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kaWFuJTIwcmFpbHdheXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1571893652827-a3e071ab463b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGluZGlhbiUyMHJhaWx3YXl8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1726747062988-cd0b86c814e0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fGluZGlhbiUyMHJhaWx3YXl8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1658360145811-ee613c18a20f?q=80&w=868&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1612083111232-29f08821e47a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGluZGlhbiUyMHJhaWx3YXl8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1561904573-fbb5a5882d34?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGluZGlhbiUyMHJhaWx3YXl8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1656468864556-3adc42bdbd3c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fGluZGlhbiUyMHJhaWx3YXl8ZW58MHx8MHx8fDA%3D",
    "https://media.istockphoto.com/id/927826322/photo/passenger-train-at-chhatrapati-shivaji-maharaj-terminus-in-mumbai.jpg?s=612x612&w=0&k=20&c=AziJuyCrXmF0E3bu5Siy7JZYdMII-VulwVvDygtz_a4=",
    "https://media.istockphoto.com/id/1281921560/photo/mumbai-suburban-railway.jpg?s=612x612&w=0&k=20&c=rpWL9mcwGckSizgK1AQyy2vMNrP5hXqrfG9SWAIBU9s=",
    "https://media.istockphoto.com/id/1395274264/photo/passenger-trains-siliguri-india-april-25-2022-a-passenger-train-standing-at-the-new.jpg?s=612x612&w=0&k=20&c=MmgGAqgJfd1s9XrXk7Ft5P7KBTuHwd6b5UTiRUf6Nws=",
  ]

  const quickActions = [
    {
      id: 1,
      title: 'Book Ticket',
      icon: 'train-outline',
      color: '#4A90E2',
      description: 'Search and book train tickets'
    },
    {
      id: 2,
      title: 'Station Info',
      icon: 'business-outline',
      color: '#50C878',
      description: 'Explore stations & facilities'
    },
    {
      id: 3,
      title: 'My Bookings',
      icon: 'calendar-outline',
      color: '#FF6B6B',
      description: 'View your booked tickets'
    },
    {
      id: 4,
      title: 'Saved Tickets',
      icon: 'ticket-outline',
      color: '#FFA500',
      description: 'View your saved tickets'
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome to</Text>
          <Text style={styles.appTitle}>RailEase</Text>
          <Text style={styles.tagline}>Your Journey, Our Priority</Text>
        </View>

        {/* Banner Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: bannerImageUri }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        {/* Quick Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: `${action.color}20` }]}>
                  <Ionicons
                    name={action.icon}
                    size={32}
                    color={action.color}
                  />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Search Train Section */}
        <Card style={styles.searchCard}>
          <Card.Content>
            <View style={styles.searchHeader}>
              <Ionicons name="search-outline" size={24} color="#4A90E2" />
              <Text style={styles.searchTitle}>Search Trains</Text>
            </View>
            <Text style={styles.searchDescription}>
              Find trains between stations and book your tickets instantly
            </Text>
            <Button
              mode="contained"
              style={styles.searchButton}
              labelStyle={styles.searchButtonText}
              onPress={() => { navigation.navigate('My Bookings') }}
            >
              Search Now
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.featuredContainer}>
          <Text style={styles.sectionTitle}>Featured Images</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}>
            {scrollimages.map((imgee, i) => (
              <Image
                source={{ uri: imgee }}
                key={i}
                style={styles.featuredImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FF',
  },
  scrollContent: {
    paddingBottom: 20
  },
  header: {
    backgroundColor: '#192031',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  greeting: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 5,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    fontStyle: 'italic',
  },
  imageContainer: {
    margin: 20,
    marginBottom: 10,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    backgroundColor: '#E0E0E0',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D0D0D0',
    borderStyle: 'dashed',
  },
  placeholderText: {
    marginTop: 10,
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#192031',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#192031',
    marginBottom: 5,
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  searchCard: {
    margin: 20,
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#192031',
    marginLeft: 10,
  },
  searchDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    marginTop: 5,
  },
  searchButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    paddingVertical: 5,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  featuredContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  horizontalScrollContent: {
    paddingRight: 20,
  },
  featuredImage: {
    width: 250,
    height: 180,
    borderRadius: 15,
    marginRight: 15,
    backgroundColor: '#E0E0E0',
  },
});

export default HomeScreen;
