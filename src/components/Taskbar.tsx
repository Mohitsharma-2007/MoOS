import React, { useEffect, useState } from 'react';
import moosLogo from '../assets/MOOS.png';
import { useWindowStore } from '../store/window';

const Taskbar = ({ onAppDrawerClick, onWidgetsClick }: { onAppDrawerClick: () => void; onWidgetsClick: () => void }) => {
  const [time, setTime] = useState(new Date());
  const windows = useWindowStore(state => state.windows);
  const restoreWindow = useWindowStore(state => state.restoreWindow);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="taskbarRoot">
      {/* App Drawer Button */}
      <button className="startButton" title="App Drawer" onClick={onAppDrawerClick}>
        <img src={moosLogo.src} alt="MOOS" />
      </button>

      {/* Running Apps */}
      <div className="taskbarApps">
        {windows.filter(win => win.minimized).map(win => (
          <button
            key={win.id}
            className="taskbarAppBtn"
            title={win.title}
            onClick={() => restoreWindow(win.id)}
          >
            <span style={{marginRight: 6}}>●</span>
            {win.title}
          </button>
        ))}
      </div>

      {/* Clock */}
      <div className="taskbarClock">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default Taskbar;