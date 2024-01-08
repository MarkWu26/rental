import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"

import getCurrentUser from "../actions/getCurrentUser"
import getReservations, {IParams} from "../actions/getReservations"
import ReservationsClient from "./ReservationsClient";

interface ReservationProps{
    searchParams: IParams;
}

const ReservationsPage = async ({searchParams} : ReservationProps) => {
    const currentUser = await getCurrentUser();

    const reservations = await getReservations({...searchParams, authorId: currentUser?.id});

    console.log('reservations: ', reservations)

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }

    if(reservations.length === 0) {
        return(
            <ClientOnly>
                <EmptyState
                    title={`No 
                    ${searchParams.filter === 'Pending' ? 'pending' : 
                    searchParams.filter === 'Approved' ? 'approved ' : 
                    searchParams.filter === 'Rejected' ? 'rejected' : ''} properties found`}
                    subtitle={`Looks like you have 
                    ${searchParams.filter === 'Pending' ? 'no pending' : 
                    searchParams.filter === 'Approved' ? 'no approved ' : 
                    searchParams.filter === 'Rejected' ? 'no rejected' : 'no'} properties.`}
                />
            </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
            
        />
    </ClientOnly>
  )
}

export default ReservationsPage