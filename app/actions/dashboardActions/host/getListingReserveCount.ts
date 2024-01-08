import prisma from '@/app/libs/prismadb';

interface IParams {
  userId?: string;
}

export default async function getListingReserveCount(params: IParams) {
  const { userId } = params;

  // Fetch reservations for the given user
  const reservations = await prisma.reservation.findMany({
    where: {
      listing: {
        userId
      },
      status: 1
    },
    include:{
        listing: true
    }
  });

// Count reservations for each listing and store the title
const reservationCounts: Record<string, number> = {};
const listingTitles: Record<string, string> = {};

reservations.forEach((reservation) => {
    const { listingId, listing } = reservation;
    const title = listing?.title || ''; 
    listingTitles[listingId] = title;
    reservationCounts[listingId] = (reservationCounts[listingId] || 0) + 1;
  });

  // Filter out listings with 0 reservations
  const resultArray = Object.entries(reservationCounts)
    .filter(([_, count]) => count > 0) // Exclude listings with 0 reservations
    .map(([listingId, count]) => ({
      [listingTitles[listingId]]: count,
    }));

  return resultArray;
}
