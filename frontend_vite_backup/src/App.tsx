import React, { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import Login from './components/Login';

const LOCAL_LOGIN_KEY = 'moos_logged_in_user';

const App = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_LOGIN_KEY);
    if (saved) setUser(saved);
  }, []);

  const handleLogin = (username: string) => {
    setUser(username);
    localStorage.setItem(LOCAL_LOGIN_KEY, username);
  };

  if (!user) return <Login onLogin={handleLogin} />;
  return <Desktop />;
};

export default App;
