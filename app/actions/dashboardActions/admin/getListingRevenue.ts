import prisma from '@/app/libs/prismadb';

interface ListingRevenue {
  [title: string]: number;
}

export default async function getListingRevenue(): Promise<ListingRevenue[]> {

  const listings = await prisma.listing.findMany({
    where: {
      status: 1
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
    const earnings = (totalPrice * feePercentage) / 100;
    return Math.round(earnings * 100) / 100;
  };

  const listingRevenue: ListingRevenue[] = [];
  listings.forEach((listing) => {
    const totalEarnings = calculateEarnings(totalEarningsMap[listing.id]) || 0;
    listingRevenue.push({ [listing.title]: totalEarnings });
  });

  return listingRevenue;
}
