import { create } from 'zustand';

interface DeleteModal {
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
  listingId?: string;
}

const useDeletePropertyModal = create<DeleteModal>((set) => ({
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, listingId: id }),
  onClose: () => set({ isOpen: false }),
  listingId: undefined
}))
  

export default useDeletePropertyModal;
