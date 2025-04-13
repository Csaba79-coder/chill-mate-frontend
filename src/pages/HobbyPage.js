import React, { useEffect, useState } from 'react';
import HobbyService from '../services/hobbyService';
import { useNavigate } from 'react-router-dom';

function HobbyPage() {
    const [hobbies, setHobbies] = useState([]);
    const [newName, setNewName] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [searchResultById, setSearchResultById] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchHobbies();
    }, []);

    const fetchHobbies = async () => {
        const response = await HobbyService.getAllHobbies();
        setHobbies(response.data);
    };

    const handleCreate = async () => {
        await HobbyService.createHobby({ name: newName });
        setNewName('');
        fetchHobbies();
    };

    const handleDelete = async (id) => {
        await HobbyService.deleteHobby(id);
        fetchHobbies();
    };

    const handleSearch = async () => {
        setSearchResult(null);
        setSearchResultById(null);

        const encodedSearchName = encodeURIComponent(searchName);
        try {
            const response = await HobbyService.getHobbyByName(encodedSearchName);
            if (response.data && response.data.name) {
                setSearchResult(response.data);
            } else {
                setSearchResult({ error: 'Nincs ilyen hobbi.' });
            }
        } catch (err) {
            setSearchResult({ error: 'Nincs ilyen hobbi.' });
        }
        setSearchName('');
    };

    const handleSearchById = async () => {
        setSearchResult(null);
        setSearchResultById(null);

        try {
            const response = await HobbyService.getHobbyById(searchId);
            setSearchResultById(response.data);
        } catch (err) {
            setSearchResultById({ error: 'Nincs ilyen ID-vel rendelkező hobbi.' });
        }
        setSearchId('');
    };

    const goToHomePage = () => {
        navigate('/');
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Hobbi kezelés</h2>

            <div>
                <input
                    type="text"
                    placeholder="Új hobbi neve"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <button onClick={handleCreate}>Hozzáadás</button>
            </div>

            <div style={{ marginTop: 20 }}>
                <input
                    type="text"
                    placeholder="Keresés név alapján"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <button onClick={handleSearch}>Keresés</button>

                {searchResult && (
                    <div>
                        {searchResult.error ? (
                            <p style={{ color: 'red' }}>{searchResult.error}</p>
                        ) : (
                            <p>Talált: {searchResult.name} (ID: {searchResult.id})</p>
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
                            <p>Talált: {searchResultById.name} (ID: {searchResultById.id})</p>
                        )}
                    </div>
                )}
            </div>

            <ul style={{ marginTop: 30 }}>
                {hobbies.map((hobby) => (
                    <li key={hobby.id}>
                        {hobby.name} (ID: {hobby.id})
                        <button onClick={() => handleDelete(hobby.id)} style={{ marginLeft: 10 }}>
                            Törlés
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HobbyPage;
