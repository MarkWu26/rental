'use client'

import Container from "@/app/components/Container";
import ReservationHead from "@/app/components/reservations/ReservationHead";
import ReservationInfo from "@/app/components/reservations/ReservationInfo";
import ListingReservation from "@/app/components/reservations/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
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
    reservation: SafeReservation & {
        user: SafeUser
    };
    listing: SafeListings & {
        user: SafeUser
    }
    currentUser?: SafeUser | null;
    allReservations: SafeReservation []
}

const ListingClient: React.FC<ListingClientProps> = ({
    currentUser,
    listing,
    reservation,
    allReservations = []

}) => {
    console.log('userid: ', reservation.user)
    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(()=>{
        let dates: Date[] = []

        allReservations.forEach((reservation)=>{
            const range = eachDayOfInterval({
                start: new Date(reservation?.startDate),
                end: new Date(reservation?.endDate)
            })

            dates = [...dates, ...range]

        })
            
         
        

        return dates
    }, [reservation])

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
            toast.success('Listing Reserved Successfully!');
            setDateRange(initialDateRange);

            router.push('/trips')
        }).catch(()=>{
            toast.error('Something went wrong.')
        }).finally(()=>{
            setIsLoading(false)
        })
    }, [
        totalPrice,
        dateRange,
        listing?.id,
        router,
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
                setTotalPrice(reservation.totalPrice)
            }
        }
    }, [reservation.totalPrice, dateRange, listing.price])

    const category = useMemo(()=>{
        return categories.find((item)=> item.label === listing.category)
    }, [listing.category])
  return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <ReservationHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing.id}
                    userId={listing.userId}
                    currentUser={currentUser}
                    status={reservation.status}
                    category={listing.category}
                    latlng={listing.latlng}
                    roomCount={listing.roomCount}
                    bathRoomCount={listing.bathRoomCount}
                    guestCount={listing.guestCount}
                    listing={listing}
                    reservationId={reservation.id}
                />
                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-7
                    md:gap-10
                    mt-6
                ">
                    <ReservationInfo
                        user={reservation.user}
                        category={category}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        guestCount={listing.guestCount}
                        bathRoomCount={listing.bathRoomCount}
                        locationValue={listing.latlng}
                        status={reservation.status}
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