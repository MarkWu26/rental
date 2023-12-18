import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById'
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react'
import ReservationClient from './ReservationClient';
import getReservationById from '@/app/actions/getReservationById';
import getReservations from '@/app/actions/getReservations';

interface IParams{
  listingId?: string;
  reservationId?: string;
}

const ReservationPage = async ({params}:{params:IParams}) => {
    console.log('the params is: ', params)
  const listing = await getListingById(params);
  const reservation = await getReservationById(params)
  const allReservations = await getReservations(params)
  const currentUser = await getCurrentUser();
  console.log('all reservations: ', allReservations)

  if(!listing){
    return (
      <ClientOnly>
        <EmptyState/>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ReservationClient
        listing={listing}
        reservation={reservation}
        currentUser={currentUser}
        allReservations={allReservations}
      />
    </ClientOnly>
  )
}

export default ReservationPage