import React, { useState } from 'react';

const LOCAL_KEY = 'moos_users';

interface User { username: string; password: string }

function getUsers(): User[] {
  const data = localStorage.getItem(LOCAL_KEY);
  return data ? JSON.parse(data) : [];
}

function saveUsers(users: User[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(users));
}

const Login = ({ onLogin }: { onLogin: (username: string) => void }) => {
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
      if (user) onLogin(username);
      else setError('Invalid credentials');
    }
  };

  return (
    <div className="Login_loginContainer__I_mvg Login_fullPage__eHK5t">
      {/* Subtle bubbles */}
      <div style={{position:'absolute',top:'-8rem',left:'-8rem',width:'18rem',height:'18rem',borderRadius:'100%',background:'#1a1a1a',opacity:0.5,filter:'blur(32px)',zIndex:0}}/>
      <div style={{position:'absolute',left:'2.5rem',top:'33%',width:'9rem',height:'9rem',borderRadius:'100%',background:'#2a2a2a',opacity:0.5,filter:'blur(20px)',zIndex:0}}/>
      <div style={{position:'absolute',bottom:0,left:0,width:'13rem',height:'13rem',borderRadius:'100%',background:'#1a1a1a',opacity:0.6,filter:'blur(32px)',zIndex:0}}/>
      <div style={{position:'absolute',bottom:'-6rem',right:0,width:'20rem',height:'20rem',borderRadius:'100%',background:'#2a2a2a',opacity:0.6,filter:'blur(32px)',zIndex:0}}/>
      
      <div className="loginBox">
        <h1 className="loginTitle">MOOS</h1>
        <p className="loginSubtitle">Modern Operating System</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="loginInput"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="loginInput"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <p style={{color: '#666', fontSize: 13, marginBottom: 16}}>{error}</p>}
          <button type="submit" className="loginButton">
            {isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        
        <p style={{marginTop: 24, fontSize: 13, color: '#666'}}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button 
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            style={{background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 13}}
          >
            {isRegister ? 'Sign In' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;