'use client'

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import useSuccessModal from "@/app/hooks/useSuccessModal";
import { SafeListings, SafeReservation, SafeUser } from "@/app/types";
import axios from "axios";
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import {toast} from "react-hot-toast";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps{
    reservations?: SafeReservation[];
    listing: SafeListings & {
        user: SafeUser
    }
    currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
    currentUser,
    listing,
    reservations = []

}) => {
    const loginModal = useLoginModal();
    const router = useRouter();
    const successModal = useSuccessModal();

    const disabledDates = useMemo(()=>{
        let dates: Date[] = []

        reservations.forEach((reservation)=>{
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })

            dates = [...dates, ...range]
        })

        return dates
    }, [reservations])

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    const onCreateReservation = useCallback(()=>{
        if(!currentUser){
            return loginModal.onOpen()
        }

        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        }).then(()=>{
        /*     toast.success('Listing Reserved Successfully!'); */
            successModal.onOpen('Reservation on process!', 
            'Please wait for 24 hours as we verify your reservation. Thank you!');
            setDateRange(initialDateRange);
        }).catch(()=>{
            toast.error('Something went wrong.')
        }).finally(()=>{
            setIsLoading(false)
        })
    }, [
        totalPrice,
        dateRange,
        listing?.id,
        successModal,
        currentUser,
        loginModal
    ]);

    const approveProperty = useCallback(()=>{
        if(!currentUser?.isAdmin){
            
        }
    }, [])

    useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )
            if(dayCount && listing.price){
                setTotalPrice(dayCount * listing.price)
            } else {
                setTotalPrice(listing.price)
            }
        }
    }, [listing.price, dateRange])

    const category = useMemo(()=>{
        return categories.find((item)=> item.label === listing.category)
    }, [listing.category])
  return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <ListingHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing.id}
                    userId={listing.userId}
                    currentUser={currentUser}
                    status={listing.status}
                    category={listing.category}
                    latlng={listing.latlng}
                    roomCount={listing.roomCount}
                    bathRoomCount={listing.bathRoomCount}
                    guestCount={listing.guestCount}
                    listing={listing}
                />
                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-7
                    md:gap-10
                    mt-6
                ">
                    <ListingInfo
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        guestCount={listing.guestCount}
                        bathRoomCount={listing.bathRoomCount}
                        locationValue={listing.latlng}
                    />
                    <div
                    className="order-first mb-10 md:order-last md:col-span-3"
                    >
                        <ListingReservation
                            price={listing.price}
                            totalPrice={totalPrice}
                            onChangeDate={(value)=>setDateRange(value)}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            disabled={isLoading}
                            disabledDates={disabledDates}
                        />
                    </div>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default ListingClient