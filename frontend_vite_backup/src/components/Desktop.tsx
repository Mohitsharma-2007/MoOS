import React from 'react';
import WindowManager from '../windowmgr/WindowManager';
import Launcher from './Launcher';
import Taskbar from './Taskbar';

const Desktop = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526]">
      <WindowManager />
      <Launcher />
      <Taskbar />
    </div>
  );
};

export default Desktop;
