import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Desktop from '../src/components/Desktop';
import Login from '../src/components/Login';

const LOCAL_LOGIN_KEY = 'moos_logged_in_user';

export default function Home() {
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
}