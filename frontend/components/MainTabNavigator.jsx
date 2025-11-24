import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import MyBookingsScreen from "./screens/MyBookingsScreen";
import SavedTicket from "./screens/SavedTicket";
import ProfileScreen from "./screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // to hide the page name in above bar
        tabBarIcon: ({ color, size }) => {
          let icon = "home-outline";
          if (route.name === "Home") icon = "home-outline";
          if (route.name === "My Bookings") icon = "calendar-outline";
          if (route.name === "Saved Ticket") icon = "document-text-outline";
          if (route.name === "Profile") icon = "person-outline";
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Bookings" component={MyBookingsScreen} />
      <Tab.Screen name="Saved Ticket" component={SavedTicket} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
