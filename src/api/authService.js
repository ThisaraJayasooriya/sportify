import axios from 'axios';

const AUTH_API_URL = 'https://dummyjson.com/auth';

/**
 * Authenticate user with DummyJSON API
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {Promise} Authentication response with token and user data
 */
export const login = async (username, password) => {
  try {
    console.log('Attempting login with:', username);
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
      error: error.response?.data?.message || error.message || 'Login failed. Please try again.',
    };
  }
};

/**
 * Register user (mock implementation for demo)
 * Note: DummyJSON doesn't have a real register endpoint
 * @param {string} username - User's username
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} Registration response
 */
export const register = async (username, email, password) => {
  try {
    // Simulating registration since DummyJSON doesn't have this endpoint
    // In production, you'd call a real registration API
    return {
      success: true,
      message: 'Registration successful! Please login with your credentials.',
      data: {
        username,
        email,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: 'Registration failed. Please try again.',
    };
  }
};
