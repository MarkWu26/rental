import { create } from 'zustand';

interface SuccessModal {
  isOpen: boolean;
  onOpen: (title: string, subtitle: string) => void;
  onClose: () => void;
  title: string;
  subtitle: string;
}

const useSuccessModal = create<SuccessModal>((set) => ({
  isOpen: false,
  onOpen: (title, subtitle) => set({ 
    isOpen: true,
    title:title,
    subtitle: subtitle
  }),
  onClose: () => set({ isOpen: false }),
  title: '',
  subtitle: '',

}))
  

export default useSuccessModal;
