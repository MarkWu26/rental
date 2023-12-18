import { create } from 'zustand';

interface ApproveModal {
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
  listingId?: string;
}

const useApprovePropertyModal = create<ApproveModal>((set) => ({
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, listingId: id }),
  onClose: () => set({ isOpen: false }),
  listingId: undefined
}))
  

export default useApprovePropertyModal;
