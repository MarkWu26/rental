'use client'

import Rating from '@mui/material/Rating';
import { useEffect, useState } from "react"

interface ReviewInputProps{
  setCustomValue?: (id:string, value: any) => void;
  isReview?: boolean
  value?: number
}

const ReviewInput: React.FC<ReviewInputProps> = ({
  setCustomValue,
  isReview = false,
  value = 1
}) => {
  console.log('the value is: ', value)
  const [rating, setRating] = useState<number | null>(value);
  console.log('the rating is: ', rating)

  const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    setRating(newValue);
    setCustomValue?.('ratingValue', newValue)
  }

  return (
    <div className={`flex flex-col items-center ${isReview? 'justify-start' : 'justify-center'} gap-4`}>
    <Rating
    name="simple-controlled"
    value={rating}
    onChange={handleRatingChange}
    size={isReview ? 'small' : 'large'}
    readOnly={isReview}
    />
      
    </div>
  )
}

export default ReviewInput