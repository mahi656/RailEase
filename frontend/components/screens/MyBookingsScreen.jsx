import React from "react";
import { View, StyleSheet} from "react-native";
import TestTrain from "./TestTrain";

export default function MyBookingsScreen() {
  return (
    <View style={styles.trainSearchContainer} key="trainSearch">
      <TestTrain />
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
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#192031",
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  emptyState: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#999",
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#CCC",
    marginTop: 10,
  },
  trainSearchContainer: {
    flex: 1,
    marginTop: 20,
  },
});
