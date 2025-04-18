import api from './api';

const RelationService = {
    getAllUsersForGraph: () => api.get('/connections'),
};

export default RelationService