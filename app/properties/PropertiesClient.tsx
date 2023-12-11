'use client'

import React, { useCallback, useState } from 'react'
import { SafeListings, SafeUser } from '../types'
import Container from '../components/Container';
import { useRouter } from 'next/navigation';
import {toast} from 'react-hot-toast';
import axios from 'axios';
import ListingCard from '../components/listings/ListingCard';
import Heading from '../components/Heading';

interface PropertiesClientProps{
    listings: SafeListings[];
    currentUser?: SafeUser | null
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string)=>{
        setDeletingId(id)

        axios.delete(`/api/listings/${id}`).then(()=>{
            toast.success('Listing Deleted');
            router.refresh()
        }).catch((error)=>{
            toast.error(error?.response?.data?.error)
        }).finally(()=>{
            setDeletingId('')
        })
    }, [router])

  return (
    <Container>
        <Heading
            title="Properties"
            subtitle="List of your properties "
        />
        <div className='
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
        '>
            {listings.map((listing)=>(
                <ListingCard
                    key={listing.id}
                    data={listing}
                
                    actionId={listing.id}
                    onAction={onCancel}
                    disabled={deletingId === listing.id}
                    actionLabel="Delete Property"
                    currentUser={currentUser}
                />
            ))}
        </div>  
    </Container>
  )
}

export default PropertiesClient