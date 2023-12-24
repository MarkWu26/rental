import {create} from 'zustand'

interface ReservationModalStore {
    isOpen: boolean,
    onOpen: ( totalPrice: number, startDate: Date | undefined, endDate: Date | undefined, listingId: string ) => void;
    onClose: () => void;
    totalPrice?: number;
    startDate: Date | undefined;
    endDate: Date | undefined;
    listingId?: string;
}

const useReservationModal = create<ReservationModalStore>((set)=> ({
    isOpen: false,
    onOpen: (totalPrice, startDate, endDate, listingId) => set({
        isOpen: true,
        totalPrice,
        startDate,
        endDate,
        listingId
    }),
    onClose: () => set({isOpen: false}),
    startDate: undefined,
    endDate: undefined
}))


export default useReservationModal