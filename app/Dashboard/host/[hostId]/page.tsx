import ClientOnly from '@/app/components/ClientOnly';
import DashboardClient from './DashboardClient';
import getCheckinToday from '@/app/actions/dashboardActions/host/getCheckinToday';
import getTotalEarnings from '@/app/actions/dashboardActions/host/getTotalEarnings';
import getUpcomingReservationsCount from '@/app/actions/dashboardActions/host/getUpcomingReservationsCount';
import getReservationsCount from '@/app/actions/dashboardActions/host/getReservationsCount';
import getMonthlyEarnings from '@/app/actions/dashboardActions/host/getMonthlyEarnings';
import getApprovedReservations from '@/app/actions/dashboardActions/host/getApprovedReservations';
import getMonthlyReservations from '@/app/actions/dashboardActions/host/getMonthlyReservations';
import getListingReserveCount from '@/app/actions/dashboardActions/host/getListingReserveCount';
import getPendingReservationsCount from '@/app/actions/dashboardActions/host/getPendingReservationsCount';
import getRejectedReservationsCount from '@/app/actions/dashboardActions/host/getRejectedReservationsCount';
import getInProgressTripsToday from '@/app/actions/dashboardActions/host/getInProgressTripsToday ';
import getAllListings from '@/app/actions/dashboardActions/host/getAllListings';
import getApprovedListingsCount from '@/app/actions/dashboardActions/host/getApprovedListingsCount';
import getPendingListingsCount from '@/app/actions/dashboardActions/host/getPendingListingsCount';
import getRejectedListingsCount from '@/app/actions/dashboardActions/host/getRejectedListingsCount';


interface IParams{
    hostId?: string | undefined
}

const HostPage = async ({params}:{params: IParams}) => {
    const checkinToday = await getCheckinToday({hostId: params.hostId});
    const totalEarnings = await getTotalEarnings({hostId: params.hostId});
    const upcomingReservations = await getUpcomingReservationsCount({hostId: params.hostId});
    const totalReservations = await getReservationsCount({hostId: params.hostId});
    const monthlyEarnings = await getMonthlyEarnings({hostId: params.hostId});
    const approvedReservations = await getApprovedReservations({userId: params.hostId});
    const monthlyReservations = await getMonthlyReservations({hostId: params.hostId});
    const listingReservationCount = await getListingReserveCount({userId: params.hostId})
    const pendingReservationsCount = await getPendingReservationsCount({hostId: params.hostId})
    const rejectedReservationsCount = await getRejectedReservationsCount({hostId: params.hostId})
    const tripsInProgress = await getInProgressTripsToday({hostId: params.hostId})
    const allListings = await getAllListings({userId: params.hostId})
    const approvedListings = await getApprovedListingsCount({hostId: params.hostId});
    const pendingListings = await getPendingListingsCount({hostId: params.hostId});
    const rejectedListings = await getRejectedListingsCount({hostId: params.hostId});

    console.log('total earnings: ', approvedReservations)

    return (
        <ClientOnly>
            <DashboardClient
            checkinToday={checkinToday}
            totalEarnings={totalEarnings}
            upcomingReservations={upcomingReservations}
            totalReservations={totalReservations}
            monthlyEarnings={monthlyEarnings}
            approvedReservations={approvedReservations}
            monthlyReservations={monthlyReservations}
            listingReservationCount={listingReservationCount}
            pendingReservations={pendingReservationsCount}
            rejectedReservations={rejectedReservationsCount}
            tripsInProgress={tripsInProgress}
            allListings={allListings}
            approvedListings={approvedListings}
            pendingListings={pendingListings}
            rejectedListings={rejectedListings}
            />
        </ClientOnly>
    )
}

export default HostPage