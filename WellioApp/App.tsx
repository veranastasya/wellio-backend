import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Platform, View, Dimensions, TouchableOpacity, Alert } from 'react-native';

// Import screens
import DashboardScreen from './src/screens/coach/DashboardScreen';
import ClientsScreen from './src/screens/coach/ClientsScreen';
import MessagesScreen from './src/screens/coach/MessagesScreen';
import AnalyticsScreen from './src/screens/coach/AnalyticsScreen';
import ClientOnboardingScreen from './src/screens/coach/ClientOnboardingScreen';
import ChatScreen from './src/screens/coach/ChatScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Handle Add button press
const handleAddPress = (navigation: any) => {
  Alert.alert(
    'Add Client',
    'Choose how you would like to add a new client:',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Add Manually',
        onPress: () => navigation.navigate('ClientOnboarding'),
      },
      {
        text: 'Send Questionnaire',
        onPress: () => Alert.alert('Coming Soon', 'Questionnaire feature will be available soon!'),
      },
    ]
  );
};

// Custom center button component
const CustomAddButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={{
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#28A0AE',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -8, // Slight elevation
  }}>
    <Ionicons name="add" size={24} color="#FFFFFF" />
  </TouchableOpacity>
);

function MainTabs({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = Dimensions.get('window');
  
  // Calculate safe bottom padding for modern devices
  const bottomSafeArea = insets.bottom;
  const isModernDevice = Platform.OS === 'ios' && screenHeight >= 812; // iPhone X and newer
  const hasGestureNavigation = Platform.OS === 'android' && Platform.Version >= 29;
  
  // Dynamic height based on device
  const tabBarHeight = 63 + bottomSafeArea;
  const tabBarPaddingBottom = bottomSafeArea > 0 ? bottomSafeArea : 8;

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
              return <CustomAddButton onPress={() => handleAddPress(navigation)} />;
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
          height: tabBarHeight,
          paddingBottom: tabBarPaddingBottom,
          paddingTop: 8,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '400',
          marginBottom: bottomSafeArea > 0 ? 4 : 0,
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
          <Stack.Screen name="ClientOnboarding" component={ClientOnboardingScreen} />
          <Stack.Screen name="ChatRoom" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

