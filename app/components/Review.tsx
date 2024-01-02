import React from 'react'
import { SafeReview, SafeUser } from '../types'
import Avatar from './Avatar'
import { format, parseISO } from 'date-fns'
import ReviewInput from './inputs/ReviewInput'
import { MdOutlineModeEditOutline, MdDeleteOutline } from "react-icons/md";
import useReviewModal from '../hooks/useReviewModal'
import useDeleteReviewModal from '../hooks/useDeleteReviewModal'

interface ReviewProps{
    review: SafeReview & {
        user?: SafeUser | undefined
    }
    isUserReview?: boolean;
    ratingValue?: number;
    comment?: string;
    currentUser?: SafeUser | null
}

const Review: React.FC<ReviewProps> = ({
  review,
  isUserReview = false,
   ratingValue,
   comment,
   currentUser
}) => {

    const reviewModal = useReviewModal();
    const deleteModal = useDeleteReviewModal();

    //format the date
    const dateObject = parseISO(review.updatedAt);
    const formattedDate = format(dateObject, 'yyyy-MM-dd HH:mm')

  return (
    <div className='flex flex-col gap-4'>
       <div className="flex flex-col ">
        {isUserReview && (
            <div className="font-semibold  text-lg pb-4">
            Your review
            </div>
        )}
       <div className='flex flex-row gap-3'>
        
        {/* Avatar */}
        <div>
            <Avatar
            src={review.user?.image}
            isReview
            />
        </div>

        <div className='flex flex-col w-full'>
            <div 
            className={
                `text-sm 
                ${isUserReview ? 'font-semibold' : ''}
                w-full
                flex 
                flex-row
                justify-between
            `}
            >
                {review.user?.name}
                {isUserReview && (
                    <div className="">
                        <MdOutlineModeEditOutline
                        size="24"
                        className="
                        text-rose-500
                        cursor-pointer
                        hover:opacity-90
                        transition
                        ease-in-out
                        duration-200
                        "
                        onClick={()=> reviewModal.onOpen(ratingValue, comment, true, review.id)}
                        />
                    </div>
                )}
                {currentUser?.isAdmin === true && (
                    <div>
                          <MdDeleteOutline
                        size="24"
                        className="
                        text-rose-500
                        cursor-pointer
                        hover:opacity-90
                        transition
                        ease-in-out
                        duration-200
                        "
                        onClick={()=> deleteModal.onOpen(review.id)}
                        />
                    </div>
                )}
            
            </div>
             {/* Info stars */}
            <div className='justify-start flex flex-row'>
                <ReviewInput
                isReview
                value={review.ratingValue}
                />
            </div>
            <div className="text-xs mt-1 text-neutral-600">
                {formattedDate}
            </div>
            <div className='mt-4 text-sm'>
                {review.comment}
            </div>
        </div>

   </div>
       </div>
      
        
    </div>
  )
}

export default Review