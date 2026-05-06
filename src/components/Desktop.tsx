import React, { useState } from 'react';
import AppDrawer from './AppDrawer';
import moosLogo from './moos_logo.PNG';
import WindowManager from '../windowmgr/WindowManager';
import Taskbar from './Taskbar';
import styles from './Desktop.module.css';

import WallpaperModal from './WallpaperModal';
import WidgetPanel from './WidgetPanel';

const Desktop = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [wallpaperOpen, setWallpaperOpen] = useState(false);
  const [widgetPanelOpen, setWidgetPanelOpen] = useState(false);
  const [wallpaper, setWallpaper] = useState<string | null>(null);

  // For demonstration: handle launching an app
  // Import the window store
  const { addWindow } = require('../store/window').useWindowStore();
  const handleAppLaunch = (app: any) => {
    setDrawerOpen(false);
    let content;
    // Normalize app name for folder/file lookup (spaces, slashes, dashes)
    const normalizedName = app.name.replace(/[^a-zA-Z0-9]/g, '');
    let AppComponent = null;
    try {
      AppComponent = require(`../apps/${app.name.replace(/[^a-zA-Z0-9]/g, ' ')}/${normalizedName}App`).default;
    } catch {
      // fallback if not found
    }
    if (AppComponent) {
      content = <AppComponent />;
    } else {
      content = <div style={{minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20}}>{app.name} App Coming Soon</div>;
    }
    addWindow({
      id: app.name + '-' + Date.now(),
      title: app.name,
      content,
    });
  };


  return (
    <div className={styles.desktopRoot}>
      {/* Wallpaper background layer */}
      {wallpaper && (
        <div
          className={styles.wallpaperBg}
          style={{
            backgroundImage: `url(${wallpaper})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            width: '100vw',
            height: '100vh',
          }}
          aria-hidden="true"
        />
      )}
      {/* MOOS Logo Centerpiece */}
      {/* MOOS Logo Centerpiece */}
      <img
        src={moosLogo}
        alt="MOOS Logo"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '180px',
          height: '180px',
          opacity: 0.13,
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      <AppDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onAppLaunch={handleAppLaunch} />
      {/* Animated background bubbles */}
      <div className={styles.desktopBubbles}>
        <div className={styles.bubble} style={{ background: 'linear-gradient(135deg,#4f8cff,#b46fff)', width: 180, height: 180, top: 40, left: 60, animationDelay: '0s' }} />
        <div className={styles.bubble} style={{ background: 'linear-gradient(135deg,#ff5bcb,#b46fff)', width: 120, height: 120, top: 180, left: 420, animationDelay: '2s' }} />
        <div className={styles.bubble} style={{ background: 'linear-gradient(135deg,#b46fff,#0f2027)', width: 110, height: 110, bottom: 70, right: 60, animationDelay: '3s' }} />
        <div className={styles.bubble} style={{ background: 'linear-gradient(135deg,#232526,#ff5bcb)', width: 150, height: 150, bottom: 100, left: 120, animationDelay: '1.5s' }} />
        <div className={styles.bubble} style={{ background: 'linear-gradient(135deg,#232526,#4f8cff)', width: 80, height: 80, top: 60, right: 120, animationDelay: '2.8s' }} />
      </div>
      {/* Desktop icons */}
      <div className={styles.desktopIcons}>
        <div className={styles.desktopIcon}>
          <img className={styles.desktopIconImg} src="https://img.icons8.com/color/96/000000/folder-invoices--v2.png" alt="Files" />
          <span className={styles.desktopIconLabel}>Files</span>
        </div>
        <div className={styles.desktopIcon}>
          <img className={styles.desktopIconImg} src="https://img.icons8.com/color/96/000000/settings--v2.png" alt="Settings" />
          <span className={styles.desktopIconLabel}>Settings</span>
        </div>
        <div className={styles.desktopIcon}>
          <img className={styles.desktopIconImg} src="https://img.icons8.com/color/96/000000/console.png" alt="Terminal" />
          <span className={styles.desktopIconLabel}>Terminal</span>
        </div>
      </div>
      {/* Main OS windows and UI */}
      <WindowManager />
      <Taskbar
        onAppDrawerClick={() => setDrawerOpen(true)}
        onWidgetsClick={() => setWidgetPanelOpen((v) => !v)}
      />
      <WidgetPanel
        open={widgetPanelOpen}
        onClose={() => setWidgetPanelOpen(false)}
        onWallpaperClick={() => setWallpaperOpen(true)}
      />
      {/* Footer */}
      <div className={styles.desktopFooter}>MOOS &copy; 2025 &mdash; Modern OS Experience</div>

      <WallpaperModal
        open={wallpaperOpen}
        onClose={() => setWallpaperOpen(false)}
        onSelect={url => setWallpaper(url)}
      />
    </div>
  );
};

export default Desktop;
