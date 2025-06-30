import React from 'react';
import styles from './WidgetPanel.module.css';

interface WidgetPanelProps {
  open: boolean;
  onClose: () => void;
  onWallpaperClick?: () => void;
}

const WidgetPanel: React.FC<WidgetPanelProps> = ({ open, onClose, onWallpaperClick }) => {
  if (!open) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <button className={styles.closeBtn} onClick={onClose} title="Close">×</button>
        <h2 className={styles.title}>Widgets</h2>
        <div className={styles.widgetsGrid}>
          {/* Weather Widget */}
          <div className={styles.widget}>
            <img src="https://img.icons8.com/color/96/000000/partly-cloudy-day--v2.png" alt="Weather" className={styles.widgetImg} />
            <div className={styles.widgetLabel}>Weather<br/><span className={styles.widgetSub}>22°C, Partly Cloudy</span></div>
          </div>
          {/* Calendar Widget */}
          <div className={styles.widget}>
            <img src="https://img.icons8.com/color/96/000000/calendar--v2.png" alt="Calendar" className={styles.widgetImg} />
            <div className={styles.widgetLabel}>Calendar<br/><span className={styles.widgetSub}>Apr 27, 2025</span></div>
          </div>
          {/* Notes Widget */}
          <div className={styles.widget}>
            <img src="https://img.icons8.com/color/96/000000/note--v2.png" alt="Notes" className={styles.widgetImg} />
            <div className={styles.widgetLabel}>Notes<br/><span className={styles.widgetSub}>No notes yet</span></div>
          </div>
          {/* Wallpaper Widget */}
          {onWallpaperClick && (
            <div className={styles.widget} onClick={onWallpaperClick} style={{cursor: 'pointer'}}>
              <img src="https://img.icons8.com/color/96/000000/picture.png" alt="Wallpaper" className={styles.widgetImg} />
              <div className={styles.widgetLabel}>Wallpaper<br/><span className={styles.widgetSub}>Change</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WidgetPanel;
