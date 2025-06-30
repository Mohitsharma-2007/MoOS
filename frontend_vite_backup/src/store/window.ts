import { create } from 'zustand';

export interface AppWindow {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface WindowState {
  windows: AppWindow[];
  addWindow: (win: AppWindow) => void;
  removeWindow: (id: string) => void;
}

export const useWindowStore = create<WindowState>((set) => ({
  windows: [],
  addWindow: (win) =>
    set((state) => ({ windows: [...state.windows, win] })),
  removeWindow: (id) =>
    set((state) => ({ windows: state.windows.filter((w) => w.id !== id) })),
}));
