import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

// Auth Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// App Screens
import BottomTabNavigator from './BottomTabNavigator';
import DetailsScreen from '../screens/DetailsScreen';

// Redux Actions
import { setUser } from '../redux/authSlice';
import { setFavourites } from '../redux/favouritesSlice';
import { setTheme } from '../redux/themeSlice';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check for stored auth token
      const token = await AsyncStorage.getItem('authToken');
      const userData = await AsyncStorage.getItem('user');
      const favouritesData = await AsyncStorage.getItem('favourites');
      const themeData = await AsyncStorage.getItem('isDarkMode');

      if (token && userData) {
        const user = JSON.parse(userData);
        dispatch(setUser({ user, token }));
      }

      if (favouritesData) {
        const favourites = JSON.parse(favouritesData);
        dispatch(setFavourites(favourites));
      }

      if (themeData) {
        const darkMode = JSON.parse(themeData);
        dispatch(setTheme(darkMode));
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className={`flex-1 items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
            },
            headerTintColor: isDarkMode ? '#FFFFFF' : '#1F2937',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="MainApp" 
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Details" 
            component={DetailsScreen}
            options={{
              title: 'Event Details',
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
