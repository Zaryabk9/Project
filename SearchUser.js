import React, { useState } from 'react';
import axios from 'axios';

const UserSearch = () => {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/user/users/${name}`);
      setUsers(response.data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('An error occurred while searching for users');
      setUsers([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter a name"
      />
      <button onClick={handleSearch}>Search</button>

      {errorMessage && <p>{errorMessage}</p>}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Age</th>
            <th style={{ padding: '10px' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '10px' }}>{user.name}</td>
              <td style={{ padding: '10px' }}>{user.age}</td>
              <td style={{ padding: '10px' }}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserSearch;
