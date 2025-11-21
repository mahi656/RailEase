import React, { useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import fetchTrainBetweenStations from "../api/fetchTrainBetweenStations";

export default function MyBookingsScreen() {
  const [result, setResult] = useState(null);

  const getData = async () => {
    const data = await fetchTrainBetweenStations("harda", "bhopal", "2025-11-06");
    setResult(data);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Button title="Check Trains" onPress={getData} />

      {result && (
        <Text style={{ marginTop: 20, fontSize: 12 }}>
          {JSON.stringify(result, null, 2)}
        </Text>
      )}
    </ScrollView>
  );
}
