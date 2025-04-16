import React, { useEffect, useState } from 'react';
import MusicGenreService from '../services/musicGenreService';
import { useNavigate } from 'react-router-dom';

function MusicGenrePage() {
    const [genres, setGenres] = useState([]);
    const [newGenre, setNewGenre] = useState('');
    const [searchGenre, setSearchGenre] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [searchResultById, setSearchResultById] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        const response = await MusicGenreService.getAllGenres();
        setGenres(response.data);
    };

    const handleCreate = async () => {
        setSearchResult(null);
        setSearchResultById(null);
        await MusicGenreService.createGenre({ genre: newGenre });
        setNewGenre('');
        fetchGenres();
    };

    const handleDelete = async (id) => {
        await MusicGenreService.deleteGenre(id);
        fetchGenres();
    };

    const handleSearch = async () => {
        setSearchResult(null);
        setSearchResultById(null);

        const encodedSearchGenre = encodeURIComponent(searchGenre);
        try {
            const response = await MusicGenreService.getGenreByName(encodedSearchGenre);
            if (response.data && response.data.genre) {
                setSearchResult(response.data);
            } else {
                setSearchResult({ error: 'Nincs ilyen műfaj.' });
            }
        } catch (err) {
            setSearchResult({ error: 'Nincs ilyen műfaj.' });
        }
        setSearchGenre('');
    };

    const handleSearchById = async () => {
        setSearchResult(null);
        setSearchResultById(null);

        try {
            const response = await MusicGenreService.getGenreById(searchId);
            setSearchResultById(response.data);
        } catch (err) {
            setSearchResultById({ error: 'Nincs ilyen ID-vel rendelkező műfaj.' });
        }
        setSearchId('');
    };

    const goToHomePage = () => {
        navigate('/');
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Zenei műfajok kezelése</h2>

            <div>
                <input
                    type="text"
                    placeholder="Új műfaj neve"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                />
                <button onClick={handleCreate}>Hozzáadás</button>
            </div>

            <div style={{ marginTop: 20 }}>
                <input
                    type="text"
                    placeholder="Keresés műfaj alapján"
                    value={searchGenre}
                    onChange={(e) => setSearchGenre(e.target.value)}
                />
                <button onClick={handleSearch}>Keresés</button>

                {searchResult && (
                    <div>
                        {searchResult.error ? (
                            <p style={{ color: 'red' }}>{searchResult.error}</p>
                        ) : (
                            <p>Talált: {searchResult.genre} (ID: {searchResult.id})</p>
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
                            <p>Talált: {searchResultById.genre} (ID: {searchResultById.id})</p>
                        )}
                    </div>
                )}
            </div>

            <div className="separator"></div>

            <ul id="entity-list" style={{ marginTop: 30 }}>
                {genres.map((genre) => (
                    <li key={genre.id}>
                        {genre.genre} (ID: {genre.id})
                        <button onClick={() => handleDelete(genre.id)} style={{ marginLeft: 10 }}>
                            Törlés
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MusicGenrePage;
