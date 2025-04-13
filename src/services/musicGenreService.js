import api from "./api";

const MusicGenreService = {
    getAllGenres: () => api.get('/music-genres'),
    getGenreById: (id) => api.get(`/music-genres/music-genre-by-id/${id}`),
    getGenreByName: (name) => api.get(`/music-genres/music-genre-by-name/${encodeURIComponent(name)}`),
    createGenre: (data) => api.post('/music-genres', data),
    deleteGenre: (id) => api.delete(`/music-genres/${id}`),
};

export default MusicGenreService;
