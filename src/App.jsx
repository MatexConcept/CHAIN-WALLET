// import React from 'react'
// import Login from './components/Login'

// const App = () => {
//   return (
//     <div>
//       <Login/>
//     </div>
//   )
// }

// export default App
import React, { useState } from 'react';
import LoginSystem from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLoginSuccess = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <div className="app">
      {isLoggedIn ? (
        <Dashboard username={username} onLogout={handleLogout} />
      ) : (
        <LoginSystem onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default App;