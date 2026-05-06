import React, { useState } from 'react';
import { appList, AppMeta } from './appList';

interface AppDrawerProps {
  open: boolean;
  onClose: () => void;
  onAppLaunch: (app: AppMeta) => void;
}

const AppDrawer = ({ open, onClose, onAppLaunch }: AppDrawerProps) => {
  const [search, setSearch] = useState('');
  
  if (!open) return null;
  
  const filteredApps = appList.filter(app => 
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div onClick={onClose} style={{position:'fixed',inset:0,zIndex:998}} />
      <div className="appDrawerContainer" style={{left: '50%', transform: 'translateX(-50%)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom: 12}}>
          <span style={{fontSize: 14, fontWeight: 500}}>App Drawer</span>
          <button onClick={onClose} style={{background:'none',border:'none',color:'#666',fontSize:20,cursor:'pointer'}}>×</button>
        </div>
        
        <input
          type="text"
          placeholder="Search apps..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 14px',
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: 8,
            color: '#fff',
            fontSize: 13,
            marginBottom: 12
          }}
        />
        
        <div className="appDrawerGrid" style={{maxHeight: 200, overflowY: 'auto'}}>
          {filteredApps.map(app => (
            <div
              key={app.name}
              className="appDrawerItem"
              onClick={() => onAppLaunch(app)}
            >
              <img className="appDrawerIcon" src={app.icon || 'https://img.icons8.com/color/96/000000/app-store.png'} alt={app.name} />
              <span className="appDrawerLabel">{app.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppDrawer;