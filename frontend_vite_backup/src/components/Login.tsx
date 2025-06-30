import React, { useState } from 'react';

interface User {
  username: string;
  password: string;
}

const LOCAL_KEY = 'moos_users';

function getUsers(): User[] {
  const data = localStorage.getItem(LOCAL_KEY);
  return data ? JSON.parse(data) : [];
}

function saveUsers(users: User[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(users));
}

const Login: React.FC<{ onLogin: (username: string) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = getUsers();
    if (isRegister) {
      if (users.find(u => u.username === username)) {
        setError('User already exists');
        return;
      }
      users.push({ username, password });
      saveUsers(users);
      setError('Registered! You can now log in.');
      setIsRegister(false);
    } else {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        onLogin(username);
      } else {
        setError('Invalid credentials');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-2">{isRegister ? 'Register' : 'Login'}</h2>
        <input
          type="text"
          placeholder="Username"
          className="border rounded px-3 py-2"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded px-3 py-2"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition">
          {isRegister ? 'Register' : 'Login'}
        </button>
        <button
          type="button"
          className="text-blue-700 underline text-sm mt-2"
          onClick={() => {
            setIsRegister(!isRegister);
            setError('');
          }}
        >
          {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </button>
      </form>
    </div>
  );
};

export default Login;
