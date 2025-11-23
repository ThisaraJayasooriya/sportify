import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import * as Icons from 'react-native-feather';
import EventCard from '../components/EventCard';

const FavouritesScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const favourites = useSelector((state) => state.favourites.items);

  const renderEmpty = () => (
    <View className="flex-1 items-center justify-center py-20">
      <Icons.Heart 
        stroke={isDarkMode ? '#6B7280' : '#9CA3AF'} 
        width={64} 
        height={64} 
      />
      <Text className={`text-lg mt-4 text-center px-8 ${
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        No favourites yet
      </Text>
      <Text className={`text-sm mt-2 text-center px-8 ${
        isDarkMode ? 'text-gray-500' : 'text-gray-500'
      }`}>
        Start adding events to your favourites from the home screen
      </Text>
      <TouchableOpacity
        className="mt-6 px-6 py-3 bg-blue-500 rounded-lg"
        onPress={() => navigation.navigate('Home')}
      >
        <Text className="text-white font-semibold">Browse Events</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View className="mb-6">
      <Text className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        My Favourites 
      </Text>
      <Text className={`text-base mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {favourites.length} {favourites.length === 1 ? 'event' : 'events'} saved
      </Text>
    </View>
  );

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <FlatList
        data={favourites}
        keyExtractor={(item) => item.idEvent}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => navigation.navigate('Details', { event: item })}
            showFavourite={true}
          />
        )}
        ListHeaderComponent={favourites.length > 0 ? renderHeader : null}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FavouritesScreen;
