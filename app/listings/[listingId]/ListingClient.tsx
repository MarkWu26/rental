'use client'

import Container from "@/app/components/Container";
import Reviews from "@/app/components/Reviews";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import useSuccessModal from "@/app/hooks/useSuccessModal";
import { SafeListings, SafeReservation, SafeReview, SafeUser } from "@/app/types";
import axios from "axios";
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import Image from "next/image";
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
    currentUser?: SafeUser | null;
    reviews: SafeReview[];
    reservation: SafeReservation[];
}

const ListingClient: React.FC<ListingClientProps> = ({
    currentUser,
    listing,
    reservations = [],
    reviews,
    reservation,
}) => {
    const loginModal = useLoginModal();
    const successModal = useSuccessModal();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [dayDiff, setDayDiff] = useState<number | undefined>(undefined)

    const averageRating = useMemo(()=>{
        //get all the ratings
        const ratingValues = reviews.map((review)=> review.ratingValue);

        //get the averageRating
        const average = ratingValues.reduce((sum, value) => sum + value, 0) / ratingValues.length

        return `${average.toFixed(2)} / 5.0`
    }, [reviews])


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
    const [pricePerNight, setPricePerNight] = useState(listing.price);
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    console.log('the date range is: ', dateRange)

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

    console.log('error mssg: ', errorMessage)

    useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )
            if(dayCount && listing.price){
                setTotalPrice((dayCount * listing.price) + listing.cleaningFee)
                setPricePerNight(dayCount * listing.price)
            } else {
                setTotalPrice(listing.price + listing.cleaningFee)
                setPricePerNight(listing.price)
            }

            setDayDiff(dayCount);

            if(listing.rentalType === 'shortTerm'){
                if(dayCount > 28){
                    // show error message please select less than 28 days because it is a short term rental
                    setErrorMessage('Please select 28 days or fewer for short-term rental.');  
                    setIsLoading(true)
                } else{
                    setErrorMessage(null)
                    setIsLoading(false)
                }
            } else {
                if(dayCount < 28) {
                    // show error message please select more than 28 days rental period
                    setErrorMessage('Please select more than 28 days for long-term rental.');
                    setIsLoading(true)
                } else {
                    setErrorMessage(null)
                    setIsLoading(false)
                }
        }
    }}, [listing.price, dateRange, listing.rentalType])

    const category = useMemo(()=>{
        return categories.find((item)=> item.label === listing.category)
    }, [listing.category])

    const handleChangeDate = (value: Range) => {
        setDateRange(value)
    }

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
                    reservation={reservation}
                    reviews={reviews}
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
                        docImageSrc={listing.documentImageSrc}
                        currentUser={currentUser}
                        status={listing.status}
                        averageRating={averageRating}
                        checkinTime={listing.checkinTime}
                        checkoutTime={listing.checkoutTime}
                    />
                    <div
                    className="order-first mb-10 md:order-last md:col-span-3 flex-col flex"
                    >
                        <ListingReservation
                            price={listing.price}
                            totalPrice={totalPrice}
                            onChangeDate={(value)=>handleChangeDate(value)}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            disabled={isLoading}
                            disabledDates={disabledDates}
                            currentUser={currentUser}
                            user={listing.user}
                            listingId={listing.id}
                            rentalType={listing.rentalType}
                            errorMessage={errorMessage}
                            dayDiff={dayDiff}
                            cleaningFee={listing.cleaningFee}
                            pricePerNight={pricePerNight}
                            listingName={listing.title}
                            bathroomCount={listing.bathRoomCount}
                            roomCount={listing.roomCount}
                            category={listing.category}
                            listingImage={listing.imageSrc}
                        />
                        {currentUser?.isAdmin && (
                            <hr/>
                        )}
                       
                        {currentUser?.isAdmin && (
                            <div className="text-xl font-semibold flex flex-col mt-8 gap-4">
                            Owner ID
                            <div className="
                                overflow-hidden 
                                w-full 
                                rounded-xl 
                                h-[30vh]
                                relative
                                "
                            >
                                <Image
                                src={listing.idImageSrc}
                                alt="id"
                                className="object-fit w-full"
                                fill
                                />

                            </div>
                            </div>
                        )}
                       
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

export default ListingClient