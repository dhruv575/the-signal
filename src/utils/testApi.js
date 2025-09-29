// Utility to test API connection
import { checkApiHealth, teamService } from '../services/api';

/**
 * Test the API connection and team data fetching
 * Use this in the browser console to debug API issues
 */
export const testApiConnection = async () => {
  console.log('🔍 ===== API CONNECTION TEST =====');
  console.log('🔍 Testing API connection...');
  
  try {
    // Test health endpoint
    const isHealthy = await checkApiHealth();
    console.log(`${isHealthy ? '✅' : '❌'} API Health Check: ${isHealthy ? 'PASS' : 'FAIL'}`);
    
    if (!isHealthy) {
      console.log('❌ API is not responding. Make sure your backend is running on http://localhost:5000');
      console.log('🔄 Testing fallback to local data...');
      
      // Test fallback
      const teamData = await teamService.getTeamData();
      console.log('🎉 Fallback test completed successfully!');
      return { healthy: false, fallbackWorking: true, teamCount: teamData.length };
    }
    
    // Test team data
    console.log('📋 Testing team data fetch from API...');
    const teamData = await teamService.getTeamData();
    console.log(`✅ Team Data: Retrieved ${teamData.length} team members`);
    console.log('📝 Team data sample:', teamData[0]);
    
    console.log('🎉 All API tests passed!');
    return { healthy: true, teamCount: teamData.length };
    
  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
    console.log('💡 This is normal if your backend is not running yet');
    return { healthy: false, error: error.message };
  }
};

// Export for manual testing
window.testApi = testApiConnection;
