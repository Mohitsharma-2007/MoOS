import React from 'react';
import { AppWindow as AppWindowType } from '../store/window';

const AppWindow: React.FC<AppWindowType> = ({ id, title, content }) => {
  return (
    <div className="fixed top-24 left-1/4 w-96 bg-white rounded shadow-lg border border-gray-300 z-50">
      <div className="bg-blue-700 text-white px-4 py-2 rounded-t font-bold flex justify-between items-center">
        <span>{title}</span>
      </div>
      <div className="p-4">{content}</div>
    </div>
  );
};

export default AppWindow;
