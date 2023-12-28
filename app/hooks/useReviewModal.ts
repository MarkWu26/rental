import {create} from 'zustand'
import { SafeReview } from '../types';

interface ReviewModal{
    isOpen: boolean
    onClose: () => void;
    onOpen: () => void;
    reviews?: SafeReview | null
}

const useReviewModal = create<ReviewModal> ((set)=>({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useReviewModal