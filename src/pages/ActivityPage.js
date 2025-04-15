import React, { useEffect, useState } from 'react';
import ActivityService from '../services/activityService';
import { useNavigate } from 'react-router-dom';

function ActivityPage() {
    const [activities, setActivities] = useState([]);
    const [newName, setNewName] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [searchResultById, setSearchResultById] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        const response = await ActivityService.getAllActivities();
        setActivities(response.data);
    };

    const handleCreate = async () => {
        // Töröljük a keresési eredményeket, amikor új tevékenységet adunk hozzá
        setSearchResult(null);
        setSearchResultById(null);

        await ActivityService.createActivity({ name: newName });
        setNewName('');
        fetchActivities();
    };

    const handleDelete = async (id) => {
        await ActivityService.deleteActivity(id);
        fetchActivities();
    };

    const handleSearch = async () => {
        setSearchResult(null); // Töröljük az előző keresési eredményt
        setSearchResultById(null); // Töröljük az ID szerinti keresési eredményt

        const encodedSearchName = encodeURIComponent(searchName);
        try {
            const response = await ActivityService.getActivityByName(encodedSearchName);
            if (response.data && response.data.name) {
                setSearchResult(response.data);
            } else {
                setSearchResult({ error: 'Nincs ilyen foglalkozás.' });
            }
        } catch (err) {
            setSearchResult({ error: 'Nincs ilyen foglalkozás.' });
        }

        setSearchName(''); // Keresés után töröljük a kereső szöveget
    };

    const handleSearchById = async () => {
        setSearchResult(null); // Töröljük az előző keresési eredményt
        setSearchResultById(null); // Töröljük az ID szerinti keresési eredményt

        try {
            const response = await ActivityService.getActivityById(searchId);
            setSearchResultById(response.data);
        } catch (err) {
            setSearchResultById({ error: 'Nincs ilyen ID-vel rendelkező foglalkozás.' });
        }

        setSearchId(''); // Keresés után töröljük az ID kereső szöveget
    };

    const goToHomePage = () => {
        navigate('/');
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Tevékenységek kezelése</h2>

            <div>
                <input
                    type="text"
                    placeholder="Új foglalkozás neve"
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
                    onChange={(e) => setSearchName(e.target.value)} // Csak a változást kezeljük, nem töröljük a mezőt
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
                    onChange={(e) => setSearchId(e.target.value)} // Csak a változást kezeljük, nem töröljük a mezőt
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
