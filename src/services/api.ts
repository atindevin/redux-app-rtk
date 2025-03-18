import axios, { AxiosResponse, AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Use environment variable for base URL
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Add custom logic before request is sent
    console.log('Request sent:', config.method, config.url);
    // Example: Add auth token if it exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Handle successful responses
    console.log('Response received:', response.status);
    return response;
  },
  (error: AxiosError) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      console.error('Unauthorized! Redirecting to login...');
      // Add redirect logic here if needed
    }
    return Promise.reject(error);
  }
);

interface User {
  id: number;
  name: string;
  email: string;
}

class ApiService {
  async getUsers(): Promise<User[]> {
    const response: AxiosResponse<User[]> = await api.get('/users');
    return response.data;
  }

  async getUser(id: number): Promise<User> {
    const response: AxiosResponse<User> = await api.get(`/users/${id}`);
    return response.data;
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const response: AxiosResponse<User> = await api.post('/users', user);
    return response.data;
  }
}

export default new ApiService();