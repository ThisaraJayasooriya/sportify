import axios from 'axios';

const SPORTS_API_URL = 'https://www.thesportsdb.com/api/v1/json/3';

/**
 * Fetch upcoming sports events
 * @returns {Promise} List of upcoming sports events
 */
export const getUpcomingEvents = async () => {
  try {
    // Get events from multiple sports leagues for variety
    const response = await axios.get(`${SPORTS_API_URL}/eventsseason.php?id=4328&s=2024-2025`);
    return {
      success: true,
      data: response.data.events || [],
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch sports events',
      data: [],
    };
  }
};

/**
 * Fetch past events (for demo purposes)
 * @returns {Promise} List of past sports events
 */
export const getPastEvents = async () => {
  try {
    const response = await axios.get(`${SPORTS_API_URL}/eventspastleague.php?id=4328`);
    return {
      success: true,
      data: response.data.events || [],
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch past events',
      data: [],
    };
  }
};

/**
 * Search for events by keyword
 * @param {string} query - Search query
 * @returns {Promise} Search results
 */
export const searchEvents = async (query) => {
  try {
    const response = await axios.get(`${SPORTS_API_URL}/searchevents.php?e=${query}`);
    return {
      success: true,
      data: response.data.event || [],
    };
  } catch (error) {
    return {
      success: false,
      error: 'Search failed',
      data: [],
    };
  }
};

/**
 * Get event details by ID
 * @param {string} eventId - Event ID
 * @returns {Promise} Event details
 */
export const getEventDetails = async (eventId) => {
  try {
    const response = await axios.get(`${SPORTS_API_URL}/lookupevent.php?id=${eventId}`);
    return {
      success: true,
      data: response.data.events?.[0] || null,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch event details',
      data: null,
    };
  }
};

/**
 * Get team details
 * @param {string} teamId - Team ID
 * @returns {Promise} Team details
 */
export const getTeamDetails = async (teamId) => {
  try {
    const response = await axios.get(`${SPORTS_API_URL}/lookupteam.php?id=${teamId}`);
    return {
      success: true,
      data: response.data.teams?.[0] || null,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch team details',
      data: null,
    };
  }
};
