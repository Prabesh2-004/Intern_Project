import axios from "axios";

const backendUrl = 'http://localhost:5000';

export const api = axios.create({
    baseURL: backendUrl+'/api',
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers['auth-token'] = token;
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
},
(error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;