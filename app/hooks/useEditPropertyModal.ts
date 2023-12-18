import { create } from 'zustand';
import { SafeListings } from '../types';

interface EditModal {
  isOpen: boolean;
  onOpen: (
    listing?: SafeListings | null,
    locationValue?: string,
    latlng?: Number[]
    ) => void;
  onClose: () => void;
  listing?: SafeListings | null;
  locationValue?: string | null; 
  latlng?: Number[] | null;
}

const useEditPropertyModal = create<EditModal>((set) => ({
  isOpen: false,
  onOpen: (listing, locationValue, latlng) => set({ 
    isOpen: true,
    listing: listing, 
    locationValue: locationValue, 
    latlng: latlng}),
  onClose: () => set({ 
    isOpen: false,
    listing: null,
    locationValue: null,
    latlng: null
  })
}))
  

export default useEditPropertyModal;
