import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SavedTicket = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Saved Tickets</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F6FF',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#192031',
    },
});

export default SavedTicket;
