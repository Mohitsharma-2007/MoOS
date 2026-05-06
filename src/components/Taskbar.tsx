import React, { useEffect, useState } from 'react';
import styles from './Taskbar.module.css';
import moosLogo from '../assets/MOOS.png';
import { useWindowStore } from '../store/window';

interface TaskbarProps {
  onAppDrawerClick: () => void;
  onWidgetsClick: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ onAppDrawerClick, onWidgetsClick }) => {
  const [time, setTime] = useState(new Date());
  const windows = useWindowStore(state => state.windows);
  const restoreWindow = useWindowStore(state => state.restoreWindow);
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.taskbarRoot}>
      {/* App Drawer Button */}
      <button className={styles.startButton} title="App Drawer" onClick={onAppDrawerClick}>
        <img src={moosLogo.src} alt="MOOS App Drawer" className={styles.moosLogoImg} width={32} height={32} />
      </button>
      {/* Widgets Button */}
      <button className={styles.widgetButton} title="Widgets" onClick={onWidgetsClick}>
        <img src="https://img.icons8.com/fluency/48/000000/widgets.png" alt="Widgets" className={styles.widgetIcon} width={28} height={28} />
      </button>
      {/* Running/Minimized Apps */}
      <div className={styles.taskbarApps}>
        {windows.filter(win => win.minimized).map(win => (
          <button
            key={win.id}
            className={styles.taskbarAppBtn}
            title={win.title}
            onClick={() => restoreWindow(win.id)}
          >
            {/* You can use a generic icon or app-specific icon here */}
            <span role="img" aria-label={win.title} style={{marginRight: 8}}>🟦</span>
            {win.title}
          </button>
        ))}
      </div>
      {/* Clock */}
      <div className={styles.taskbarClock}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
    </div>
  );
};

export default Taskbar;
