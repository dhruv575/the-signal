// API Configuration
const API_CONFIG = {
  // Base URL for the API - can be easily changed for different environments
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  
  // API endpoints
  ENDPOINTS: {
    TEAM: '/api/notion/team',
    TEAM_MEMBER: (id) => `/api/notion/team/${id}`,
    DATABASE_INFO: '/api/notion/database-info',
    HEALTH: '/health'
  },
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
  
  // Default headers
  HEADERS: {
    'Content-Type': 'application/json',
  }
};

/**
 * Generic API request function with error handling
 * @param {string} endpoint - API endpoint to call
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<any>} API response data
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const config = {
    method: 'GET',
    headers: {
      ...API_CONFIG.HEADERS,
      ...options.headers,
    },
    ...options,
  };

  // Add timeout using AbortController
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
  config.signal = controller.signal;

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - please check your connection');
    }
    
    // Network error or other issues
    if (!navigator.onLine) {
      throw new Error('No internet connection available');
    }
    
    // Re-throw with more context
    throw new Error(`API Error: ${error.message}`);
  }
};

/**
 * API service object with all available endpoints
 */
export const api = {
  // Health check endpoint
  health: () => apiRequest(API_CONFIG.ENDPOINTS.HEALTH),
  
  // Team-related endpoints
  team: {
    // Get all team members
    getAll: () => apiRequest(API_CONFIG.ENDPOINTS.TEAM),
    
    // Get specific team member by ID
    getById: (id) => apiRequest(API_CONFIG.ENDPOINTS.TEAM_MEMBER(id)),
  },
  
  // Database info endpoint (useful for debugging)
  getDatabaseInfo: () => apiRequest(API_CONFIG.ENDPOINTS.DATABASE_INFO),
};

/**
 * Team data service with fallback to local JSON
 */
export const teamService = {
  /**
   * Get team data from API with fallback to local JSON
   * @returns {Promise<Array>} Array of team members
   */
  getTeamData: async () => {
    try {
      console.log('🔄 Attempting to fetch team data from API...');
      const response = await api.team.getAll();
      
      if (response.success && Array.isArray(response.data)) {
        console.log('✅ Successfully loaded team data from API (Notion database)');
        console.log(`📊 Retrieved ${response.data.length} team members from Notion`);
        return response.data;
      }
      
      throw new Error('Invalid API response format');
    } catch (error) {
      console.warn('❌ Failed to fetch team data from API:', error.message);
      console.log('🔄 Falling back to local team data...');
      
      // Fallback to local JSON file
      try {
        const localTeamData = await import('../Data/team.json');
        console.log('✅ Successfully loaded team data from local backup file');
        console.log(`📊 Retrieved ${localTeamData.default.length} team members from local JSON`);
        return localTeamData.default;
      } catch (fallbackError) {
        console.error('❌ Failed to load fallback team data:', fallbackError);
        throw new Error('Unable to load team data from API or local source');
      }
    }
  },
  
  /**
   * Get specific team member by ID
   * @param {string} id - Team member ID
   * @returns {Promise<Object>} Team member data
   */
  getTeamMember: async (id) => {
    try {
      const response = await api.team.getById(id);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error('Team member not found');
    } catch (error) {
      console.error('Failed to fetch team member:', error.message);
      throw error;
    }
  }
};

/**
 * Utility function to check if API is available
 * @returns {Promise<boolean>} True if API is reachable
 */
export const checkApiHealth = async () => {
  try {
    const response = await api.health();
    return response.status === 'OK';
  } catch (error) {
    console.warn('API health check failed:', error.message);
    return false;
  }
};

// Export API config for use in other parts of the app
export { API_CONFIG };

// Default export
export default api;
