import { create } from 'zustand';

interface RejectModal {
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
  listingId?: string;
}

const useRejectPropertyModal = create<RejectModal>((set) => ({
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, listingId: id }),
  onClose: () => set({ isOpen: false }),
  listingId: undefined
}))
  

export default useRejectPropertyModal;
