import api from './api';

const UserService = {
    getAllUsers: () => api.get('/users'),
    createUser: (data) => api.post('/users', data),
    getUserById: (id) => api.get(`/users/user-by-id/${id}`),
    deleteUser: (id) => api.delete(`/users/${id}`),
    searchByName: (name) => api.get(`/users/user-by-name/${name}`),
};

export default UserService