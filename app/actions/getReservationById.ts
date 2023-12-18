import prisma from '@/app/libs/prismadb'

interface IParams{
    listingId?: string;
    reservationId?: string;
}

export default async function getReservationById(
    params: IParams
) {
    try {
        
    
    const {reservationId} = params;


    const reservation = await prisma.reservation.findUnique({
        where: {
            id: reservationId
        },
        include:{
            listing: true,
            user: true
        },
    })

    const safeReservations = { 
        ...reservation,
        createdAt: reservation?.createdAt.toISOString(),
        startDate: reservation?.startDate.toISOString(),
        endDate: reservation?.endDate.toISOString(),
        listing:{
            ...reservation?.listing,
            createdAt: reservation?.listing.createdAt.toISOString()
        },
        user: {
            ...reservation?.user,
            createdAt: reservation?.createdAt.toISOString(),
            updatedAt: reservation?.user.updatedAt.toISOString(),
            emailVerified: reservation?.user.emailVerified?.toISOString() || null
        }
    }

    return safeReservations
    } catch (error) {
        throw new Error ('error')
    }
}