import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Switch,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Icons from 'react-native-feather';
import { logout } from '../redux/authSlice';
import { clearFavourites } from '../redux/favouritesSlice';
import { toggleTheme } from '../redux/themeSlice';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            // Clear AsyncStorage
            await AsyncStorage.removeItem('authToken');
            await AsyncStorage.removeItem('user');
            
            // Clear Redux state
            dispatch(logout());
            dispatch(clearFavourites());
          },
        },
      ]
    );
  };

  const handleToggleTheme = async () => {
    dispatch(toggleTheme());
    
    // Save theme preference to AsyncStorage
    const newTheme = !isDarkMode;
    await AsyncStorage.setItem('isDarkMode', JSON.stringify(newTheme));
  };

  return (
    <ScrollView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <View className="p-6">
        {/* Profile Header */}
        <View className="items-center mb-8 mt-4">
          <View className={`w-24 h-24 rounded-full items-center justify-center mb-4 ${
            isDarkMode ? 'bg-blue-900' : 'bg-blue-500'
          }`}>
            <Text className="text-white text-4xl font-bold">
              {user?.firstName?.charAt(0) || user?.username?.charAt(0) || 'U'}
            </Text>
          </View>
          <Text className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text className={`text-base mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            @{user?.username}
          </Text>
        </View>

        {/* User Information */}
        <View className={`p-4 rounded-lg mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <Text className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Account Information
          </Text>

          {user?.email && (
            <View className="flex-row items-center mb-3 pb-3 border-b border-gray-700">
              <Icons.Mail 
                stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                width={20} 
                height={20} 
              />
              <View className="ml-3 flex-1">
                <Text className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Email
                </Text>
                <Text className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {user.email}
                </Text>
              </View>
            </View>
          )}

          {user?.phone && (
            <View className="flex-row items-center mb-3 pb-3 border-b border-gray-700">
              <Icons.Phone 
                stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                width={20} 
                height={20} 
              />
              <View className="ml-3 flex-1">
                <Text className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Phone
                </Text>
                <Text className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {user.phone}
                </Text>
              </View>
            </View>
          )}

          {user?.birthDate && (
            <View className="flex-row items-center">
              <Icons.Calendar 
                stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                width={20} 
                height={20} 
              />
              <View className="ml-3 flex-1">
                <Text className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Birth Date
                </Text>
                <Text className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {user.birthDate}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Settings */}
        <View className={`p-4 rounded-lg mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <Text className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Preferences
          </Text>

          {/* Dark Mode Toggle */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <Icons.Moon 
                stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                width={20} 
                height={20} 
              />
              <View className="ml-3">
                <Text className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Dark Mode
                </Text>
                <Text className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Toggle app theme
                </Text>
              </View>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={handleToggleTheme}
              trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
              thumbColor={isDarkMode ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>
        </View>

        {/* Actions */}
        <View className="space-y-3">
          {/* About */}
          <TouchableOpacity
            className={`flex-row items-center p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
            onPress={() => Alert.alert('About', 'Sports & Lifestyle App v1.0.0\nBuilt with React Native & Expo')}
          >
            <Icons.Info 
              stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
              width={20} 
              height={20} 
            />
            <Text className={`ml-3 flex-1 font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              About App
            </Text>
            <Icons.ChevronRight 
              stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
              width={20} 
              height={20} 
            />
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity
            className="flex-row items-center p-4 rounded-lg bg-red-500"
            onPress={handleLogout}
          >
            <Icons.LogOut stroke="white" width={20} height={20} />
            <Text className="ml-3 flex-1 font-semibold text-white">
              Logout
            </Text>
            <Icons.ChevronRight stroke="white" width={20} height={20} />
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <Text className={`text-center mt-8 text-sm ${
          isDarkMode ? 'text-gray-500' : 'text-gray-500'
        }`}>
          Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
