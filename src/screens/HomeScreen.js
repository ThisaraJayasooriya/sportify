import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import * as Icons from 'react-native-feather';
import { getUpcomingEvents, getPastEvents } from '../api/sportsService';
import EventCard from '../components/EventCard';

const HomeScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const user = useSelector((state) => state.auth.user);
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    
    // Fetch both upcoming and past events
    const upcomingResult = await getUpcomingEvents();
    const pastResult = await getPastEvents();
    
    let allEvents = [];
    
    if (upcomingResult.success) {
      allEvents = [...allEvents, ...upcomingResult.data];
    }
    
    if (pastResult.success) {
      allEvents = [...allEvents, ...pastResult.data];
    }
    
    // Remove duplicates and sort by date
    const uniqueEvents = allEvents.filter((event, index, self) =>
      index === self.findIndex((e) => e.idEvent === event.idEvent)
    );
    
    setEvents(uniqueEvents.slice(0, 20)); // Limit to 20 events
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };

  const renderHeader = () => (
    <View className="mb-6">
      <Text className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        Welcome, {user?.firstName || user?.username || 'User'}! 👋
      </Text>
      <Text className={`text-base mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Discover the latest sports events
      </Text>
    </View>
  );

  const renderEmpty = () => (
    <View className="flex-1 items-center justify-center py-20">
      <Icons.Calendar 
        stroke={isDarkMode ? '#6B7280' : '#9CA3AF'} 
        width={64} 
        height={64} 
      />
      <Text className={`text-lg mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        No events available
      </Text>
      <TouchableOpacity
        className="mt-4 px-6 py-3 bg-blue-500 rounded-lg"
        onPress={fetchEvents}
      >
        <Text className="text-white font-semibold">Retry</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View className={`flex-1 items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className={`mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Loading events...
        </Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.idEvent}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => navigation.navigate('Details', { event: item })}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3B82F6"
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;
