import React from 'react';
import { useWindowStore } from '../store/window';
import AppWindow from './AppWindow';

const WindowManager = () => {
  const { windows } = useWindowStore();
  return (
    <>
      {windows.map((win) => (
        <AppWindow key={win.id} {...win} />
      ))}
    </>
  );
};

export default WindowManager;
