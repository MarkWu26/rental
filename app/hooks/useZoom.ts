import {create} from 'zustand';

interface useZoomStore {
  zoom: number;
  setZoom: (newZoom: number) => void;
}

const useZoom = create<useZoomStore>((set) => ({
  zoom: 4,
  setZoom: (newZoom) => set({ zoom: newZoom }),
}));

export default useZoom;