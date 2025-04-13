import api from './api';

const SportService = {
    getAllSports: () => api.get('/sports'),
    getSportById: (id) => api.get(`/sports/sport-by-id/${id}`),
    getSportByName: (name) => api.get(`/sports/sport-by-name/${name}`),
    createSport: (data) => api.post('/sports', data),
    deleteSport: (id) => api.delete(`/sports/${id}`),
};

export default SportService;
