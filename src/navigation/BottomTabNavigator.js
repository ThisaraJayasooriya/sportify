import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import * as Icons from 'react-native-feather';
import HomeScreen from '../screens/HomeScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
        },
        headerTintColor: isDarkMode ? '#FFFFFF' : '#1F2937',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
          borderTopColor: isDarkMode ? '#374151' : '#E5E7EB',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: isDarkMode ? '#9CA3AF' : '#6B7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent;

          if (route.name === 'Home') {
            IconComponent = Icons.Home;
          } else if (route.name === 'Favourites') {
            IconComponent = Icons.Heart;
          } else if (route.name === 'Profile') {
            IconComponent = Icons.User;
          }

          return (
            <IconComponent
              stroke={color}
              fill={focused && route.name === 'Favourites' ? color : 'none'}
              width={size}
              height={size}
            />
          );
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen 
        name="Favourites" 
        component={FavouritesScreen}
        options={{
          title: 'Favourites',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
