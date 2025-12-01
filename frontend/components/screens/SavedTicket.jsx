import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    StatusBar,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRIMARY_BLUE = '#2979FF';
const PRIMARY_BLUE_LIGHT = '#E3F2FD';

const SavedTicket = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadTickets = async () => {
        try {
            const savedTickets = await AsyncStorage.getItem('bookedTickets');
            if (savedTickets) {
                setTickets(JSON.parse(savedTickets));
            }
        } catch (error) {
            console.error('Error loading tickets:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadTickets();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        loadTickets();
    };

    const deleteTicket = async (ticketId) => {
        Alert.alert(
            'Delete Ticket',
            'Are you sure you want to delete this ticket?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const updatedTickets = tickets.filter(ticket => ticket.id !== ticketId);
                            await AsyncStorage.setItem('bookedTickets', JSON.stringify(updatedTickets));
                            setTickets(updatedTickets);
                        } catch (error) {
                            console.error('Error deleting ticket:', error);
                            Alert.alert('Error', 'Could not delete ticket');
                        }
                    },
                },
            ]
        );
    };

    const cancelTicket = async (ticketId) => {
        Alert.alert(
            'Cancel Ticket',
            'Are you sure you want to cancel this ticket? Cancellation charges may apply.',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes, Cancel',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const updatedTickets = tickets.map(ticket =>
                                ticket.id === ticketId
                                    ? { ...ticket, status: 'Cancelled', cancelledAt: new Date().toISOString() }
                                    : ticket
                            );
                            await AsyncStorage.setItem('bookedTickets', JSON.stringify(updatedTickets));
                            setTickets(updatedTickets);
                            Alert.alert('Success', 'Ticket cancelled successfully');
                        } catch (error) {
                            console.error('Error cancelling ticket:', error);
                            Alert.alert('Error', 'Could not cancel ticket');
                        }
                    },
                },
            ]
        );
    };

    const renderTicket = ({ item }) => {
        const isCancelled = item.status === 'Cancelled';

        return (
            <View style={[styles.ticketCard, isCancelled && styles.ticketCardCancelled]}>
                <View style={styles.ticketHeader}>
                    <View style={styles.pnrContainer}>
                        <Text style={styles.pnrLabel}>PNR</Text>
                        <Text style={[styles.pnrText, isCancelled && styles.cancelledText]}>{item.pnr}</Text>
                        {isCancelled && (
                            <View style={styles.cancelledBadge}>
                                <Text style={styles.cancelledBadgeText}>CANCELLED</Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.headerRight}>
                        <View style={styles.classContainer}>
                            <Text style={styles.classText}>{item.class || item.className}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteTicket(item.id)}
                        >
                            <Ionicons name="trash-outline" size={20} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.trainInfo}>
                    <Text style={styles.trainName}>{item.trainName}</Text>
                    <Text style={styles.trainNumber}>#{item.trainNumber}</Text>
                </View>

                <View style={styles.routeContainer}>
                    <View style={styles.stationContainer}>
                        <Text style={styles.stationCode}>{item.fromCode}</Text>
                        <Text style={styles.stationName}>{item.from}</Text>
                        <Text style={styles.time}>{item.departureTime}</Text>
                    </View>

                    <View style={styles.arrowContainer}>
                        <Ionicons name="arrow-forward" size={20} color="#666" />
                    </View>

                    <View style={styles.stationContainer}>
                        <Text style={styles.stationCode}>{item.toCode}</Text>
                        <Text style={styles.stationName}>{item.to}</Text>
                        <Text style={styles.time}>{item.arrivalTime}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.passengerInfo}>
                    <View style={styles.infoRow}>
                        <Ionicons name="person-outline" size={16} color="#666" />
                        <Text style={styles.infoText}>{item.passengerName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="calendar-outline" size={16} color="#666" />
                        <Text style={styles.infoText}>{item.date}</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={styles.fareInfo}>
                        <Text style={styles.fareLabel}>Total Fare</Text>
                        <Text style={styles.fareAmount}>₹{item.price}</Text>
                    </View>
                    {item.numberOfSeats && (
                        <View style={styles.seatsInfo}>
                            <Ionicons name="people-outline" size={16} color="#666" />
                            <Text style={styles.seatsText}>{item.numberOfSeats} Seat{item.numberOfSeats > 1 ? 's' : ''}</Text>
                        </View>
                    )}
                </View>

                {!isCancelled && (
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => cancelTicket(item.id)}
                    >
                        <Ionicons name="close-circle-outline" size={20} color="#fff" />
                        <Text style={styles.cancelButtonText}>Cancel Ticket</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="ticket-outline" size={80} color="#ccc" />
            <Text style={styles.emptyTitle}>No Tickets Yet</Text>
            <Text style={styles.emptySubtitle}>Your booked tickets will appear here</Text>
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Saved Tickets</Text>
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={PRIMARY_BLUE} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Saved Tickets</Text>
                <Text style={styles.ticketCount}>{tickets.length} Ticket{tickets.length !== 1 ? 's' : ''}</Text>
            </View>

            <FlatList
                data={tickets}
                renderItem={renderTicket}
                keyExtractor={(item) => item.id}
                contentContainerStyle={[
                    styles.listContent,
                    tickets.length === 0 && styles.emptyListContent
                ]}
                ListEmptyComponent={renderEmptyState}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[PRIMARY_BLUE]}
                        tintColor={PRIMARY_BLUE}
                    />
                }
            />
        </SafeAreaView>
    );
};

import styles from '../../CSS/SavedTicket';

export default SavedTicket;