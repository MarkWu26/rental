'use client';
import Image from 'next/image'

import React from 'react'

interface AvatarProps{
  src?: string | null | undefined
  isReview?: boolean
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  isReview = false
}) => {
  return (
    <Image
    className="rounded-full"
    height={isReview ? '40' : '30'}
    width={isReview ? '40' : '30'}
    alt="Avatar"
    src={src || "/images/placeholder.jpg"}
    />
  )
}

export default Avatar