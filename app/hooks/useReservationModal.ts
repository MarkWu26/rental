import {create} from 'zustand'

interface ReservationModalStore {
    isOpen: boolean,
    onOpen: ( totalPrice: number, startDate: Date | undefined, endDate: Date | undefined, listingId: string,
        listingName: string, bathroomCount: number, roomCount: number, category: string, listingImage: string,
        checkinDate: string | null, checkoutDate: string | null, price:number, dayDiff: number | null | undefined,
        pricePerNight: number | undefined, cleaningFee: number | undefined ) => void;
    onClose: () => void;
    totalPrice?: number;
    startDate: Date | undefined;
    endDate: Date | undefined;
    listingId?: string;
    listingName?: string;
    bathroomCount?: number;
    roomCount?: number;
    category?: string;
    listingImage: string | undefined;
    checkinDate?: string | null;
    checkoutDate?: string | null;
    price?: number | null | undefined;
    dayDiff?: number | null | undefined;
    cleaningFee?: number | undefined;
    pricePerNight?: number | undefined;
}

const useReservationModal = create<ReservationModalStore>((set)=> ({
    isOpen: false,
    onOpen: (totalPrice, startDate, endDate, listingId, listingName, bathroomCount, roomCount, category, listingImage,
        checkinDate, checkoutDate, price, dayDiff, pricePerNight, cleaningFee) => set({
        isOpen: true,
        totalPrice,
        startDate,
        endDate,
        listingId,
        listingName,
        bathroomCount,
        roomCount,
        category,
        listingImage,
        checkinDate,
        checkoutDate,
        price,
        dayDiff,
        pricePerNight,
        cleaningFee
    }),
    onClose: () => set({isOpen: false}),
    startDate: undefined,
    endDate: undefined,
    listingImage: undefined
}))


export default useReservationModal