import {create} from 'zustand'
import { SafeReview } from '../types';

interface ReviewModal{
    isOpen: boolean
    onClose: (comment?: string) => void;
    onOpen: (ratingValue?: number, comment?: string, isEdit?: boolean, reviewId?: string) => void;
    reviews?: SafeReview | null
    reviewId?: string
    comment?: string | undefined;
    ratingValue?: number | null
    isEdit?: boolean
}

const useReviewModal = create<ReviewModal> ((set)=>({
    isOpen: false,
    onOpen: (ratingValue, comment, isEdit, reviewId) => set({isOpen: true, ratingValue, comment, isEdit, reviewId}),
    onClose: (comment) => set({isOpen: false, comment})
}))

export default useReviewModal