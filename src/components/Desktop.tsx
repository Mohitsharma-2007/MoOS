import React, { useState } from 'react';
import AppDrawer from './AppDrawer';
import WindowManager from '../windowmgr/WindowManager';
import Taskbar from './Taskbar';
import WidgetPanel from './WidgetPanel';

const Desktop = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [widgetPanelOpen, setWidgetPanelOpen] = useState(false);

  const handleAppLaunch = (app: any) => {
    setDrawerOpen(false);
    const { useWindowStore } = require('../store/window');
    const { addWindow } = useWindowStore.getState();
    const normalizedName = app.name.replace(/[^a-zA-Z0-9]/g, '');
    let AppComponent = null;
    try {
      AppComponent = require(`../apps/${normalizedName}/${normalizedName}App`).default;
    } catch {}
    const content = AppComponent ? <AppComponent /> : <div style={{padding: 20, color: '#666'}}>{app.name} Coming Soon</div>;
    addWindow({ id: app.name + '-' + Date.now(), title: app.name, content });
  };

  return (
    <div className="desktopRoot">
      {/* Desktop Wallpaper */}
      <div className="desktopWallpaper" />
      
      {/* Animated Bubbles */}
      <div className="desktopBubbles">
        <div className="bubble" style={{ background: '#333', width: 200, height: 200, top: '10%', left: '5%' }} />
        <div className="bubble" style={{ background: '#444', width: 150, height: 150, top: '50%', right: '10%' }} />
        <div className="bubble" style={{ background: '#2a2a2a', width: 180, height: 180, bottom: '20%', left: '20%' }} />
      </div>

      {/* Desktop Icons */}
      <div className="desktopIcons">
        <div className="desktopIcon">
          <img className="desktopIconImg" src="https://img.icons8.com/color/96/000000/folder-invoices--v2.png" alt="Files" />
          <span className="desktopIconLabel">Files</span>
        </div>
        <div className="desktopIcon">
          <img className="desktopIconImg" src="https://img.icons8.com/color/96/000000/settings--v2.png" alt="Settings" />
          <span className="desktopIconLabel">Settings</span>
        </div>
        <div className="desktopIcon">
          <img className="desktopIconImg" src="https://img.icons8.com/color/96/000000/console.png" alt="Terminal" />
          <span className="desktopIconLabel">Terminal</span>
        </div>
      </div>

      {/* MOOS Centerpiece */}
      <img src="/logo512.png" alt="MOOS" className="moosCenterpiece" />

      {/* Window Manager */}
      <WindowManager />

      {/* App Drawer */}
      <AppDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onAppLaunch={handleAppLaunch} />

      {/* Taskbar */}
      <Taskbar 
        onAppDrawerClick={() => setDrawerOpen(!drawerOpen)} 
        onWidgetsClick={() => setWidgetPanelOpen(!widgetPanelOpen)} 
      />

      {/* Widget Panel */}
      <WidgetPanel open={widgetPanelOpen} onClose={() => setWidgetPanelOpen(false)} />

      {/* Footer */}
      <div className="desktopFooter">MOOS &copy; 2025 &mdash; Modern OS Experience</div>
    </div>
  );
};

export default Desktop;