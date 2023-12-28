import React from 'react'
import { SafeReview, SafeUser } from '../types'
import Review from './Review'
import EmptyState from './EmptyState'

interface ReviewProps{
    reviews: SafeReview [] & {
        user?: SafeUser | undefined
    }
}

const Reviews: React.FC<ReviewProps> = ({
    reviews
}) => {

    if(reviews.length === 0){
        return (
            <div className='flex flex-col gap-8  '>
                <div className='text-xl font-semibold'>
                Reviews and Ratings
                </div>
                <div className='text-neutral-500 font-light'>
                    Looks like no one has left a review yet.
                </div>
           
            
            </div>
           
        )
    }

  return (
    <div className='flex flex-col gap-8'>
        <div className='text-xl font-semibold '>
            Reviews and Ratings
        </div>
        <div>
            {reviews.map((review)=>(
                <>
                <div key={review.id}
                className='flex flex-col gap-8 py-4'
                >
                <Review
                review={review}  
                />
                </div>
                <hr/>
                </>
                
               
            ))}
        </div>
    </div>
  )
}

export default Reviews