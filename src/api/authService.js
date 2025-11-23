import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_API_URL = 'https://dummyjson.com/auth';

/**
 * Get registered users from local storage
 */
const getRegisteredUsers = async () => {
  try {
    const users = await AsyncStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  } catch (error) {
    return [];
  }
};

/**
 * Save registered user to local storage
 */
const saveRegisteredUser = async (user) => {
  try {
    const users = await getRegisteredUsers();
    users.push(user);
    await AsyncStorage.setItem('registeredUsers', JSON.stringify(users));
  } catch (error) {
    console.log('Error saving user:', error);
  }
};

/**
 * Authenticate user with DummyJSON API or local registered users
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {Promise} Authentication response with token and user data
 */
export const login = async (username, password) => {
  try {
    console.log('Attempting login with:', username);
    
    // First, check if user is registered locally
    const registeredUsers = await getRegisteredUsers();
    const localUser = registeredUsers.find(
      u => u.username === username && u.password === password
    );
    
    if (localUser) {
      // Generate a simple token for local user
      const token = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      console.log('Local user login successful');
      return {
        success: true,
        data: {
          ...localUser,
          accessToken: token,
          token: token,
        },
      };
    }
    
    // If not found locally, try DummyJSON API
    const response = await axios.post(`${AUTH_API_URL}/login`, {
      username,
      password,
    });
    console.log('Login response:', response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.log('Login error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Invalid credentials. Please try again.',
    };
  }
};

/**
 * Register user and store locally
 * @param {string} username - User's username
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} Registration response
 */
export const register = async (username, email, password) => {
  try {
    console.log('Attempting registration with:', username, email);
    
    // Check if username already exists
    const registeredUsers = await getRegisteredUsers();
    const existingUser = registeredUsers.find(u => u.username === username || u.email === email);
    
    if (existingUser) {
      return {
        success: false,
        error: 'Username or email already exists. Please use different credentials.',
      };
    }
    
    // Create user object
    const newUser = {
      id: Date.now(),
      username,
      email,
      password, // In production, never store plain passwords!
      firstName: username,
      lastName: 'User',
      image: `https://ui-avatars.com/api/?name=${username}&background=3B82F6&color=fff`,
      gender: '',
      phone: '',
      birthDate: '',
    };
    
    // Save to local storage
    await saveRegisteredUser(newUser);
    
    console.log('Registration successful for:', username);
    
    return {
      success: true,
      message: 'Registration successful! You can now login with your credentials.',
      data: {
        username: newUser.username,
        email: newUser.email,
        id: newUser.id,
      },
    };
  } catch (error) {
    console.log('Registration error:', error.message);
    return {
      success: false,
      error: error.message || 'Registration failed. Please try again.',
    };
  }
};
