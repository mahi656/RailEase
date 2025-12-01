import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import dummyData from '../dummydata';

const PRIMARY_BLUE = '#2979FF';
const PRIMARY_BLUE_LIGHT = '#E3F2FD';

const TestTrain = () => {
  const navigation = useNavigation();
  const [fromInput, setFromInput] = useState('');
  const [toInput, setToInput] = useState('');
  const [fromCode, setFromCode] = useState('');
  const [toCode, setToCode] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState('');

  // Search stations and show suggestions
  const handleStationSearch = (query, field) => {
    if (field === 'from') {
      setFromInput(query);
      setShowFromSuggestions(true);
    } else {
      setToInput(query);
      setShowToSuggestions(true);
    }

    if (!query.trim()) {
      if (field === 'from') {
        setFromSuggestions(dummyData.stations.slice(0, 10));
      } else {
        setToSuggestions(dummyData.stations.slice(0, 10));
      }
      return;
    }

    const filtered = dummyData.stations.filter((station) => {
      const searchText = `${station.name} ${station.code} ${station.city}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    }).slice(0, 10);

    if (field === 'from') {
      setFromSuggestions(filtered);
    } else {
      setToSuggestions(filtered);
    }
  };

  // Select a station from suggestions
  const selectStation = (station, field) => {
    if (field === 'from') {
      setFromInput(`${station.name} (${station.code})`);
      setFromCode(station.code);
      setShowFromSuggestions(false);
      setFromSuggestions([]);
    } else {
      setToInput(`${station.name} (${station.code})`);
      setToCode(station.code);
      setShowToSuggestions(false);
      setToSuggestions([]);
    }
  };

  // Search trains between two stations
  const searchTrains = () => {
    setError('');
    setTrains([]);

    if (!fromCode || !toCode) {
      setError('Please select both From and To stations');
      return;
    }

    // Find the station IDs
    const fromStation = dummyData.stations.find(s => s.code === fromCode);
    const toStation = dummyData.stations.find(s => s.code === toCode);

    if (!fromStation || !toStation) {
      setError('Invalid stations selected');
      return;
    }

    // Find trains that have both stations in their route
    const matchingTrains = dummyData.trains.filter(train => {
      const routeStationIds = train.route.map(r => r.station);
      const fromIndex = routeStationIds.indexOf(fromStation.id);
      const toIndex = routeStationIds.indexOf(toStation.id);

      // Both stations must exist and from must come before to
      return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
    });

    if (matchingTrains.length === 0) {
      setError(`No trains found between ${fromStation.name} and ${toStation.name}`);
      return;
    }

    setTrains(matchingTrains);
  };

  // Navigate to booking screen
  const openBooking = (train) => {
    const fromStation = dummyData.stations.find(s => s.code === fromCode);
    const toStation = dummyData.stations.find(s => s.code === toCode);

    navigation.navigate('BookInformation', {
      train,
      fromCode,
      toCode,
      fromName: fromStation?.name || fromCode,
      toName: toStation?.name || toCode,
    });
  };

  // Render suggestion item
  const renderSuggestion = (station, field) => (
    <TouchableOpacity
      key={station.code}
      style={styles.suggestionItem}
      onPress={() => selectStation(station, field)}
    >
      <View style={styles.suggestionContent}>
        <View style={styles.suggestionLeft}>
          <Text style={styles.suggestionStationName}>{station.name}</Text>
          <Text style={styles.suggestionCity}>{station.city}</Text>
        </View>
        <Text style={styles.suggestionCode}>{station.code}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render train card
  const renderTrainCard = ({ item }) => (
    <View style={styles.trainCard}>
      <View style={styles.trainHeader}>
        <View>
          <Text style={styles.trainNumber}>{item.trainNumber}</Text>
          <Text style={styles.trainName}>{item.name}</Text>
        </View>
        <View style={styles.trainTypeBadge}>
          <Text style={styles.trainTypeText}>{item.type}</Text>
        </View>
      </View>

      <View style={styles.routeRow}>
        <View style={styles.timeBlock}>
          <Text style={styles.timeText}>{item.departureTime}</Text>
          <Text style={styles.stationCodeText}>{fromCode}</Text>
        </View>

        <View style={styles.durationBlock}>
          <Ionicons name="arrow-forward" size={20} color={PRIMARY_BLUE} />
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>

        <View style={styles.timeBlock}>
          <Text style={styles.timeText}>{item.arrivalTime}</Text>
          <Text style={styles.stationCodeText}>{toCode}</Text>
        </View>
      </View>

      <View style={styles.trainFooter}>

        <TouchableOpacity style={styles.bookButton} onPress={() => openBooking(item)}>
          <Text style={styles.bookButtonText}>Book Ticket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#2979FF', '#1B4EDB']} style={styles.header}>
          <Text style={styles.headerLabel}>Let's</Text>
          <Text style={styles.headerTitle}>Book Your Train</Text>
          <Text style={styles.headerSubtitle}>Make your journey more memorable</Text>
        </LinearGradient>

        {/* Search Card */}
        <View style={styles.searchCard}>
          {/* From Station */}
          <View style={styles.fromInputGroup}>
            <Text style={styles.label}>From</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="train" size={20} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={fromInput}
                placeholder="Enter station name or code"
                placeholderTextColor="#9CA3AF"
                onChangeText={(text) => handleStationSearch(text, 'from')}
                onFocus={() => {
                  setShowFromSuggestions(true);
                  if (fromSuggestions.length === 0) {
                    setFromSuggestions(dummyData.stations.slice(0, 10));
                  }
                }}
              />
            </View>
            {showFromSuggestions && fromSuggestions.length > 0 && (
              <View style={styles.suggestionsBox}>
                <ScrollView style={styles.suggestionsList} nestedScrollEnabled>
                  {fromSuggestions.map(station => renderSuggestion(station, 'from'))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Swap Button */}
          <View style={styles.swapButtonContainer}>
            <TouchableOpacity
              style={styles.swapButton}
              onPress={() => {
                // Swap the values
                const tempInput = fromInput;
                const tempCode = fromCode;
                const tempSuggestions = fromSuggestions;

                setFromInput(toInput);
                setFromCode(toCode);
                setFromSuggestions(toSuggestions);

                setToInput(tempInput);
                setToCode(tempCode);
                setToSuggestions(tempSuggestions);
              }}
            >
              <MaterialIcons name="swap-vert" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* To Station */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>To</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="train" size={20} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={toInput}
                placeholder="Enter station name or code"
                placeholderTextColor="#9CA3AF"
                onChangeText={(text) => handleStationSearch(text, 'to')}
                onFocus={() => {
                  setShowToSuggestions(true);
                  if (toSuggestions.length === 0) {
                    setToSuggestions(dummyData.stations.slice(0, 10));
                  }
                }}
              />
            </View>
            {showToSuggestions && toSuggestions.length > 0 && (
              <View style={styles.suggestionsBox}>
                <ScrollView style={styles.suggestionsList} nestedScrollEnabled>
                  {toSuggestions.map(station => renderSuggestion(station, 'to'))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Search Button */}
          <TouchableOpacity style={styles.searchButton} onPress={searchTrains}>
            <Text style={styles.searchButtonText}>Search Trains</Text>
          </TouchableOpacity>

          {/* Error Message */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        {/* Train Results */}
        {trains.length > 0 && (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsTitle}>Available Trains ({trains.length})</Text>
            <FlatList
              data={trains}
              keyExtractor={(item) => item.id}
              renderItem={renderTrainCard}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

import styles from '../../CSS/TestTrain';

export default TestTrain;