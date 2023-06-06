import React, { useState } from 'react';
import axios from 'axios';
import DisplayForm from './DisplayForm';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response =await axios({
        method: 'post',
        url: 'http://localhost:3002/admin/login',
        data: {
          username: username,
          password: password,
          
        }
      });
      const { token } = response.data;
      localStorage.setItem('token', token); // Store the token in local storage

      // Set logged in state and clear form
      setLoggedIn(true);
      setUsername('');
      setPassword('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    setLoggedIn(false);
  };

  if (loggedIn) {
    return <DisplayForm/>;
  }

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={e => e.preventDefault()}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
      </form>
    </div>
  );
};

export default LoginForm;
