import React from 'react'
import { SafeReview, SafeUser } from '../types'
import Avatar from './Avatar'
import { format, parseISO } from 'date-fns'
import ReviewInput from './inputs/ReviewInput'

interface ReviewProps{
    review: SafeReview & {
        user?: SafeUser | undefined
    }
}

const Review: React.FC<ReviewProps> = ({
  review
}) => {

    const dateObject = parseISO(review.updatedAt);
    const formattedDate = format(dateObject, 'yyyy-MM-dd HH:mm')

  return (
    <div className='flex flex-col gap-8'>
       <div className='flex flex-row gap-3'>
            {/* Avatar */}
            <div>
                <Avatar
                src={review.user?.image}
                isReview
                />
            </div>

            {/* Info stars */}
            <div className='flex flex-col'>
                <div className='text-sm '>
                    {review.user?.name}
                </div>
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
  )
}

export default Review