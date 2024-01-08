import ClientOnly from '@/app/components/ClientOnly'
import DashboardClient from './DashboardClient';
import getTotalEarnings from '@/app/actions/dashboardActions/admin/getTotalEarnings';
import getTotalApprovedListingsCount from '@/app/actions/dashboardActions/admin/getTotalApprovedListingsCount';
import getPendingListingsCount from '@/app/actions/dashboardActions/admin/getPendingListingsCount';
import getTotalReservationsCount from '@/app/actions/dashboardActions/admin/getTotalReservationsCount';
import getMonthlyEarnings from '@/app/actions/dashboardActions/admin/getMonthlyEarnings';
import getMonthlyReservations from '@/app/actions/dashboardActions/admin/getMonthlyReservations';
import getInProgressTripsToday from '@/app/actions/dashboardActions/admin/getInProgressTripsToday ';
import getPendingReservationsCount from '@/app/actions/dashboardActions/admin/getPendingReservationsCount';
import getRejectedReservationsCount from '@/app/actions/dashboardActions/admin/getRejectedReservationsCount';
import getUpcomingReservationsCount from '@/app/actions/dashboardActions/admin/getUpcomingReservationsCount';
import getApprovedReservations from '@/app/actions/dashboardActions/admin/getApprovedReservations';
import getListingRevenue from '@/app/actions/dashboardActions/admin/getListingRevenue';
import getAllListings from '@/app/actions/dashboardActions/admin/getAllListings';
import getCheckinToday from '@/app/actions/dashboardActions/admin/getCheckinsToday';
import getTotalListingsCount from '@/app/actions/dashboardActions/admin/getTotalListingsCount';
import getRejectedListingsCount from '@/app/actions/dashboardActions/admin/getRejectedListingsCount';



const AdminDashboardPage = async () => {
  
    const totalEarnings = await getTotalEarnings();
    const approvedListingCount = await getTotalApprovedListingsCount()
    const pendingListings = await getPendingListingsCount()
    const totalReservations = await getTotalReservationsCount();
    const monthlyEarnings = await getMonthlyEarnings();
    const monthlyReservations = await getMonthlyReservations();
    const tripsInProgress = await getInProgressTripsToday();
    const pendingReservations = await getPendingReservationsCount();
    const rejectedReservations = await getRejectedReservationsCount();
    const upcomingReservations = await getUpcomingReservationsCount();
    const approvedReservations = await getApprovedReservations();
    const listingRevenue = await getListingRevenue();
    const allListings = await getAllListings();
    const checkinToday = await getCheckinToday();
    const totalListingsCount = await getTotalListingsCount();
    const rejectedListingsCount = await getRejectedListingsCount()

    return (
        <ClientOnly>
            <DashboardClient
            totalEarnings={totalEarnings}
            approvedListingCount={approvedListingCount}
            pendingListings={pendingListings}
            totalReservations={totalReservations}
            monthlyEarnings={monthlyEarnings}
            monthlyReservations={monthlyReservations}
            tripsInProgress={tripsInProgress}
            pendingReservations={pendingReservations}
            rejectedReservations={rejectedReservations}
            upcomingReservations={upcomingReservations}
            approvedReservations={approvedReservations}
            listingRevenue={listingRevenue}
            allListings={allListings}
            checkinToday={checkinToday}
            totalListings={totalListingsCount}
            rejectedListings={rejectedListingsCount}
            />
        </ClientOnly>
    )
}

export default AdminDashboardPage