import { create } from 'zustand';

interface RejectModal {
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
  reservationId?: string;
}

const useRejectReservation = create<RejectModal>((set) => ({
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, reservationId: id }),
  onClose: () => set({ isOpen: false }),
  reservationId: undefined
}))
  

export default useRejectReservation;
