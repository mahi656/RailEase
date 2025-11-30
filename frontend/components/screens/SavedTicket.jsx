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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fb',
    },
    header: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    ticketCount: {
        fontSize: 14,
        color: '#666',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 20,
    },
    emptyListContent: {
        flex: 1,
    },
    ticketCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    ticketCardCancelled: {
        backgroundColor: '#f5f5f5',
        opacity: 0.7,
    },
    ticketHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    pnrContainer: {
        flex: 1,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    pnrLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    pnrText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
    },
    cancelledText: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    cancelledBadge: {
        backgroundColor: '#fee2e2',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginTop: 6,
    },
    cancelledBadgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#ef4444',
    },
    classContainer: {
        backgroundColor: PRIMARY_BLUE_LIGHT,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    classText: {
        fontSize: 14,
        fontWeight: '600',
        color: PRIMARY_BLUE,
    },
    deleteButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#fee2e2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    trainInfo: {
        marginBottom: 16,
    },
    trainName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    trainNumber: {
        fontSize: 14,
        color: '#666',
    },
    routeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    stationContainer: {
        flex: 1,
    },
    stationCode: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    stationName: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    time: {
        fontSize: 14,
        fontWeight: '600',
        color: PRIMARY_BLUE,
    },
    arrowContainer: {
        paddingHorizontal: 16,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 16,
    },
    passengerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: PRIMARY_BLUE_LIGHT,
        padding: 12,
        borderRadius: 10,
    },
    fareInfo: {
        flex: 1,
    },
    fareLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    fareAmount: {
        fontSize: 20,
        fontWeight: '700',
        color: PRIMARY_BLUE,
    },
    seatsInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    seatsText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#666',
    },
    cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ef4444',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginTop: 16,
        gap: 8,
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#666',
    },
});

export default SavedTicket;
