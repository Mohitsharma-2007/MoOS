import React, { useState } from 'react';
import styles from './AppDrawer.module.css';
import { appList, AppMeta } from './appList';

const fallbackIcon = 'https://img.icons8.com/color/96/000000/app-store.png';


export interface AppDrawerProps {
  open: boolean;
  onClose: () => void;
  onAppLaunch: (app: AppMeta) => void;
}

const AppDrawer: React.FC<AppDrawerProps> = ({ open, onClose, onAppLaunch }) => {
  const [search, setSearch] = useState('');

  if (!open) return null;

  return (
    <>
      <div className={styles.drawerOverlay} onClick={onClose} />
      <aside className={styles.appDrawer}>
        <div className={styles.drawerHeader}>
          App Drawer
          <button className={styles.drawerCloseBtn} onClick={onClose} title="Close">×</button>
        </div>
        <input
          className={styles.appSearch}
          type="text"
          placeholder="Search apps..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className={styles.drawerContent}>
          {/* Group apps by category */}
          {Array.from(new Set(appList.map(a => a.category))).map(category => {
            const filteredApps = appList.filter(app =>
              app.category === category &&
              app.name.toLowerCase().includes(search.toLowerCase())
            );
            if (filteredApps.length === 0) return null;
            return (
              <div key={category}>
                <div className={styles.appCategory}>{category}</div>
                <div className={styles.appGrid}>
                  {filteredApps.map(app => (
                    <div
                      key={app.name}
                      className={styles.appTile}
                      onClick={() => onAppLaunch(app) }
                      title={app.description || app.name}
                    >
                      {app.icon ? (
                        <img className={styles.appIconImg} src={app.icon} alt={app.name} onError={e => (e.currentTarget.src = fallbackIcon)} />
                      ) : (
                        <svg
                          className={styles.appIconImg}
                          width="38"
                          height="38"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <rect x="3" y="3" width="7" height="7" rx="2"/>
                          <rect x="14" y="3" width="7" height="7" rx="2"/>
                          <rect x="14" y="14" width="7" height="7" rx="2"/>
                          <rect x="3" y="14" width="7" height="7" rx="2"/>
                        </svg>
                      )}
                      <div className={styles.appTileLabel}>{app.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default AppDrawer;
