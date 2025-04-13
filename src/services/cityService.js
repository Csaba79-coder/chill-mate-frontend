import api from './api';

const CityService = {
    getAllCities: () => api.get('/cities'),
    getCityById: (id) => api.get(`/cities/city-by-id/${id}`),
    getCityByName: (name) => api.get(`/cities/city-by-name/${name}`),
    createCity: (data) => api.post('/cities', data),
    deleteCity: (id) => api.delete(`/cities/${id}`),
};

export default CityService;
