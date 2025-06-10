import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';

// Import screens
import DashboardScreen from './src/screens/coach/DashboardScreen';
import ClientsScreen from './src/screens/coach/ClientsScreen';
import MessagesScreen from './src/screens/coach/MessagesScreen';
import AnalyticsScreen from './src/screens/coach/AnalyticsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Custom center button component
const CustomAddButton = () => (
  <View style={{
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#28A0AE',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -8, // Slight elevation
  }}>
    <Ionicons name="add" size={24} color="#FFFFFF" />
  </View>
);

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Clients':
              iconName = 'people-outline';
              break;
            case 'Add':
              return <CustomAddButton />;
            case 'Chat':
              iconName = 'chatbubble-outline';
              break;
            case 'Analytics':
              iconName = 'stats-chart-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName as any} size={24} color={color} />;
        },
        tabBarActiveTintColor: '#28A0AE',
        tabBarInactiveTintColor: '#6B7280',
        headerShown: false,
        tabBarStyle: {
          height: 63,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '400',
        }
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Clients" component={ClientsScreen} />
      <Tab.Screen 
        name="Add" 
        component={DashboardScreen}
        options={{
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen name="Chat" component={MessagesScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar 
        style="dark" 
        backgroundColor="#FFFFFF"
        translucent={Platform.OS === 'android'}
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

