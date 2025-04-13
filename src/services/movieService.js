import api from './api';

const MovieService = {
    getAllMovies: () => api.get('/movies'),
    getMovieById: (id) => api.get(`/movies/movie-by-id/${id}`),
    getMovieByTitle: (title) => api.get(`/movies/movie-by-name/${title}`),
    createMovie: (data) => api.post('/movies', data),
    deleteMovie: (id) => api.delete(`/movies/${id}`),
};

export default MovieService;
