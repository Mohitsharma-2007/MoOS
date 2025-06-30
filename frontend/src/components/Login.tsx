import React, { useState } from 'react';
import styles from './Login.module.css';
import MOOSLogo from './moos_logo.PNG';

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
    <div className={styles.loginContainer + ' ' + styles.fullPage}>
      {/* Bubbles background */}
      <div style={{position:'absolute',top:'-8rem',left:'-8rem',width:'18rem',height:'18rem',borderRadius:'100%',background:'linear-gradient(135deg,#7a174a,#c31432)',opacity:0.7,filter:'blur(32px)',boxShadow:'0 0 40px #c31432aa',zIndex:0}}/>
      <div style={{position:'absolute',left:'2.5rem',top:'33%',width:'9rem',height:'9rem',borderRadius:'100%',background:'linear-gradient(135deg,#3b0a3d,#c31432)',opacity:0.7,filter:'blur(20px)',zIndex:0}}/>
      <div style={{position:'absolute',bottom:0,left:0,width:'13rem',height:'13rem',borderRadius:'100%',background:'linear-gradient(135deg,#c31432,#7a174a)',opacity:0.8,filter:'blur(32px)',zIndex:0}}/>
      <div style={{position:'absolute',bottom:'-6rem',right:0,width:'20rem',height:'20rem',borderRadius:'100%',background:'linear-gradient(135deg,#c31432,#3b0a3d)',opacity:0.8,filter:'blur(32px)',zIndex:0}}/>
      <div style={{position:'absolute',right:'8rem',top:'2.5rem',width:'6rem',height:'6rem',borderRadius:'100%',background:'linear-gradient(135deg,#c31432,#7a174a)',opacity:0.7,filter:'blur(16px)',zIndex:0}}/>
      <div style={{position:'absolute',right:'6rem',bottom:'25%',width:'5rem',height:'5rem',borderRadius:'100%',background:'linear-gradient(135deg,#7a174a,#c31432)',opacity:0.6,filter:'blur(12px)',zIndex:0}}/>
      {/* Glassy Card */}
       <div className={styles.glassCard}>
        <div className={styles.logoCircle}>
          <img src={MOOSLogo} alt="MOOS Logo" className={styles.logoImg} />
        </div>
        <h2 className={styles.loginTitle}>{isRegister ? 'Register New User' : 'Welcome to MOOS'}</h2>
        <div className={styles.underline} />
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <label htmlFor="username" className={styles.inputLabel}>User ID</label>
          <div className={styles.inputGroup}>
            <svg className={styles.inputIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-8 0v2"/><circle cx="12" cy="7" r="4"/></svg>
            <input
              id="username"
              type="text"
              placeholder="Enter user ID"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={styles.inputField}
              autoComplete="username"
              required
            />
          </div>
          <label htmlFor="password" className={styles.inputLabel}>Password</label>
          <div className={styles.inputGroup}>
            <svg className={styles.inputIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={styles.inputField}
              autoComplete={isRegister ? "new-password" : "current-password"}
              required
            />
          </div>
          {error && <div className={styles.loginError}>{error}</div>}
          {isRegister ? (
            <button type="submit" className={styles.loginBtn}>REGISTER</button>
          ) : (
            <button type="submit" className={styles.loginBtn}>LOG IN</button>
          )}
          <button type="button" className={styles.toggleBtn} onClick={() => { setError(''); setIsRegister(r => !r); }}>
            {isRegister ? 'Already have an account? Log in' : "Don't have an account? Register"}
          </button>
          <div className={styles.infoNote}>Credentials are saved locally in your browser.</div>
        </form>
      </div>
    </div>
  );
};

export default Login;
