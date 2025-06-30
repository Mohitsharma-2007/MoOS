import React, { useState } from 'react';
import styles from './WallpaperModal.module.css';
import { wallpapers } from './wallpapers';

interface WallpaperModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

const WallpaperModal: React.FC<WallpaperModalProps> = ({ open, onClose, onSelect }) => {
  const [customUrl, setCustomUrl] = useState('');
  const [error, setError] = useState('');
  if (!open) return null;
  const handleCustom = () => {
    if (!customUrl.trim()) return;
    // Basic validation: must look like an image URL
    if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(customUrl.trim())) {
      setError('Please enter a valid image URL ending with .jpg, .png, .webp, or .gif');
      return;
    }
    setError('');
    onSelect(customUrl.trim());
    onClose();
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Choose Wallpaper</h2>
        <div style={{ width: '100%', marginBottom: 16, display: 'flex', gap: 8 }}>
          <input
            type="text"
            placeholder="Paste image URL (.jpg/.png/.webp/.gif)"
            value={customUrl}
            onChange={e => { setCustomUrl(e.target.value); setError(''); }}
            onKeyDown={e => { if (e.key === 'Enter') handleCustom(); }}
            style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #4f8cff', fontSize: 15 }}
          />
          <button
            style={{ padding: '8px 16px', borderRadius: 6, background: '#4f8cff', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}
            onClick={handleCustom}
          >Set</button>
        </div>
        {error && <div style={{ color: '#ff5bcb', marginBottom: 8 }}>{error}</div>}
        <div className={styles.wallpaperGrid}>
          {wallpapers.map((url, idx) => (
            <img
              key={url}
              src={url}
              alt={`Wallpaper ${idx+1}`}
              className={styles.wallpaperThumb}
              onClick={() => { onSelect(url); onClose(); }}
            />
          ))}
        </div>
        <button className={styles.closeBtn} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default WallpaperModal;
