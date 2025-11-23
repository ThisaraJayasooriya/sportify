import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Icons from 'react-native-feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeFromFavourites } from '../redux/favouritesSlice';

const EventCard = ({ event, onPress, showFavourite = false }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.items);

  const handleRemoveFavourite = async (e) => {
    e.stopPropagation();
    dispatch(removeFromFavourites(event.idEvent));
    
    // Update AsyncStorage
    const updatedFavourites = favourites.filter(item => item.idEvent !== event.idEvent);
    await AsyncStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`mb-4 rounded-xl overflow-hidden ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      {/* Image */}
      {event.strThumb ? (
        <Image
          source={{ uri: event.strThumb }}
          className="w-full h-48"
          resizeMode="cover"
        />
      ) : (
        <View className={`w-full h-48 items-center justify-center ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
          <Icons.Calendar 
            stroke={isDarkMode ? '#4B5563' : '#9CA3AF'} 
            width={48} 
            height={48} 
          />
        </View>
      )}

      {/* Content */}
      <View className="p-4">
        {/* Title and Remove Button */}
        <View className="flex-row justify-between items-start mb-2">
          <Text 
            className={`text-lg font-bold flex-1 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
            numberOfLines={2}
          >
            {event.strEvent}
          </Text>
          {showFavourite && (
            <TouchableOpacity
              onPress={handleRemoveFavourite}
              className="ml-2 p-2"
            >
              <Icons.Trash2 stroke="#EF4444" width={20} height={20} />
            </TouchableOpacity>
          )}
        </View>

        {/* League */}
        {event.strLeague && (
          <View className="flex-row items-center mb-2">
            <Icons.Award 
              stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
              width={16} 
              height={16} 
            />
            <Text className={`ml-2 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {event.strLeague}
            </Text>
          </View>
        )}

        {/* Date */}
        {event.dateEvent && (
          <View className="flex-row items-center mb-2">
            <Icons.Calendar 
              stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
              width={16} 
              height={16} 
            />
            <Text className={`ml-2 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {new Date(event.dateEvent).toLocaleDateString()}
            </Text>
          </View>
        )}

        {/* Status Badge */}
        {event.strStatus && (
          <View className="mt-2">
            <View className={`self-start px-3 py-1 rounded-full ${
              event.strStatus === 'Match Finished' 
                ? 'bg-green-500' 
                : 'bg-blue-500'
            }`}>
              <Text className="text-white text-xs font-semibold">
                {event.strStatus}
              </Text>
            </View>
          </View>
        )}

        {/* Score (if available) */}
        {event.intHomeScore !== null && event.intAwayScore !== null && (
          <View className="mt-3 flex-row justify-between items-center">
            <Text className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {event.strHomeTeam}
            </Text>
            <Text className={`text-lg font-bold ${
              isDarkMode ? 'text-blue-400' : 'text-blue-500'
            }`}>
              {event.intHomeScore} - {event.intAwayScore}
            </Text>
            <Text className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {event.strAwayTeam}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
