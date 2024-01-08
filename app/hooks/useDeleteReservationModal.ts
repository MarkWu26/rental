import { create } from 'zustand';

interface DeleteModal {
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
  reservationId?: string;
}

const useDeleteReservationModal = create<DeleteModal>((set) => ({
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, reservationId: id }),
  onClose: () => set({ isOpen: false }),
  reservationId: undefined
}))
  

export default useDeleteReservationModal;
