import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Icons from 'react-native-feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToFavourites, removeFromFavourites } from '../redux/favouritesSlice';

const DetailsScreen = ({ route, navigation }) => {
  const { event } = route.params;
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const favourites = useSelector((state) => state.favourites.items);
  
  const isFavourite = favourites.some(item => item.idEvent === event.idEvent);

  const toggleFavourite = async () => {
    if (isFavourite) {
      dispatch(removeFromFavourites(event.idEvent));
      
      // Update AsyncStorage
      const updatedFavourites = favourites.filter(item => item.idEvent !== event.idEvent);
      await AsyncStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      
      Alert.alert('Removed', 'Event removed from favourites');
    } else {
      dispatch(addToFavourites(event));
      
      // Update AsyncStorage
      const updatedFavourites = [...favourites, event];
      await AsyncStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      
      Alert.alert('Added', 'Event added to favourites');
    }
  };

  return (
    <ScrollView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Event Image */}
      {event.strThumb && (
        <Image
          source={{ uri: event.strThumb }}
          className="w-full h-64"
          resizeMode="cover"
        />
      )}

      {/* Content */}
      <View className="p-6">
        {/* Title and Favourite Button */}
        <View className="flex-row justify-between items-start mb-4">
          <Text className={`text-2xl font-bold flex-1 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {event.strEvent}
          </Text>
          <TouchableOpacity
            onPress={toggleFavourite}
            className={`ml-4 p-3 rounded-full ${
              isFavourite 
                ? 'bg-red-500' 
                : isDarkMode 
                ? 'bg-gray-800' 
                : 'bg-gray-200'
            }`}
          >
            <Icons.Heart
              stroke={isFavourite ? 'white' : isDarkMode ? '#9CA3AF' : '#6B7280'}
              fill={isFavourite ? 'white' : 'none'}
              width={24}
              height={24}
            />
          </TouchableOpacity>
        </View>

        {/* Status Badge */}
        {event.strStatus && (
          <View className={`self-start px-4 py-2 rounded-full mb-4 ${
            event.strStatus === 'Match Finished' 
              ? 'bg-green-500' 
              : 'bg-blue-500'
          }`}>
            <Text className="text-white font-semibold text-sm">
              {event.strStatus}
            </Text>
          </View>
        )}

        {/* Event Details */}
        <View className={`p-4 rounded-lg mb-4 ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          {/* Date */}
          {event.dateEvent && (
            <View className="flex-row items-center mb-3">
              <Icons.Calendar 
                stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                width={20} 
                height={20} 
              />
              <Text className={`ml-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {new Date(event.dateEvent).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
          )}

          {/* Time */}
          {event.strTime && (
            <View className="flex-row items-center mb-3">
              <Icons.Clock 
                stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                width={20} 
                height={20} 
              />
              <Text className={`ml-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {event.strTime}
              </Text>
            </View>
          )}

          {/* Venue */}
          {event.strVenue && (
            <View className="flex-row items-center mb-3">
              <Icons.MapPin 
                stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                width={20} 
                height={20} 
              />
              <Text className={`ml-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {event.strVenue}
              </Text>
            </View>
          )}

          {/* League */}
          {event.strLeague && (
            <View className="flex-row items-center">
              <Icons.Award 
                stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                width={20} 
                height={20} 
              />
              <Text className={`ml-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {event.strLeague}
              </Text>
            </View>
          )}
        </View>

        {/* Score (if available) */}
        {event.intHomeScore && event.intAwayScore && (
          <View className={`p-4 rounded-lg mb-4 ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <Text className={`text-lg font-semibold mb-3 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Final Score
            </Text>
            <View className="flex-row justify-around">
              <View className="items-center">
                <Text className={`text-3xl font-bold ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-500'
                }`}>
                  {event.intHomeScore}
                </Text>
                <Text className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {event.strHomeTeam}
                </Text>
              </View>
              <Text className={`text-2xl font-bold ${
                isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                -
              </Text>
              <View className="items-center">
                <Text className={`text-3xl font-bold ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-500'
                }`}>
                  {event.intAwayScore}
                </Text>
                <Text className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {event.strAwayTeam}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Description */}
        {event.strDescriptionEN && (
          <View className="mb-4">
            <Text className={`text-lg font-semibold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              About
            </Text>
            <Text className={`leading-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {event.strDescriptionEN}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;
