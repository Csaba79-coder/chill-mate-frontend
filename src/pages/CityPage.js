import React, { useEffect, useState } from 'react';
import CityService from '../services/cityService'; // City service importálása
import { useNavigate } from 'react-router-dom';

function CityPage() {
    const [cities, setCities] = useState([]);
    const [newName, setNewName] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [searchResultById, setSearchResultById] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        const response = await CityService.getAllCities();
        setCities(response.data);
    };

    const handleCreate = async () => {
        await CityService.createCity({ name: newName });
        setNewName('');
        fetchCities();
    };

    const handleDelete = async (id) => {
        await CityService.deleteCity(id);
        fetchCities();
    };

    const handleSearch = async () => {
        setSearchResult(null);
        setSearchResultById(null);

        const encodedSearchName = encodeURIComponent(searchName);
        try {
            const response = await CityService.getCityByName(encodedSearchName);
            if (response.data && response.data.name) {
                setSearchResult(response.data);
            } else {
                setSearchResult({ error: 'Nincs ilyen város.' });
            }
        } catch (err) {
            setSearchResult({ error: 'Nincs ilyen város.' });
        }
        setSearchName('');
    };

    const handleSearchById = async () => {
        setSearchResult(null);
        setSearchResultById(null);

        try {
            const response = await CityService.getCityById(searchId);
            setSearchResultById(response.data);
        } catch (err) {
            setSearchResultById({ error: 'Nincs ilyen ID-vel rendelkező város.' });
        }
        setSearchId('');
    };

    const goToHomePage = () => {
        navigate('/');
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Városok kezelése</h2>

            <div>
                <input
                    type="text"
                    placeholder="Új város neve"
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
                {cities.map((city) => (
                    <li key={city.id}>
                        {city.name} (ID: {city.id})
                        <button onClick={() => handleDelete(city.id)} style={{ marginLeft: 10 }}>
                            Törlés
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CityPage;
