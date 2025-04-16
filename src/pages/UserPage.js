import React, { useEffect, useState } from 'react';
import UserService from '../services/userService';

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ firstName: '', midName: '', lastName: '' });
    const [searchName, setSearchName] = useState('');
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchResultById, setSearchResultById] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await UserService.getAllUsers();
            setUsers(response.data);
        } catch (err) {
            console.error('Felhasználók lekérdezési hiba:', err);
        }
    };

    const handleCreate = async (event) => {
        event.preventDefault();
        setSearchResult(null);
        setSearchResultById(null);

        try {
            await UserService.createUser(newUser);
            setNewUser({ firstName: '', midName: '', lastName: '' });
            fetchUsers();
        } catch (err) {
            console.error('Új felhasználó létrehozási hiba:', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Biztosan törlöd ezt a felhasználót?")) return;
        try {
            await UserService.deleteUser(id);
            fetchUsers();
        } catch (err) {
            console.error('Felhasználó törlés hiba:', err);
        }
    };

    const handleSearch = async () => {
        setSearchResult(null);
        setSearchResultById(null);
        try {
            const response = await UserService.searchByName(searchName);
            setSearchResult(response.data);  // A válaszban jönnek a találatok
        } catch (err) {
            setSearchResult({ error: 'Nincs ilyen nevű felhasználó.' });
            console.error('Keresési hiba:', err);
        }
        setSearchName('');
    };

    const handleSearchById = async () => {
        setSearchResult(null);
        setSearchResultById(null);
        try {
            const response = await UserService.getUserById(searchId);
            setSearchResultById(response.data);
        } catch (err) {
            setSearchResultById({ error: 'Nincs ilyen ID-vel rendelkező felhasználó.' });
            console.error('Keresés ID alapján hiba:', err);
        }
        setSearchId('');
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Felhasználók kezelése</h2>

            <div>
                <h3>Új felhasználó hozzáadása</h3>
                <form onSubmit={handleCreate}>
                    <input
                        type="text"
                        placeholder="Keresztnév"
                        value={newUser.firstName}
                        onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Középső név"
                        value={newUser.midName}
                        onChange={(e) => setNewUser({ ...newUser, midName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Vezetéknév"
                        value={newUser.lastName}
                        onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                    />
                    <button type="submit">Hozzáadás</button>
                </form>
            </div>

            <div style={{ marginTop: 20 }}>
                <h3>Keresés név alapján</h3>
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
                            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                                {searchResult.map((user) => (
                                    <li key={user.id}>
                                        {user.firstName} {user.midName} {user.lastName} (ID: {user.id})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>

            <div style={{ marginTop: 20 }}>
                <h3>Keresés ID alapján</h3>
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
                            <p>Talált: {searchResultById.firstName} {searchResultById.midName} {searchResultById.lastName} (ID: {searchResultById.id})</p>
                        )}
                    </div>
                )}
            </div>

            <div className="separator" style={{ marginTop: 30 }}></div>

            {/* Táblázat a felhasználók listázásához */}
            <table style={{ marginTop: 30, width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Keresztnév</th>
                    <th>Középső név</th>
                    <th>Vezetéknév</th>
                    <th>Akciók</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.midName}</td>
                        <td>{user.lastName}</td>
                        <td>
                            <button onClick={() => handleDelete(user.id)}>
                                Törlés
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersPage;
