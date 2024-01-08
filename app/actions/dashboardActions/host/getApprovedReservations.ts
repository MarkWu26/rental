import prisma from '@/app/libs/prismadb'

interface IParams{
    userId?: string;
}

export default async function getApprovedReservations (params: IParams) {
    const {userId} = params;

    const calculateEarnings = (totalPrice: number) => {
        const feePercentage = 3;
        const earnings = totalPrice - (totalPrice * feePercentage) / 100;
        return Math.round(earnings * 100) / 100;
    }

    const reservations = await prisma.reservation.findMany({
        where: {
            listing:{
                userId
            },
            status: 1
        },
        include:{
            listing: true,
            user: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const safeReservations = reservations.map((reservation)=> ({ 
        ...reservation,
        totalEarnings: calculateEarnings(reservation.totalPrice),
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        listing:{
            ...reservation.listing,
            createdAt: reservation.listing.createdAt.toISOString(),
            checkinTime: reservation.listing.checkinTime.toISOString(),
            checkoutTime: reservation.listing.checkoutTime.toISOString(),
        },
        user:{
            ...reservation.user
        }
    }))

    return safeReservations
}