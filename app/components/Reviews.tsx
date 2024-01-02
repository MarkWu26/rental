import React, { useState } from 'react'
import { SafeReview, SafeUser } from '../types'
import Review from './Review'
import EmptyState from './EmptyState'
import Pagination from '@mui/material/Pagination'

interface ReviewProps{
    reviews: SafeReview [] & {
        user?: SafeUser | undefined
    };
    currentUser?: SafeUser | null
    averageRating?: string;
}

const Reviews: React.FC<ReviewProps> = ({
    reviews = [],
    currentUser,
    averageRating
}) => {

    const reviewsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const otherReviews = reviews.filter((review)=> review.userId !== currentUser?.id);
    const userReview = reviews.filter((review)=> review.userId === currentUser?.id);

    const lastReviewIndex = currentPage * reviewsPerPage;
    const firstReviewIndex = lastReviewIndex - reviewsPerPage;
    const currentOtherReviews = otherReviews.slice(firstReviewIndex, lastReviewIndex);

    const totalPages = Math.ceil(otherReviews.length / reviewsPerPage);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        console.log('the new page: ', page)
        setCurrentPage(page);
      };

    if(reviews.length === 0 ){
        return (
            <div className='flex flex-col gap-8 w-full '>
                <div className='text-xl font-semibold w-full'>
                Reviews and Ratings 
                </div>
                <div className='text-neutral-500 font-light'>
                    Looks like no one has left a review yet.
                </div>
            </div>
        )
    }

  return (
    <div className='flex flex-col'>
        <div className='text-xl font-semibold flex flex-row gap-x-4 items-center'>
            <div>
                Reviews and Ratings 
            </div>
           <div className="text-neutral-500 font-light text-lg">
                {averageRating}
           </div>
          
        </div>
        <div>
            {userReview.map((review)=> (
            <>
            <div key={review.id}
            className='flex flex-col gap-8 py-4'
            >
            <Review
            review={review} 
            isUserReview 
            ratingValue={review.ratingValue}
            comment={review.comment}
            />
            </div>
            <hr/>
            </>
            ))}

            {currentOtherReviews.map((review)=>(
                <>
                <div key={review.id}
                className='flex flex-col gap-8 py-4'
                >
                <Review
                review={review}  
                currentUser={currentUser}
                />
                </div>
                <hr/>
                </>
            ))}
        </div>
        <Pagination 
        shape="rounded"
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        className='mt-4'
        />
    </div>
  )
}

export default Reviews