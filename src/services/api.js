import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // állítsd be, ha máshol fut
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
