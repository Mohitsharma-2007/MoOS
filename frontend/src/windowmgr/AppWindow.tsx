import React, { useState } from 'react';
import { AppWindow as AppWindowType } from '../store/window';
import { useWindowStore } from '../store/window';
import Draggable from './Draggable';

const AppWindow: React.FC<AppWindowType> = ({ id, title, content }) => {
  const minimized = useWindowStore(state => state.windows.find(w => w.id === id)?.minimized) || false;
  const minimizeWindow = useWindowStore(state => state.minimizeWindow);
  const restoreWindow = useWindowStore(state => state.restoreWindow);
  const removeWindow = useWindowStore(state => state.removeWindow);
  const [maximized, setMaximized] = useState(false);

  const handleMinimize = () => minimizeWindow(id);
  const handleMaximize = () => setMaximized((m) => !m);
  const handleRestore = () => restoreWindow(id);
  const handleClose = () => removeWindow(id);

  // Centered and modal style
  if (minimized) return null;
  const defaultPos = { x: window.innerWidth / 2 - 170, y: window.innerHeight / 2 - 200 };
  const windowContent = (
    <>
      <div className="bg-blue-700 text-white px-4 py-2 rounded-t font-bold flex justify-between items-center cursor-move select-none">
        <span>{title}</span>
        <div className="flex gap-1 ml-auto">
          <button
            onClick={handleMinimize}
            title="Minimize"
            style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, marginRight: 4, cursor: 'pointer' }}
          >
            &#8211;
          </button>
          <button
            onClick={handleMaximize}
            title={maximized ? 'Restore' : 'Maximize'}
            style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, marginRight: 4, cursor: 'pointer' }}
          >
            {maximized ? <span style={{ fontWeight: 'bold' }}>❐</span> : <span style={{ fontWeight: 'bold' }}>□</span>}
          </button>
          <button
            onClick={handleClose}
            title="Close"
            style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
      </div>
      <div className="p-4 overflow-auto" style={{ height: maximized ? 'calc(100vh - 48px)' : 'auto', background: 'rgba(255,255,255,0.18)', borderRadius: maximized ? '0 0 20px 20px' : '0 0 20px 20px' }}>
        {title === 'Calculator' &&
          (() => {
            // Only inject maximized prop if content is a valid React element and is CalculatorApp
            if (
              React.isValidElement(content) &&
              typeof content.type === 'function' &&
              content.type.name === 'CalculatorApp'
            ) {
              return React.cloneElement(content as React.ReactElement<any>, { maximized });
            }
            return content;
          })()
        }
        {title !== 'Calculator' && content}
      </div>
    </>
  );
  return (
    <>
      {/* Modal overlay for blur, only for Calculator and only when not minimized or maximized */}
      {title === 'Calculator' && !minimized && !maximized && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(28,34,54,0.18)',
            backdropFilter: 'blur(8px)',
            zIndex: 49,
          }}
          aria-hidden="true"
        />
      )}
      {maximized ? (
        <div
          className="fixed bg-white border border-gray-300 z-[9999] transition-all duration-300"
          style={{
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            transform: 'none',
            display: 'block',
            borderRadius: 0,
            boxShadow: 'none',
            padding: 0,
          }}
        >
          <div style={{ width: '100vw', height: '100vh', borderRadius: 0, boxShadow: 'none', padding: 0 }}>
            {windowContent}
          </div>
        </div>
      ) : (
        <Draggable defaultPosition={defaultPos}>
          <div
            className="fixed bg-white rounded shadow-2xl border border-gray-300 z-50 transition-all duration-300 w-[340px]"
            style={{ top: 0, left: 0 }}
          >
            {windowContent}
          </div>
        </Draggable>
      )}
    </>
  );
};

export default AppWindow;
