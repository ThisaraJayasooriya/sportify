import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage utility functions for AsyncStorage operations
 */

// Auth Token Management
export const storeAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Error storing auth token:', error);
  }
};

export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};

// User Data Management
export const storeUserData = async (userData) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error) {
    console.error('Error removing user data:', error);
  }
};

// Favourites Management
export const storeFavourites = async (favourites) => {
  try {
    await AsyncStorage.setItem('favourites', JSON.stringify(favourites));
  } catch (error) {
    console.error('Error storing favourites:', error);
  }
};

export const getFavourites = async () => {
  try {
    const favourites = await AsyncStorage.getItem('favourites');
    return favourites ? JSON.parse(favourites) : [];
  } catch (error) {
    console.error('Error getting favourites:', error);
    return [];
  }
};

export const removeFavourites = async () => {
  try {
    await AsyncStorage.removeItem('favourites');
  } catch (error) {
    console.error('Error removing favourites:', error);
  }
};

// Theme Management
export const storeThemePreference = async (isDarkMode) => {
  try {
    await AsyncStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  } catch (error) {
    console.error('Error storing theme preference:', error);
  }
};

export const getThemePreference = async () => {
  try {
    const theme = await AsyncStorage.getItem('isDarkMode');
    return theme ? JSON.parse(theme) : false;
  } catch (error) {
    console.error('Error getting theme preference:', error);
    return false;
  }
};

// Clear All Data (for logout)
export const clearAllStorage = async () => {
  try {
    await AsyncStorage.multiRemove(['authToken', 'user', 'favourites', 'isDarkMode']);
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};

export default {
  storeAuthToken,
  getAuthToken,
  removeAuthToken,
  storeUserData,
  getUserData,
  removeUserData,
  storeFavourites,
  getFavourites,
  removeFavourites,
  storeThemePreference,
  getThemePreference,
  clearAllStorage,
};
