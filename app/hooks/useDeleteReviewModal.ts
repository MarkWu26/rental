import { create } from 'zustand';

interface DeleteModal {
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
  reviewId?: string;
}

const useDeleteReviewModal = create<DeleteModal>((set) => ({
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, reviewId: id }),
  onClose: () => set({ isOpen: false }),
  reviewId: undefined
}))
  

export default useDeleteReviewModal;
