import React, { useEffect, useState } from 'react';
import UserService from '../services/userService';
import Modal from 'react-modal';

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ firstName: '', midName: '', lastName: '' });
    const [searchName, setSearchName] = useState('');
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchResultById, setSearchResultById] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [userDetailsModal, setUserDetailsModal] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    const [city, setCity] = useState('');
    const [hobby, setHobby] = useState('');
    const [sport, setSport] = useState('');
    const [music, setMusic] = useState('');
    const [movie, setMovie] = useState('');
    const [event, setEvent] = useState('');
    const [friendFirstName, setFriendFirstName] = useState('');
    const [friendMidName, setFriendMidName] = useState('');
    const [friendLastName, setFriendLastName] = useState('');

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
            setSearchResult(response.data);
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

    const openModal = (userId) => {
        setSelectedUserId(userId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCity('');
        setHobby('');
        setSport('');
        setMusic('');
        setMovie('');
        setEvent('');
        setFriendFirstName('');
        setFriendMidName('');
        setFriendLastName('');
    };

    const handleAddConnections = async () => {
        if (!city && !hobby && !sport && !music && !movie && !event && !friendFirstName && !friendMidName && !friendLastName) {
            alert("Legalább egy mezőt ki kell tölteni!");
            return;
        }

        const data = {};

        if (city) data.city = city;
        if (hobby) data.hobby = hobby;
        if (sport) data.sport = sport;
        if (music) data.music = music;
        if (movie) data.movie = movie;
        if (event) data.event = event;
        if (friendFirstName) data.friendFirstName = friendFirstName;
        if (friendMidName) data.friendMidName = friendMidName;
        if (friendLastName) data.friendLastName = friendLastName;

        console.log('Küldött adatok:', data);

        try {
            await UserService.addConnectionsToUser(selectedUserId, data);
            fetchUsers();
            closeModal();
        } catch (err) {
            console.error('Kapcsolatok mentési hiba:', err);
        }
    };

    const handleUserDetails = async (id) => {
        try {
            const response = await UserService.getUserDetailedById(id);
            setUserDetails(response.data);
            setUserDetailsModal(true);
        } catch (error) {
            console.error("Hiba a felhasználó adatainak lekérésekor:", error);
        }
    };

    const closeUserDetailsModal = () => {
        setUserDetailsModal(false);
        setUserDetails({});
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
                            <button onClick={() => openModal(user.id)}>Kapcsolatok</button>
                            <button onClick={() => handleUserDetails(user.id)} style={{ marginLeft: '10px' }}>Megtekintés</button>
                            <button onClick={() => handleDelete(user.id)} style={{ marginLeft: '10px' }}>Törlés</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {userDetailsModal && (
                <Modal isOpen={userDetailsModal} onRequestClose={closeUserDetailsModal} contentLabel="Felhasználó részletei">
                    <h3>Felhasználó részletei</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                        <thead>
                        <tr>
                            <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #ddd' }}>Kulcs</th>
                            <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #ddd' }}>Érték</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>ID</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{userDetails.id}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Keresztnév</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{userDetails.firstName}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Középső név</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{userDetails.midName || '-'}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Vezetéknév</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{userDetails.lastName}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Lakhely (város)</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{userDetails.city?.name}</td>
                        </tr>

                        {/* Hobbik */}
                        {userDetails.hobbies?.length > 0 && (
                            <tr>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Hobbik</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                        {userDetails.hobbies.map((hobby, index) => (
                                            <li key={index}>{hobby.name}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        )}

                        {/* Sportok */}
                        {userDetails.sports?.length > 0 && (
                            <tr>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Sportok</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                        {userDetails.sports.map((sport, index) => (
                                            <li key={index}>{sport.name}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        )}

                        {/* Zenei műfajok */}
                        {userDetails.musicGenres?.length > 0 && (
                            <tr>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Zenei műfajok</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                        {userDetails.musicGenres.map((genre, index) => (
                                            <li key={index}>{genre.genre}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        )}

                        {/* Filmek */}
                        {userDetails.movies?.length > 0 && (
                            <tr>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Filmek</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                        {userDetails.movies.map((movie, index) => (
                                            <li key={index}>{movie.title}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        )}

                        {/* Események */}
                        {userDetails.activities?.length > 0 && (
                            <tr>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Események</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                        {userDetails.activities.map((activity, index) => (
                                            <li key={index}>{activity.name}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        )}

                        {/* Barátok */}
                        {userDetails.friends?.length > 0 && (
                            <tr>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Barátok</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                        {userDetails.friends.map((friend, index) => (
                                            <li key={index}>
                                                {friend.firstName} {friend.midName ? friend.midName + ' ' : ''}{friend.lastName}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    <button onClick={closeUserDetailsModal} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Vissza</button>
                </Modal>
            )}

            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: 20,
                        borderRadius: 8,
                        minWidth: 300
                    }}>
                        <h3>Kapcsolatok hozzáadása</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div>
                                <label>Város</label><br />
                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>

                            <div>
                                <label>Hobbi</label><br />
                                <input type="text" value={hobby} onChange={(e) => setHobby(e.target.value)} />
                            </div>

                            <div>
                                <label>Sport</label><br />
                                <input type="text" value={sport} onChange={(e) => setSport(e.target.value)} />
                            </div>

                            <div>
                                <label>Zenei műfaj</label><br />
                                <input type="text" value={music} onChange={(e) => setMusic(e.target.value)} />
                            </div>

                            <div>
                                <label>Film</label><br />
                                <input type="text" value={movie} onChange={(e) => setMovie(e.target.value)} />
                            </div>

                            <div>
                                <label>Esemény</label><br />
                                <input type="text" value={event} onChange={(e) => setEvent(e.target.value)} />
                            </div>

                            <div>
                                <label>Barát keresztneve</label><br />
                                <input type="text" value={friendFirstName} onChange={(e) => setFriendFirstName(e.target.value)} />
                            </div>

                            <div>
                                <label>Barát középső neve</label><br />
                                <input type="text" value={friendMidName} onChange={(e) => setFriendMidName(e.target.value)} />
                            </div>

                            <div>
                                <label>Barát vezetékneve</label><br />
                                <input type="text" value={friendLastName} onChange={(e) => setFriendLastName(e.target.value)} />
                            </div>

                            <div style={{ marginTop: 10 }}>
                                <button onClick={handleAddConnections}>Mentés</button>
                                <button onClick={closeModal} style={{ marginLeft: 10 }}>Mégsem</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UsersPage;
