import axios from 'axios'
import store from '@/store'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

// Request interceptor
api.interceptors.request.use(
    config => {
        // store.dispatch('startLoading');
        const token = localStorage.getItem('token');
        if (token) {
            const username = 'client';
            const base64Encoded = btoa(`${username}:${token}`);
            config.headers.Authorization = `Basic ${base64Encoded}`;
        }
        return config;
    },
    error => {
        // store.dispatch('stopLoading');
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    response => {
        // store.dispatch('stopLoading')
        return response
    },
    error => {
        // store.dispatch('stopLoading')
        if (error.response?.status === 401) {
            store.dispatch('auth/logout')
        }
        return Promise.reject(error)
    }
)


export default api