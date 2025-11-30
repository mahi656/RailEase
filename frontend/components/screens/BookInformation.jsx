import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRIMARY_BLUE = '#2979FF';
const PRIMARY_BLUE_LIGHT = '#E3F2FD';

const BookInformation = ({ route, navigation }) => {
    const { train, fromCode, toCode, fromName, toName } = route.params || {};

    const [passengerName, setPassengerName] = useState('');
    const [passengerAge, setPassengerAge] = useState('');
    const [passengerGender, setPassengerGender] = useState('Male');
    const [contactNumber, setContactNumber] = useState('');

    const saveBooking = async () => {
        if (!passengerName || !passengerAge) {
            Alert.alert('Missing Details', 'Please enter passenger name and age');
            return;
        }

        const age = parseInt(passengerAge);
        if (isNaN(age) || age <= 0) {
            Alert.alert('Invalid Age', 'Please enter a valid age');
            return;
        }

        try {
            const existing = await AsyncStorage.getItem('bookedTickets');
            const tickets = existing ? JSON.parse(existing) : [];

            const booking = {
                id: Date.now().toString(),
                trainNumber: train.trainNumber,
                trainName: train.name,
                from: fromName,
                fromCode: fromCode,
                to: toName,
                toCode: toCode,
                departureTime: train.departureTime,
                arrivalTime: train.arrivalTime,
                passengerName,
                passengerAge: age,
                passengerGender,
                contactNumber,
                date: new Date().toISOString().split('T')[0],
                price: train.classes[0]?.fare || 0,
                bookedAt: new Date().toISOString(),
                pnr: `PNR${Math.floor(1000000000 + Math.random() * 9000000000)}`,
            };

            await AsyncStorage.setItem('bookedTickets', JSON.stringify([booking, ...tickets]));

            Alert.alert('Success', 'Ticket booked successfully!', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('MainApp', { screen: 'Saved Ticket' }), // Navigate to Saved Tickets or Home
                },
            ]);
        } catch (error) {
            console.error('Booking error:', error);
            Alert.alert('Error', 'Could not save ticket');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Passenger Details</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                {train && (
                    <View style={styles.trainInfo}>
                        <Text style={styles.trainInfoText}>{train.name}</Text>
                        <Text style={styles.trainInfoSubtext}>
                            {fromCode} → {toCode}
                        </Text>
                    </View>
                )}

                <View style={styles.formCard}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Passenger Name</Text>
                        <TextInput
                            style={styles.input}
                            value={passengerName}
                            placeholder="Enter full name"
                            onChangeText={setPassengerName}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Age</Text>
                        <TextInput
                            style={styles.input}
                            value={passengerAge}
                            placeholder="Enter age"
                            keyboardType="numeric"
                            onChangeText={setPassengerAge}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Gender</Text>
                        <View style={styles.genderRow}>
                            {['Male', 'Female', 'Other'].map((gender) => (
                                <TouchableOpacity
                                    key={gender}
                                    style={[
                                        styles.genderButton,
                                        passengerGender === gender && styles.genderButtonActive,
                                    ]}
                                    onPress={() => setPassengerGender(gender)}
                                >
                                    <Text
                                        style={[
                                            styles.genderButtonText,
                                            passengerGender === gender && styles.genderButtonTextActive,
                                        ]}
                                    >
                                        {gender}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Contact Number</Text>
                        <TextInput
                            style={styles.input}
                            value={contactNumber}
                            placeholder="Enter mobile number"
                            keyboardType="phone-pad"
                            onChangeText={setContactNumber}
                        />
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.confirmButton} onPress={saveBooking}>
                    <Text style={styles.confirmButtonText}>Confirm Booking</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fb',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },
    content: {
        padding: 20,
    },
    trainInfo: {
        backgroundColor: PRIMARY_BLUE_LIGHT,
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    trainInfoText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    trainInfoSubtext: {
        fontSize: 14,
        color: '#666',
    },
    formCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 13,
        color: '#9CA3AF',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: '#333',
    },
    genderRow: {
        flexDirection: 'row',
        gap: 10,
    },
    genderButton: {
        flex: 1,
        backgroundColor: '#F5F6FB',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    genderButtonActive: {
        backgroundColor: PRIMARY_BLUE_LIGHT,
        borderColor: PRIMARY_BLUE,
    },
    genderButtonText: {
        fontSize: 14,
        color: '#666',
    },
    genderButtonTextActive: {
        color: PRIMARY_BLUE,
        fontWeight: '600',
    },
    footer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    confirmButton: {
        backgroundColor: PRIMARY_BLUE,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: PRIMARY_BLUE,
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default BookInformation;
