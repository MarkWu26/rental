import prisma from '@/app/libs/prismadb';

export default async function getApprovedReservations() {
  const reservations = await prisma.reservation.findMany({
    where: {
      status: 1,
    },
    include: {
      listing: true,
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const calculateEarnings = (totalPrice: number) => {
    const feePercentage = 3;
    const earnings = (totalPrice * feePercentage) / 100;
    return Math.round(earnings * 100) / 100;
  };

  const reservationsWithEarnings = reservations.map((reservation) => ({
    ...reservation,
    createdAt: reservation.createdAt.toISOString(),
    startDate: reservation.startDate.toISOString(),
    endDate: reservation.endDate.toISOString(),
    listing: {
      ...reservation.listing,
      createdAt: reservation.listing.createdAt.toISOString(),
      checkinTime: reservation.listing.checkinTime.toISOString(),
      checkoutTime: reservation.listing.checkoutTime.toISOString(),
    },
    user: {
      ...reservation.user,
    },
    totalEarnings: calculateEarnings(reservation.totalPrice), // Calculate and add total earnings
  }));

  return reservationsWithEarnings;
}
