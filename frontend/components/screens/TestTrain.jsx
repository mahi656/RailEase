import React, { useReducer, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, SafeAreaView, StatusBar, ScrollView, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dummyData from '../dummydata';
import styles from '../../CSS/TestTrain';

const PRIMARY_BLUE = '#2979FF';

const initialState = {
  fromInput: '',
  toInput: '',
  fromCode: '',
  toCode: '',
  fromSuggestions: [],
  toSuggestions: [],
  showFromSuggestions: false,
  showToSuggestions: false,
  trains: [],
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_SUGGESTIONS':
      return {
        ...state,
        [action.field === 'from' ? 'fromSuggestions' : 'toSuggestions']: action.value,
        [action.field === 'from' ? 'showFromSuggestions' : 'showToSuggestions']: action.show,
      };
    case 'SELECT_STATION':
      if (action.field === 'from') {
        return {
          ...state,
          fromInput: `${action.station.name} (${action.station.code})`,
          fromCode: action.station.code,
          showFromSuggestions: false,
          fromSuggestions: [],
        };
      } else {
        return {
          ...state,
          toInput: `${action.station.name} (${action.station.code})`,
          toCode: action.station.code,
          showToSuggestions: false,
          toSuggestions: [],
        };
      }
    case 'SWAP_STATIONS':
      return {
        ...state,
        fromInput: state.toInput,
        fromCode: state.toCode,
        fromSuggestions: state.toSuggestions,
        toInput: state.fromInput,
        toCode: state.fromCode,
        toSuggestions: state.fromSuggestions,
      };
    case 'SEARCH_TRAINS':
      return {
        ...state,
        trains: action.trains,
        error: '',
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
        trains: [],
      };
    default:
      return state;
  }
}

const TestTrain = () => {
  const navigation = useNavigation();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load trains from AsyncStorage or initialize with dummyData
  useEffect(() => {
    const initTrains = async () => {
      try {
        const storedTrains = await AsyncStorage.getItem('allTrains');
        if (storedTrains) {
          // We don't necessarily need to set them in state here if we filter on search
          // But it's good to have them ready.
        } else {
          await AsyncStorage.setItem('allTrains', JSON.stringify(dummyData.trains));
        }
      } catch (error) {
        console.error('Error initializing trains:', error);
      }
    };
    initTrains();

    // Refresh trains whenever the screen is focused (to pick up changes from booking)
    const unsubscribe = navigation.addListener('focus', () => {
      // Logic handled in searchTrains or on mount
    });
    return unsubscribe;
  }, [navigation]);

  const {
    fromInput,
    toInput,
    fromCode,
    toCode,
    fromSuggestions,
    toSuggestions,
    showFromSuggestions,
    showToSuggestions,
    trains,
    error,
  } = state;

  // Search stations and show suggestions
  const handleStationSearch = (query, field) => {
    dispatch({ type: 'SET_FIELD', field: field === 'from' ? 'fromInput' : 'toInput', value: query });

    if (!query.trim()) {
      dispatch({
        type: 'SET_SUGGESTIONS',
        field,
        value: dummyData.stations.slice(0, 10),
        show: true
      });
      return;
    }

    const filtered = dummyData.stations.filter((station) => {
      const searchText = `${station.name} ${station.code} ${station.city}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    }).slice(0, 10);

    dispatch({
      type: 'SET_SUGGESTIONS',
      field,
      value: filtered,
      show: true
    });
  };

  // Select a station from suggestions
  const selectStation = (station, field) => {
    dispatch({ type: 'SELECT_STATION', station, field });
  };

  // Search trains between two stations
  const searchTrains = () => {
    if (!fromCode || !toCode) {
      dispatch({ type: 'SET_ERROR', error: 'Please select both From and To stations' });
      return;
    }

    // Find the station IDs
    const fromStation = dummyData.stations.find(s => s.code === fromCode);
    const toStation = dummyData.stations.find(s => s.code === toCode);

    if (!fromStation || !toStation) {
      dispatch({ type: 'SET_ERROR', error: 'Invalid stations selected' });
      return;
    }

    // Find trains that have both stations in their route
    const performSearch = async () => {
      try {
        const storedTrains = await AsyncStorage.getItem('allTrains');
        const allTrains = storedTrains ? JSON.parse(storedTrains) : dummyData.trains;

        const matchingTrains = allTrains.filter(train => {
          const routeStationIds = train.route.map(r => r.station);
          const fromIndex = routeStationIds.indexOf(fromStation.id);
          const toIndex = routeStationIds.indexOf(toStation.id);

          // Both stations must exist and from must come before to
          return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
        });

        if (matchingTrains.length === 0) {
          dispatch({ type: 'SET_ERROR', error: `No trains found between ${fromStation.name} and ${toStation.name}` });
          return;
        }

        dispatch({ type: 'SEARCH_TRAINS', trains: matchingTrains });
      } catch (error) {
        console.error('Search error:', error);
        dispatch({ type: 'SET_ERROR', error: 'Failed to search trains' });
      }
    };

    performSearch();
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
                  dispatch({
                    type: 'SET_SUGGESTIONS',
                    field: 'from',
                    value: fromSuggestions.length === 0 ? dummyData.stations.slice(0, 10) : fromSuggestions,
                    show: true
                  });
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
              onPress={() => dispatch({ type: 'SWAP_STATIONS' })}
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
                  dispatch({
                    type: 'SET_SUGGESTIONS',
                    field: 'to',
                    value: toSuggestions.length === 0 ? dummyData.stations.slice(0, 10) : toSuggestions,
                    show: true
                  });
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

export default TestTrain;