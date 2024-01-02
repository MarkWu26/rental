import prisma from '@/app/libs/prismadb'

interface IParams{
    listingId?: string;
    reservationId?: string;
}

export default async function getReservationByListing(
    params: IParams
) {
    try {
        
    
    const {listingId} = params;


    const reservations = await prisma.reservation.findMany({
        where: {
            listingId: listingId
        },
        include:{
            listing: true,
            user: true
        },
    })

    const safeReservations = reservations.map((reservation) => ({ 
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
    }))

    return safeReservations
    } catch (error) {
        throw new Error ('error')
    }
}