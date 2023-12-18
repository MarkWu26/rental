import { create } from 'zustand';

interface ApproveModal {
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
  reservationId?: string;
}

const useApprovePropertyModal = create<ApproveModal>((set) => ({
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, reservationId: id }),
  onClose: () => set({ isOpen: false }),
  reservationId: undefined
}))
  

export default useApprovePropertyModal;
