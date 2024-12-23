import axios from 'axios';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth.types';

// Update this URL to match your API endpoint
const API_URL = 'http://pruebareactjs.test-class.com/Api/api/Authenticate';

const handleApiError = (error: any) => {
  if (error.response) {
    console.error('API Error Response:', {
      status: error.response.status,
      data: error.response.data,
      headers: error.response.headers
    });
    throw new Error(error.response.data?.message || `Request failed with status ${error.response.status}`);
  } else if (error.request) {
    console.error('API Request Error:', error.request);
    throw new Error('No response received from server. Please check your internet connection.');
  } else {
    console.error('API Setup Error:', error.message);
    throw new Error('Failed to make the request. Please try again.');
  }
};

// Configure axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Transform credentials to match API expectations
      const loginData = {
        userName: credentials.username,
        password: credentials.password
      };

      console.log('Sending login request with data:', loginData);
      
      const response = await axios.post(`${API_URL}/login`, loginData);
      console.log('Login response:', response.data);
      
      const { data } = response;
      
      if (!data) {
        throw new Error('No data received from server');
      }

      // Handle the specific response format from your API
      if (!data.token || !data.userid || !data.username) {
        console.error('Invalid response structure:', data);
        throw new Error('Invalid response format from server');
      }

      return {
        token: data.token,
        user: {
          userId: data.userid,
          username: data.username
        }
      };
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  async register(credentials: RegisterCredentials): Promise<void> {
    try {
      // Transform credentials to match API expectations
      const registerData = {
        userName: credentials.username,
        email: credentials.email,
        password: credentials.password
      };

      console.log('Sending register request with data:', registerData);
      
      const response = await axios.post(`${API_URL}/register`, registerData);
      console.log('Register response:', response.data);
      
      if (!response.data) {
        throw new Error('Registration failed - no response data');
      }
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }
};
