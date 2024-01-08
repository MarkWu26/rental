import prisma from '@/app/libs/prismadb';

interface IParams {
  userId?: string;
}

export default async function getAllListings(params: IParams) {
  const { userId } = params;

  const listings = await prisma.listing.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const listingIds = listings.map((listing) => listing.id);

  const reservations = await prisma.reservation.findMany({
    where: {
      listingId: {
        in: listingIds,
      },
      status: 1, // Assuming status 1 means an approved reservation
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Create a mapping of listingId to totalEarnings
  const totalEarningsMap: Record<string, number> = {};
  reservations.forEach((reservation) => {
    totalEarningsMap[reservation.listingId] = (totalEarningsMap[reservation.listingId] || 0) + reservation.totalPrice;
  });

  const calculateEarnings = (totalPrice: number) => {
    const feePercentage = 3;
    const earnings = totalPrice - (totalPrice * feePercentage) / 100;
    return Math.round(earnings * 100) / 100;
  };

  // Combine listing data with totalEarnings and reservations
  const listingsWithEarnings = listings.map((listing) => {
    const listingReservations = reservations.filter((reservation) => reservation.listingId === listing.id);
    const totalReservations = listingReservations.length;
    const totalEarnings = calculateEarnings(totalEarningsMap[listing.id]) || 0;

    return {
      ...listing,
      totalReservations,
      totalEarnings,
    };
  });


  const safeListings = listingsWithEarnings.map((listing) => ({
    ...listing,
    createdAt: listing.createdAt.toISOString(),
    checkinTime: listing.checkinTime.toISOString(),
    checkoutTime: listing.checkoutTime.toISOString(),
  }));


  return safeListings;
}
