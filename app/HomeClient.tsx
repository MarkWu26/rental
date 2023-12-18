'use client'

import React, { useEffect } from 'react'


import { SafeListings, SafeUser } from './types';
import Container from "./components/Container";
import ListingCard from "./components/listings/ListingCard";
import { useRouter } from 'next/navigation';


interface HomeClientProps{
    currentUser: SafeUser | null;
    listings: SafeListings | null;
    
}

const HomeClient: React.FC<HomeClientProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter()
    useEffect(()=>{
        if(currentUser?.isAdmin){
            return router.push('/admin')
        }
    }, [router, currentUser])
  return (
    <Container>
    <div className="
      pt-24
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      gap-8
    ">
     
       {listings.map((listing)=>{
        return (
            <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        )
       })}
  
    </div>
</Container>
  )
}

export default HomeClient