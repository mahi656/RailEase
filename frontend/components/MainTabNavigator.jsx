import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import MyBookingsScreen from "./screens/MyBookingsScreen";
import SavedTicket from "./screens/SavedTicket";
import ProfileScreen from "./screens/ProfileScreen";
import Forgot from "./Forgot";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="Forgot" component={Forgot} />
    </Stack.Navigator>
  );
};

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
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;