import React, { useEffect, useState } from 'react';
import MovieService from '../services/movieService';

function MoviePage() {
    const [movies, setMovies] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [searchTitle, setSearchTitle] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [searchResultById, setSearchResultById] = useState(null);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        const response = await MovieService.getAllMovies();
        setMovies(response.data);
    };

    const handleCreate = async () => {
        setSearchResult(null);
        setSearchResultById(null);
        await MovieService.createMovie({ title: newTitle });
        setNewTitle('');
        fetchMovies();
    };

    const handleDelete = async (id) => {
        await MovieService.deleteMovie(id);
        fetchMovies();
    };

    const handleSearch = async () => {
        setSearchResult(null);
        setSearchResultById(null);

        const encodedSearchTitle = encodeURIComponent(searchTitle);
        try {
            const response = await MovieService.getMovieByTitle(encodedSearchTitle);
            if (response.data && response.data.title) {
                setSearchResult(response.data);
            } else {
                setSearchResult({ error: 'Nincs ilyen film.' });
            }
        } catch (err) {
            setSearchResult({ error: 'Nincs ilyen film.' });
        }
        setSearchTitle('');
    };

    const handleSearchById = async () => {
        setSearchResult(null);
        setSearchResultById(null);

        try {
            const response = await MovieService.getMovieById(searchId);
            setSearchResultById(response.data);
        } catch (err) {
            setSearchResultById({ error: 'Nincs ilyen ID-vel rendelkező film.' });
        }
        setSearchId('');
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Filmek kezelése</h2>

            <div>
                <input
                    type="text"
                    placeholder="Új film címe"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <button onClick={handleCreate}>Hozzáadás</button>
            </div>

            <div style={{ marginTop: 20 }}>
                <input
                    type="text"
                    placeholder="Keresés cím alapján"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
                <button onClick={handleSearch}>Keresés</button>

                {searchResult && (
                    <div>
                        {searchResult.error ? (
                            <p style={{ color: 'red' }}>{searchResult.error}</p>
                        ) : (
                            <p>Talált: {searchResult.title} (ID: {searchResult.id})</p>
                        )}
                    </div>
                )}
            </div>

            <div style={{ marginTop: 20 }}>
                <input
                    type="text"
                    placeholder="Keresés ID alapján"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <button onClick={handleSearchById}>Keresés ID</button>

                {searchResultById && (
                    <div>
                        {searchResultById.error ? (
                            <p style={{ color: 'red' }}>{searchResultById.error}</p>
                        ) : (
                            <p>Talált: {searchResultById.title} (ID: {searchResultById.id})</p>
                        )}
                    </div>
                )}
            </div>

            <div className="separator"></div>

            <ul id="entity-list" style={{ marginTop: 30 }}>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        {movie.title} (ID: {movie.id})
                        <button onClick={() => handleDelete(movie.id)} style={{ marginLeft: 10 }}>
                            Törlés
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MoviePage;
