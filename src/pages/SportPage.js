import React, { useEffect, useState } from 'react';
import SportService from '../services/sportService'

function SportPage() {
    const [sports, setSports] = useState([]);
    const [newName, setNewName] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [searchResultById, setSearchResultById] = useState(null);

    useEffect(() => {
        fetchSports();
    }, []);

    const fetchSports = async () => {
        const response = await SportService.getAllSports();
        setSports(response.data);
    };

    const handleCreate = async () => {
        setSearchResult(null);
        setSearchResultById(null);
        await SportService.createSport({ name: newName });
        setNewName('');
        fetchSports();
    };

    const handleDelete = async (id) => {
        await SportService.deleteSport(id);
        fetchSports();
    };

    const handleSearch = async () => {
        setSearchResult(null);
        setSearchResultById(null);

        const encodedSearchName = encodeURIComponent(searchName);
        try {
            const response = await SportService.getSportByName(encodedSearchName);
            if (response.data && response.data.name) {
                setSearchResult(response.data);
            } else {
                setSearchResult({ error: 'Nincs ilyen sport.' });
            }
        } catch (err) {
            setSearchResult({ error: 'Nincs ilyen sport.' });
        }
        setSearchName('');
    };

    const handleSearchById = async () => {
        setSearchResult(null);
        setSearchResultById(null);

        try {
            const response = await SportService.getSportById(searchId);
            setSearchResultById(response.data);
        } catch (err) {
            setSearchResultById({ error: 'Nincs ilyen ID-vel rendelkező sport.' });
        }
        setSearchId('');
    };

    return (
        <div style={{padding: 20}}>
            <h2>Sportok kezelése</h2>

            <div>
                <input
                    type="text"
                    placeholder="Új sport neve"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <button onClick={handleCreate}>Hozzáadás</button>
            </div>

            <div style={{marginTop: 20}}>
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
                            <p style={{color: 'red'}}>{searchResult.error}</p>
                        ) : (
                            <p>Talált: {searchResult.name} (ID: {searchResult.id})</p>
                        )}
                    </div>
                )}
            </div>

            <div style={{marginTop: 20}}>
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
                            <p style={{color: 'red'}}>{searchResultById.error}</p>
                        ) : (
                            <p>Talált: {searchResultById.name} (ID: {searchResultById.id})</p>
                        )}
                    </div>
                )}
            </div>

            <div className="separator"></div>

            <ul id="entity-list" style={{marginTop: 30}}>
                {sports.map((sport) => (
                    <li key={sport.id}>
                        {sport.name} (ID: {sport.id})
                        <button onClick={() => handleDelete(sport.id)} style={{marginLeft: 10}}>
                            Törlés
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SportPage;
