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

    const [selectedClass, setSelectedClass] = useState(train?.classes?.[0] || null);
    const [numberOfSeats, setNumberOfSeats] = useState(1);
    const [passengerName, setPassengerName] = useState('');
    const [passengerAge, setPassengerAge] = useState('');
    const [passengerGender, setPassengerGender] = useState('Male');
    const [contactNumber, setContactNumber] = useState('');

    const saveBooking = async () => {
        if (!selectedClass) {
            Alert.alert('Selection Required', 'Please select a class');
            return;
        }

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
                price: selectedClass.fare * numberOfSeats,
                numberOfSeats: numberOfSeats,
                class: selectedClass.class,
                className: selectedClass.name,
                bookedAt: new Date().toISOString(),
                pnr: `PNR${Math.floor(1000000000 + Math.random() * 9000000000)}`,
            };

            await AsyncStorage.setItem('bookedTickets', JSON.stringify([booking, ...tickets]));

            Alert.alert('Success', 'Ticket booked successfully!', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('MainApp', { screen: 'Saved Ticket' }),
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

                {/* Class Selection */}
                {train?.classes && (
                    <View style={styles.classSelectionContainer}>
                        <Text style={styles.sectionTitle}>Select Class</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.classesList}>
                            {train.classes.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.classCard,
                                        selectedClass?.class === item.class && styles.classCardActive
                                    ]}
                                    onPress={() => setSelectedClass(item)}
                                >
                                    <View style={styles.classHeader}>
                                        <Text style={[
                                            styles.className,
                                            selectedClass?.class === item.class && styles.classNameActive
                                        ]}>{item.class}</Text>
                                        <Text style={[
                                            styles.classPrice,
                                            selectedClass?.class === item.class && styles.classPriceActive
                                        ]}>₹{item.fare}</Text>
                                    </View>
                                    <View style={styles.seatInfo}>
                                        <Text style={[
                                            styles.classAvailability,
                                            selectedClass?.class === item.class && styles.classAvailabilityActive
                                        ]}>AVL: {item.available}</Text>
                                        <Text style={[
                                            styles.classTotalSeats,
                                            selectedClass?.class === item.class && styles.classAvailabilityActive
                                        ]}>/{item.totalSeats}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {/* Seat Quantity Selection */}
                <View style={styles.seatQuantityContainer}>
                    <Text style={styles.sectionTitle}>Number of Seats</Text>
                    <View style={styles.quantitySelector}>
                        <TouchableOpacity
                            style={[styles.quantityButton, numberOfSeats <= 1 && styles.quantityButtonDisabled]}
                            onPress={() => setNumberOfSeats(Math.max(1, numberOfSeats - 1))}
                            disabled={numberOfSeats <= 1}
                        >
                            <Ionicons name="remove" size={20} color={numberOfSeats <= 1 ? '#ccc' : PRIMARY_BLUE} />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{numberOfSeats}</Text>
                        <TouchableOpacity
                            style={[styles.quantityButton, numberOfSeats >= (selectedClass?.available || 6) && styles.quantityButtonDisabled]}
                            onPress={() => setNumberOfSeats(Math.min(selectedClass?.available || 6, numberOfSeats + 1))}
                            disabled={numberOfSeats >= (selectedClass?.available || 6)}
                        >
                            <Ionicons name="add" size={20} color={numberOfSeats >= (selectedClass?.available || 6) ? '#ccc' : PRIMARY_BLUE} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.seatQuantityHint}>
                        {selectedClass ? `${selectedClass.available} seats available in ${selectedClass.class}` : 'Select a class first'}
                    </Text>
                </View>

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
                <View style={styles.priceContainer}>
                    <Text style={styles.totalLabel}>Total Fare ({numberOfSeats} seat{numberOfSeats > 1 ? 's' : ''})</Text>
                    <Text style={styles.totalPrice}>₹{(selectedClass?.fare || 0) * numberOfSeats}</Text>
                </View>
                <TouchableOpacity style={styles.confirmButton} onPress={saveBooking}>
                    <Text style={styles.confirmButtonText}>Confirm Booking</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

import styles from '../../CSS/BookInf';

export default BookInformation;