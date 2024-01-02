import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById'
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react'
import ListingClient from './ListingClient';
import getReservations from '@/app/actions/getReservations';
import getReviews from '@/app/actions/getReviews';

interface IParams{
  listingId?: string;
}

const ListingPage = async ({params}:{params:IParams}) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;
  const reservation = await getReservations({userId, ...params})
  const reviews = await getReviews(params);
 

 console.log('reservation of user: ', reservation)
  if(!listing){
    return (
      <ClientOnly>
        <EmptyState/>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
        reviews={reviews}
        reservation={reservation}
      
      />
    </ClientOnly>
  )
}

export default ListingPage