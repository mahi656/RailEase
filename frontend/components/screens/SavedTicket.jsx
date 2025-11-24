import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Text, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SavedTicket = () => {
  const [tickets, setTickets] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadTickets();
    }, [])
  );

  const loadTickets = async () => {
    try {
      const storedTickets = await AsyncStorage.getItem('bookedTickets');
      if (storedTickets) {
        setTickets(JSON.parse(storedTickets).reverse()); // Show newest first
      }
    } catch (error) {
      console.error('Error loading tickets:', error);
    }
  };



  const deleteTicket = async (id) => {
    Alert.alert(
      'Delete Ticket',
      'Are you sure you want to delete this ticket?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedTickets = tickets.filter(ticket => ticket.id !== id);
              setTickets(updatedTickets);
              await AsyncStorage.setItem('bookedTickets', JSON.stringify([...updatedTickets].reverse()));

            } catch (error) {
              console.error('Error deleting ticket:', error);
            }
          }
        }
      ]
    );
  };

  const renderTicket = ({ item }) => (
    <Card style={styles.ticketCard}>
      <Card.Content>
        <View style={styles.headerRow}>
          <Text style={styles.trainName}>{item.trainName}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.pnrText, { marginRight: 10 }]}>PNR: {item.pnr}</Text>
            <TouchableOpacity onPress={() => deleteTicket(item.id)}>
              <Ionicons name="trash-outline" size={20} color="#ff6b6b" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.routeRow}>
          <Text style={styles.stationText}>{item.fromStation}</Text>
          <Ionicons name="arrow-forward" size={20} color="#666" />
          <Text style={styles.stationText}>{item.toStation}</Text>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{item.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Class</Text>
            <Text style={styles.value}>{item.class}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Berth</Text>
            <Text style={styles.value}>{item.berth}</Text>
          </View>
        </View>

        <View style={styles.passengerRow}>
          <Text style={styles.passengerName}>{item.passengerName}</Text>
          <Text style={styles.passengerInfo}>{item.passengerAge} Y / {item.passengerGender}</Text>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Tickets</Text>

      </View>

      {tickets.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="ticket-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No saved tickets found</Text>
          <Text style={styles.emptySubtext}>Book a ticket to see it here</Text>
        </View>
      ) : (
        <FlatList
          data={tickets}
          renderItem={renderTicket}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FF',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#192031',
  },
  listContent: {
    paddingBottom: 20,
  },
  ticketCard: {
    marginBottom: 16,
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
  },
  trainName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  pnrText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
  },
  routeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  stationText: {
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
  },
  detailItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  passengerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  passengerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  passengerInfo: {
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    backgroundColor: '#e8f5e9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#2e7d32',
    fontWeight: 'bold',
    fontSize: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  }
});

export default SavedTicket;
