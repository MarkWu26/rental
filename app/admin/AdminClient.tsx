'use client'

import React, { useCallback, useState } from 'react'
import { SafeListings, SafeUser } from '../types'
import Container from '../components/Container';
import { useRouter } from 'next/navigation';
import {toast} from 'react-hot-toast';
import axios from 'axios';
import ListingCard from '../components/listings/ListingCard';
import Heading from '../components/Heading';

interface AdminClientProps{
    listings: SafeListings[];
    currentUser?: SafeUser | null;
    filter?: string
}

const AdminClient: React.FC<AdminClientProps> = ({
    listings,
    currentUser,
    filter = "All"
}) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string)=>{
       router.push(`/listings/${id}`)
    }, [router])

  return (
    <Container>
        <div className="pt-[56px]">
        <Heading
            title={`${filter} Properties`}
            subtitle={`${filter === 'All' ? `List of all properties`
             : `List of all ${filter.toLowerCase()} properties`}. Select a property to manage. `}
        />
        <div className='
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-8
        '>
            {listings.map((listing)=>(
                <ListingCard
                    key={listing.id}
                    data={listing}
                    actionId={listing.id}
                    onAction={onCancel}
                    disabled={deletingId === listing.id}
                    actionLabel="Manage Property"
                    currentUser={currentUser}
                />
            ))}
        </div>  
        </div>
    </Container>
  )
}

export default AdminClient