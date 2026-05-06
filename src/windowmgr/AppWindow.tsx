import React, { useState } from 'react';
import { AppWindow as AppWindowType } from '../store/window';
import { useWindowStore } from '../store/window';

const AppWindow: React.FC<AppWindowType> = ({ id, title, content }) => {
  const minimized = useWindowStore(state => state.windows.find(w => w.id === id)?.minimized) || false;
  const minimizeWindow = useWindowStore(state => state.minimizeWindow);
  const restoreWindow = useWindowStore(state => state.restoreWindow);
  const removeWindow = useWindowStore(state => state.removeWindow);
  const [maximized, setMaximized] = useState(false);

  if (minimized) return null;

  const handleMinimize = () => minimizeWindow(id);
  const handleMaximize = () => setMaximized(!maximized);
  const handleClose = () => removeWindow(id);

  const defaultPos = { x: window.innerWidth / 2 - 170, y: window.innerHeight / 2 - 200 };
  const pos = { x: 100, y: 60 };

  return (
    <div className="windowFrame" style={{
      position: 'fixed',
      left: pos.x,
      top: pos.y,
      width: maximized ? 'calc(100vw - 20px)' : 360,
      height: maximized ? 'calc(100vh - 80px)' : 400,
      zIndex: 100,
    }}>
      {/* Title Bar */}
      <div className="titleBar" style={{cursor: 'move'}}>
        <div style={{display:'flex',gap: 6}}>
          <span className="trafficLight trafficRed" onClick={handleClose} style={{cursor:'pointer'}} />
          <span className="trafficLight trafficYellow" onClick={handleMinimize} style={{cursor:'pointer'}} />
          <span className="trafficLight trafficGreen" onClick={handleMaximize} style={{cursor:'pointer'}} />
        </div>
        <span className="windowTitle">{title}</span>
        <div style={{width: 54}} />
      </div>

      {/* Window Content */}
      <div className="windowContent" style={{height: 'calc(100% - 38px)', background: '#0a0a0a'}}>
        {content}
      </div>
    </div>
  );
};

export default AppWindow;