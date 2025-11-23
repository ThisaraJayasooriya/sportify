/**
 * Application constants and configuration
 */

// API Endpoints
export const API_CONFIG = {
  AUTH_BASE_URL: 'https://dummyjson.com/auth',
  SPORTS_BASE_URL: 'https://www.thesportsdb.com/api/v1/json/3',
};

// AsyncStorage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'user',
  FAVOURITES: 'favourites',
  THEME: 'isDarkMode',
};

// Color Palette
export const COLORS = {
  // Primary Colors
  primary: '#3B82F6',
  primaryDark: '#2563EB',
  
  // Background Colors - Light Mode
  bgLight: '#F9FAFB',
  cardLight: '#FFFFFF',
  
  // Background Colors - Dark Mode
  bgDark: '#111827',
  cardDark: '#1F2937',
  
  // Text Colors - Light Mode
  textPrimaryLight: '#1F2937',
  textSecondaryLight: '#6B7280',
  
  // Text Colors - Dark Mode
  textPrimaryDark: '#FFFFFF',
  textSecondaryDark: '#9CA3AF',
  
  // Status Colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Border Colors
  borderLight: '#E5E7EB',
  borderDark: '#374151',
};

// App Metadata
export const APP_INFO = {
  name: 'Sports & Lifestyle',
  version: '1.0.0',
  description: 'Track your favorite sports events',
};

// Demo Credentials
export const DEMO_USERS = [
  { username: 'emilys', password: 'emilyspass' },
  { username: 'michaelw', password: 'michaelwpass' },
  { username: 'sophiab', password: 'sophiabpass' },
];

// Validation Rules
export const VALIDATION = {
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 20,
  PASSWORD_MIN_LENGTH: 4,
  EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
};

// Navigation Routes
export const ROUTES = {
  // Auth Stack
  LOGIN: 'Login',
  REGISTER: 'Register',
  
  // Main Stack
  MAIN_APP: 'MainApp',
  DETAILS: 'Details',
  
  // Bottom Tabs
  HOME: 'Home',
  FAVOURITES: 'Favourites',
  PROFILE: 'Profile',
};

// Tab Icons
export const TAB_ICONS = {
  HOME: 'home',
  FAVOURITES: 'heart',
  PROFILE: 'user',
};

// Event Status
export const EVENT_STATUS = {
  UPCOMING: 'Not Started',
  LIVE: 'Match Live',
  FINISHED: 'Match Finished',
  POSTPONED: 'Match Postponed',
};

// API Response Messages
export const MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGIN_FAILED: 'Login failed. Please try again.',
  LOGOUT_CONFIRM: 'Are you sure you want to logout?',
  FAVOURITE_ADDED: 'Event added to favourites',
  FAVOURITE_REMOVED: 'Event removed from favourites',
  REGISTRATION_SUCCESS: 'Registration successful! Please login with your credentials.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  LOADING_EVENTS: 'Loading events...',
  NO_EVENTS: 'No events available',
};

export default {
  API_CONFIG,
  STORAGE_KEYS,
  COLORS,
  APP_INFO,
  DEMO_USERS,
  VALIDATION,
  ROUTES,
  TAB_ICONS,
  EVENT_STATUS,
  MESSAGES,
};
