import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById'
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react'
import TripsClient from './TripsClient';
import getReservationById from '@/app/actions/getReservationById';
import getReservations from '@/app/actions/getReservations';
import getReviews from '@/app/actions/getReviews';

interface IParams{
  listingId?: string;
  reservationId?: string;
}

const TripsPage = async ({params}:{params:IParams}) => {

  const listing = await getListingById(params);
  const reservation = await getReservationById(params)
  const allReservations = await getReservations(params)
  const currentUser = await getCurrentUser();
  const reviews = await getReviews(params);

  console.log('reviews:', reviews)

  if(!listing){
    return (
      <ClientOnly>
        <EmptyState/>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <TripsClient
        listing={listing}
        reservation={reservation}
        currentUser={currentUser}
        allReservations={allReservations}
        reviews={reviews}
      />
    </ClientOnly>
  )
}

export default TripsPage