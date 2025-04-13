import api from './api'; // vagy axios.create()

const HobbyService = {
    getAllHobbies: () => api.get('/hobbies'),
    getHobbyById: (id) => api.get(`/hobbies/hobby-by-id/${id}`),
    getHobbyByName: (name) => api.get(`/hobbies/hobby-by-name/${name}`),
    createHobby: (data) => api.post('/hobbies', data),
    deleteHobby: (id) => api.delete(`/hobbies/${id}`),
};

export default HobbyService;
