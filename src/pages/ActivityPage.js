import React, { useEffect, useState } from 'react';
import ActivityService from '../services/activityService';

function ActivityPage() {
    const [activities, setActivities] = useState([]);
    const [newName, setNewName] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [searchResultById, setSearchResultById] = useState(null);

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        const response = await ActivityService.getAllActivities();
        setActivities(response.data);
    };

    const handleCreate = async () => {
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
        setSearchResult(null);
        setSearchResultById(null);

        const encodedSearchName = encodeURIComponent(searchName);
        try {
            const response = await ActivityService.getActivityByName(encodedSearchName);
            if (response.data && response.data.name) {
                setSearchResult(response.data);
            } else {
                setSearchResult({ error: 'Nincs ilyen esemény.' });
            }
        } catch (err) {
            setSearchResult({ error: 'Nincs ilyen esemény.' });
        }

        setSearchName('');
    };

    const handleSearchById = async () => {
        setSearchResult(null);
        setSearchResultById(null);

        try {
            const response = await ActivityService.getActivityById(searchId);
            setSearchResultById(response.data);
        } catch (err) {
            setSearchResultById({ error: 'Nincs ilyen ID-vel rendelkező esemény.' });
        }

        setSearchId('');
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Események kezelése</h2>

            <div>
                <input
                    type="text"
                    placeholder="Új esemény neve"
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

            <div className="separator"></div>

            <ul id="entity-list" style={{ marginTop: 30 }}>
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
