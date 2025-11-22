import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookingFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const trainData = route.params?.train || {};

  // Form states
  const [passengerName, setPassengerName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [travelClass, setTravelClass] = useState("SL");
  const [journeyDate, setJourneyDate] = useState("");
  const [numberOfSeats, setNumberOfSeats] = useState("1");

  const travelClasses = ["SL", "3A", "2A", "1A"];

  const handleCompleteBooking = async () => {
    // Validation
    if (!passengerName.trim()) {
      Alert.alert("Error", "Please enter passenger name");
      return;
    }
    if (!age.trim() || isNaN(age) || parseInt(age) < 1 || parseInt(age) > 120) {
      Alert.alert("Error", "Please enter a valid age");
      return;
    }
    if (!gender.trim()) {
      Alert.alert("Error", "Please enter gender");
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }
    if (!journeyDate.trim()) {
      Alert.alert("Error", "Please enter journey date");
      return;
    }

    try {
      // Create booking object
      const booking = {
        id: Date.now().toString(),
        trainNumber: trainData.trainNumber || trainData.number || trainData.train_no || "N/A",
        trainName: trainData.trainName || trainData.name || trainData.train_name || "Train",
        from: trainData.from || { code: "N/A", name: "N/A" },
        to: trainData.to || { code: "N/A", name: "N/A" },
        departureTime: trainData.departureTime || trainData.departure || trainData.dep_time || "N/A",
        arrivalTime: trainData.arrivalTime || trainData.arrival || trainData.arr_time || "N/A",
        duration: trainData.duration || trainData.journeyTime || "N/A",
        passengerName: passengerName.trim(),
        age: parseInt(age),
        gender: gender.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim(),
        travelClass: travelClass,
        journeyDate: journeyDate.trim(),
        numberOfSeats: parseInt(numberOfSeats),
        fare: calculateFare(travelClass, parseInt(numberOfSeats)),
        date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        status: "Confirmed",
        bookingDate: new Date().toISOString(),
      };

      // Get existing bookings
      const existingBookingsJson = await AsyncStorage.getItem("bookings");
      const existingBookings = existingBookingsJson ? JSON.parse(existingBookingsJson) : [];

      // Add new booking
      const updatedBookings = [booking, ...existingBookings];

      // Save to AsyncStorage
      await AsyncStorage.setItem("bookings", JSON.stringify(updatedBookings));

      Alert.alert(
        "Booking Confirmed!",
        `Your ticket has been booked successfully.\nPNR: ${booking.id}`,
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("My Bookings");
            },
          },
        ]
      );
    } catch (error) {
      console.error("Booking error:", error);
      Alert.alert("Error", "Failed to complete booking. Please try again.");
    }
  };

  const calculateFare = (classType, seats) => {
    const baseFares = {
      SL: 500,
      "3A": 1200,
      "2A": 2000,
      "1A": 3500,
    };
    return `₹${(baseFares[classType] || 500) * seats}`;
  };

  // Extract station names properly
  const getStationName = (station) => {
    if (typeof station === "string") return station;
    if (typeof station === "object" && station !== null) {
      return station.name || station.code || station.stationName || "N/A";
    }
    return "N/A";
  };

  const getStationCode = (station) => {
    if (typeof station === "string") return station.substring(0, 3).toUpperCase();
    if (typeof station === "object" && station !== null) {
      return station.code || station.stationCode || "N/A";
    }
    return "N/A";
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTime}>9:41</Text>
          <View style={styles.headerIcons}>
            <Ionicons name="cellular" size={16} color="#000" />
            <Ionicons name="wifi" size={16} color="#000" />
            <Ionicons name="battery-full" size={16} color="#000" />
          </View>
        </View>
        <View style={styles.headerBottom}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#192031" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Ticket</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Train Info Card */}
        <Card style={styles.trainInfoCard}>
          <Card.Content>
            <View style={styles.trainInfoHeader}>
              <Text style={styles.trainNumber}>{trainData.trainNumber || trainData.number || "N/A"}</Text>
              <Text style={styles.trainName}>{trainData.trainName || trainData.name || "Train"}</Text>
            </View>
            <View style={styles.routeInfo}>
              <View style={styles.stationBox}>
                <Text style={styles.stationCode}>{getStationCode(trainData.from)}</Text>
                <Text style={styles.stationName}>{getStationName(trainData.from)}</Text>
                <Text style={styles.time}>{trainData.departureTime || trainData.departure || "N/A"}</Text>
              </View>
              <View style={styles.routeArrow}>
                <Ionicons name="arrow-forward" size={24} color="#4A90E2" />
              </View>
              <View style={styles.stationBox}>
                <Text style={styles.stationCode}>{getStationCode(trainData.to)}</Text>
                <Text style={styles.stationName}>{getStationName(trainData.to)}</Text>
                <Text style={styles.time}>{trainData.arrivalTime || trainData.arrival || "N/A"}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Passenger Details Form */}
        <Card style={styles.formCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Passenger Details</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter passenger name"
                value={passengerName}
                onChangeText={setPassengerName}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Age *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Age"
                  keyboardType="numeric"
                  value={age}
                  onChangeText={setAge}
                  maxLength={3}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Gender *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="M/F/Other"
                  value={gender}
                  onChangeText={setGender}
                  maxLength={10}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number *</Text>
              <TextInput
                style={styles.input}
                placeholder="10-digit mobile number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                maxLength={10}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={styles.input}
                placeholder="your.email@example.com"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>
          </Card.Content>
        </Card>

        {/* Journey Details */}
        <Card style={styles.formCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Journey Details</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Travel Class *</Text>
              <View style={styles.classButtons}>
                {travelClasses.map((cls) => (
                  <TouchableOpacity
                    key={cls}
                    style={[styles.classButton, travelClass === cls && styles.classButtonActive]}
                    onPress={() => setTravelClass(cls)}
                  >
                    <Text style={[styles.classButtonText, travelClass === cls && styles.classButtonTextActive]}>
                      {cls}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Journey Date *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="DD/MM/YYYY"
                  value={journeyDate}
                  onChangeText={setJourneyDate}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Number of Seats *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1"
                  keyboardType="numeric"
                  value={numberOfSeats}
                  onChangeText={setNumberOfSeats}
                  maxLength={2}
                />
              </View>
            </View>

            <View style={styles.fareBox}>
              <Text style={styles.fareLabel}>Total Fare:</Text>
              <Text style={styles.fareAmount}>
                {calculateFare(travelClass, parseInt(numberOfSeats) || 1)}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Complete Booking Button */}
        <Button
          mode="contained"
          onPress={handleCompleteBooking}
          style={styles.completeButton}
          buttonColor="#4A90E2"
          contentStyle={styles.buttonContent}
        >
          Complete Booking
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FF",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerTime: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 5,
  },
  headerBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#192031",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  trainInfoCard: {
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trainInfoHeader: {
    marginBottom: 15,
  },
  trainNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#192031",
    marginBottom: 5,
  },
  trainName: {
    fontSize: 14,
    color: "#666",
  },
  routeInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stationBox: {
    flex: 1,
    alignItems: "center",
  },
  stationCode: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#192031",
    marginBottom: 5,
  },
  stationName: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginBottom: 5,
  },
  time: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A90E2",
  },
  routeArrow: {
    marginHorizontal: 10,
  },
  formCard: {
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#192031",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#192031",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#192031",
  },
  row: {
    flexDirection: "row",
  },
  classButtons: {
    flexDirection: "row",
    gap: 10,
  },
  classButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  classButtonActive: {
    borderColor: "#4A90E2",
    backgroundColor: "#E3F2FD",
  },
  classButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  classButtonTextActive: {
    color: "#4A90E2",
  },
  fareBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#F3F6FF",
    borderRadius: 10,
    marginTop: 10,
  },
  fareLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#192031",
  },
  fareAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  completeButton: {
    marginTop: 10,
    borderRadius: 10,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

