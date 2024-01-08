'use client'

import useCountries from "@/app/hooks/useCountries";
import { SafeListings, SafeUser, SafeReservation, SafeReview } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { MdOutlineModeEditOutline, MdDeleteOutline } from "react-icons/md";
import { useCallback, useEffect, useState } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import useApprovePropertyModal from "@/app/hooks/useApprovePropertyModal";
import useDeletePropertyModal from "@/app/hooks/useDeletePropertyModal";
import useEditPropertyModal from "@/app/hooks/useEditPropertyModal";
import useRejectPropertyModal from "@/app/hooks/useRejectPropertyModal";
import axios from 'axios'
import { useRouter } from "next/navigation";
import { HiChatBubbleLeftEllipsis } from "react-icons/hi2";
import useReviewModal from "@/app/hooks/useReviewModal";

interface ListingHeadProps{
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
    status: Number;
    userId?: string;
    category: string;
    latlng: number[];
    bathRoomCount: Number;
    guestCount: Number;
    roomCount: Number;
    listing?: SafeListings | null;
    reservation: SafeReservation[];
    reservationStatus?: Number | null;
    reviews: SafeReview[]
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser,
    status, //status of the listing 1-accepted, 2-pending, 3-rejected
    userId,
    latlng,
    listing,
    reservation,
    reviews
}) => {
    const {getByValue} = useCountries();
    const loginModal = useLoginModal();
    const approveModal = useApprovePropertyModal();
    const deleteModal = useDeletePropertyModal()
    const editModal = useEditPropertyModal();
    const rejectModal = useRejectPropertyModal();
    const addReviewModal = useReviewModal();
    const router = useRouter();

    const today = new Date()
    
    //check if the user has completed a trip even once so he can make a review
    const isTripDone = reservation.some((trip)=>{ 
        if(reservation.length === 0){
            return false;
        } else{
            const endDate = new Date(trip.endDate);
          
            return today.getTime() >= endDate.getTime()
        }
    })

    //check if the user has a valid trip
    const isTripValid = reservation.some((trip)=> trip.status === 3)

    //check if the user already has left a comment on this propery
    const hasCommented = reviews.some((review)=> 
        (review.listingId === listing?.id && review.userId === currentUser?.id) 
    );

    const [showReview, setShowReview] = useState(false)

    //to check if the user has a valid trip and if done then show the review button, else dont show
    useEffect(()=>{
        if(!isTripDone || !isTripValid || hasCommented){
            setShowReview(false)
        } else {
            setShowReview(true)
        }
    }, [isTripDone, isTripValid, hasCommented])

    const onApprove= useCallback(()=>{
        if(!currentUser?.isAdmin){
            return loginModal.onOpen();
        }
        approveModal.onOpen(id);
    }, [currentUser?.isAdmin, approveModal, loginModal, id]);

    const onDelete= useCallback(()=>{
        if(currentUser?.isAdmin || (currentUser?.id === userId)){
            deleteModal.onOpen(id);
        } else {
            return loginModal.onOpen();
        }
       
    }, [currentUser?.isAdmin, 
        deleteModal, 
        loginModal, 
        id,
        currentUser?.id,
        userId
    ]);

    const onEdit= useCallback(()=>{
        
        if(currentUser?.isAdmin || (currentUser?.id === userId)){
            editModal.onOpen(listing, locationValue, latlng);
        } else{
            return loginModal.onOpen();
        }

    }, [currentUser?.isAdmin, 
        editModal, 
        loginModal, 
        listing, 
        locationValue, 
        latlng,
        currentUser?.id,
        userId
    ])

    const onReject= useCallback(()=>{
        if(currentUser?.isAdmin || (currentUser?.id === userId)){
            rejectModal.onOpen(id);
        } else{
            return loginModal.onOpen();
        }

        
    }, [currentUser?.isAdmin, 
        rejectModal, 
        loginModal, 
        currentUser?.id,
        userId,
        id
    ])

    const onCreateChat = useCallback(()=>{
        axios.post('/api/conversations', { userId: userId })
        .then((data) => {
          router.push(`/conversations/${data.data.id}`);
        })
    }, [router, userId])

    const location = getByValue(locationValue)
  return (
   <>
        <div className="flex flex-row justify-between">
        <Heading
            title={title}
            subtitle={`${location?.region}, ${location?.label}`}
        />
         <div className="items-center flex gap-x-4 flex-row">
        {currentUser?.isAdmin && status === 2 && (
            <>
                <button 
                className="
                flex py-[10px]
                px-6 
              bg-green-500
               text-white
                rounded-[10px]
                text-md hover:opacity-90
                gap-x-2
                flex-row
                "
                onClick={onApprove}
                >
                    Approve 
                    <IoIosCheckmarkCircle 
                        size={24}
                    />
                </button>
                <button 
                className="
                items-center 
                flex py-[10px] 
                rounded-[10px]
                bg-red-500
                text-white
                px-6 
                gap-x-2
                text-md hover:opacity-90"
                onClick={onReject}
                >
                    <div></div>
                    Reject
                    <MdCancel
                        size={22}
                    />
                </button>
            </>
            
        )}
        {status !== 3 && (currentUser?.isAdmin || userId === currentUser?.id) && (
            <>
                <button 
                className="
                items-center 
                flex py-[10px] 
                rounded-[10px]
                bg-indigo-500
                text-indigo-50
                px-6 
                gap-x-2
                font-semibold
                text-md hover:opacity-90"
                onClick={onEdit}
                >
                    <div></div>
                    Edit
                    <MdOutlineModeEditOutline
                        size={22}
                    />
                </button>
            </>
        )}
        {status !== 2 && (userId === currentUser?.id || currentUser?.isAdmin) && (
            <>
             <button 
                className="
                items-center 
                flex py-[10px] 
                rounded-[10px]
                bg-red-500
                text-white
                px-6 
                gap-x-2
                text-md hover:opacity-90"
                onClick={onDelete}
                >
                    <div></div>
                    Delete
                    <MdDeleteOutline
                        size={22}
                    />
                </button>
            </>
        )}
        {(userId !== currentUser?.id && (currentUser?.isAdmin === false || currentUser?.isAdmin === null)) 
        && (
             <>
             {showReview && (
            <button
            className="
            items-center 
            flex py-[10px] 
            rounded-[10px]
            bg-rose-500
            text-white
            px-6 
            gap-x-2
            text-md hover:opacity-90"
            onClick={()=>addReviewModal.onOpen()}
            >
            Review
            </button>
             )}
         
             <button 
                className="
                items-center 
                flex py-[10px] 
                rounded-[10px]
                bg-rose-500
                text-white
                px-6 
                gap-x-2
                text-md hover:opacity-90"
                onClick={onCreateChat}
                >
                    <div></div>
                    Chat with owner
                    <HiChatBubbleLeftEllipsis
                        size={22}
                    />
                </button>
            </>
        )}
        </div>
           
        </div>
        <div className="
            w-full
            h-[60vh]
            overflow-hidden
            rounded-xl
            relative
        ">
            <Image
                alt="Image"
                src={imageSrc}
                fill
                className="object-cover w-full"
            />
            {(!currentUser?.isAdmin || !currentUser) && (
                <div className="absolute top-5 right-5">
                <HeartButton
                    listingId={id}
                    currentUser={currentUser}
                />
                </div>
            )}
           
        </div>
   </>
  )
}

export default ListingHead