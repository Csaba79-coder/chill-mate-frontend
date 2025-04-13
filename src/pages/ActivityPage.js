import React, { useEffect, useState } from 'react';
import ActivityService from '../services/activityService';
import { useNavigate } from 'react-router-dom'; // a navigációhoz szükséges hook

function ActivityPage() {
    const [activities, setActivities] = useState([]);
    const [newName, setNewName] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [searchResultById, setSearchResultById] = useState(null);

    const navigate = useNavigate(); // a navigációs hook beállítása

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        const response = await ActivityService.getAllActivities();
        setActivities(response.data);
    };

    const handleCreate = async () => {
        await ActivityService.createActivity({ name: newName });
        setNewName('');
        fetchActivities();
    };

    const handleDelete = async (id) => {
        await ActivityService.deleteActivity(id);
        fetchActivities();
    };

    const handleSearch = async () => {
        // Töröljük az előző keresési eredményeket, mielőtt új keresést indítunk
        setSearchResult(null);
        setSearchResultById(null);

        const encodedSearchName = encodeURIComponent(searchName); // URL kódolás
        try {
            const response = await ActivityService.getActivityByName(encodedSearchName);
            if (response.data && response.data.name) {
                setSearchResult(response.data); // Ha van találat, azt megjelenítjük
            } else {
                setSearchResult({ error: 'Nincs ilyen activity.' }); // Ha nincs találat
            }
        } catch (err) {
            setSearchResult({ error: 'Nincs ilyen activity.' }); // Hiba kezelése
        }
        // Keresés után töröljük a kereső szöveget
        setSearchName('');
    };

    const handleSearchById = async () => {
        // Töröljük az előző keresési eredményeket, mielőtt új keresést indítunk
        setSearchResult(null);
        setSearchResultById(null);

        try {
            const response = await ActivityService.getActivityById(searchId);
            setSearchResultById(response.data);
        } catch (err) {
            setSearchResultById({ error: 'Nincs ilyen ID-vel rendelkező activity.' });
        }
        // Keresés után töröljük az ID kereső szöveget
        setSearchId('');
    };

    // Navigálás a főoldalra
    const goToHomePage = () => {
        navigate('/'); // Visszaviszi a főoldalra
    };

    return (
        <div style={{ padding: 20 }}>
            {/* Vissza a főoldalra gomb */}
            <button
                onClick={goToHomePage}
                style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                }}
            >
                Back to Main Page
            </button>

            <h2>Aktivitások kezelése</h2>

            {/* Új activity hozzáadása */}
            <div>
                <input
                    type="text"
                    placeholder="Új activity neve"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <button onClick={handleCreate}>Hozzáadás</button>
            </div>

            {/* Keresés név alapján */}
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

            {/* Keresés ID alapján */}
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

            {/* Activity lista */}
            <ul style={{ marginTop: 30 }}>
                {activities.map((activity) => (
                    <li key={activity.id}>
                        {activity.name} (ID: {activity.id})
                        <button onClick={() => handleDelete(activity.id)} style={{ marginLeft: 10 }}>
                            Törlés
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ActivityPage;
