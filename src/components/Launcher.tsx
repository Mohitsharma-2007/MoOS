import React from 'react';
import { useWindowStore } from '../store/window';

const Launcher = () => {
  const { addWindow } = useWindowStore();
  return (
    <button
      className="fixed bottom-8 left-8 bg-blue-600 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700 transition"
      onClick={() =>
        addWindow({
          id: 'sample-app',
          title: 'Sample App',
          content: <div className="p-4">Hello from Sample App!</div>,
        })
      }
    >
      Launch Sample App
    </button>
  );
};

export default Launcher;
