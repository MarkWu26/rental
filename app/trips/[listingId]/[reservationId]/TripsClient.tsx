'use client'

import Container from "@/app/components/Container";
import TripsHead from "@/app/components/trips/TripsHead";
import TripsInfo from "@/app/components/trips/TripsInfo";
import ListingReservation from "@/app/components/trips/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListings, SafeReservation, SafeUser, SafeReview } from "@/app/types";
import axios from "axios";
import { eachDayOfInterval, differenceInCalendarDays, format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import {toast} from "react-hot-toast";
import Reviews from "@/app/components/Reviews";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface TripsClientProps{
    reservation: SafeReservation & {
        user: SafeUser
    };
    listing: SafeListings & {
        user: SafeUser
    }
    currentUser?: SafeUser | null;
    allReservations: SafeReservation [];
    reviews: SafeReview[]
}

const TripsClient: React.FC<TripsClientProps> = ({
    currentUser,
    listing,
    reservation,
    allReservations = [],
    reviews = []

}) => {
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [canReview, setCanReview] = useState(false)
    const loginModal = useLoginModal();
    const router = useRouter();

    const hasCommented = reviews.some((review)=> (review.listingId === listing?.id && review.userId === currentUser?.id));

    const averageRating = useMemo(()=>{
        //get all the ratings
        const ratingValues = reviews.map((review)=> review.ratingValue);

        //get the averageRating
        const average = ratingValues.reduce((sum, value) => sum + value, 0) / ratingValues.length

        return `${average.toFixed(2)} / 5.0`
    }, [reviews])


    useEffect(()=>{
        if(hasCommented){
            setCanReview(false);
        } else {
            setCanReview(true);
        }
    }, [hasCommented])

    const dayDiff = useMemo(()=>{
        const startDate = new Date (reservation.startDate);
        const endDate = new Date (reservation.endDate);
        const dayCount = differenceInCalendarDays(endDate, startDate);

        return dayCount;
    }, [])

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
    }, [allReservations])

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price)


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

    const reservationDate = useMemo(()=>{
        if(!reservation){
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate)

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    }, [reservation, reservation.startDate, reservation.endDate]);

    console.log('resrvation date: ', reservationDate)

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
    }, [listing.category]);
    
  return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <TripsHead
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
                    guestId={reservation.userId}
                />
                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-7
                    md:gap-10
                    mt-6
                ">
                    <TripsInfo
                        user={reservation.user}
                        category={category}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        guestCount={listing.guestCount}
                        bathRoomCount={listing.bathRoomCount}
                        locationValue={listing.latlng}
                        status={reservation.status}
                        propertyOwner={listing.user}
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
                            reservationDate={reservationDate}
                            startDate={reservation.startDate}
                            endDate={reservation.endDate}
                            dayDiff={dayDiff}
                            canReview={canReview}
                            status={reservation.status}
                            reason={reservation.reason}
                            rentalType={listing.rentalType}
                            cleaningFee={listing.cleaningFee}
                        />
                    </div>
                </div>
            </div>
            <Reviews
             reviews={reviews}
             currentUser={currentUser}
             averageRating={averageRating}
             />
        </div>
    </Container>
  )
}

export default TripsClient