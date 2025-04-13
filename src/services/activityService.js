import api from './api'; // vagy axios.create, ha máshol van a beállítás

const ActivityService = {
    getAllActivities: () => api.get('/activities'),
    getActivityById: (id) => api.get(`/activities/activity-by-id/${id}`),
    getActivityByName: (name) => api.get(`/activities/activity-by-name/${name}`),
    createActivity: (data) => api.post('/activities', data),
    deleteActivity: (id) => api.delete(`/activities/${id}`),
};

export default ActivityService;
