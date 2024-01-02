'use client'

import Rating from '@mui/material/Rating';
import { useEffect, useState } from "react"

interface ReviewInputProps{
  setCustomValue?: (id:string, value: any) => void;
  isReview?: boolean
  value?: number | null
  maxValue?: number | undefined
  isInfo?: boolean
}

const ReviewInput: React.FC<ReviewInputProps> = ({
  setCustomValue,
  isReview = false,
  value = 1,
  maxValue = 5,
  isInfo = false
}) => {
  const [rating, setRating] = useState<number | null>(value);

  useEffect(()=>{
    setRating(value)
  }, [value])

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
    size={isReview ? 'small' : isInfo ? 'medium' : 'large'}
    readOnly={isReview}
    max={maxValue}
    />
      
    </div>
  )
}

export default ReviewInput