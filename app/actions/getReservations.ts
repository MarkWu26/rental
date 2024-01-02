import prisma from '@/app/libs/prismadb'

interface IParams{
    listingId?: string | undefined | null;
    userId?: string | undefined | null;
    authorId?: string | undefined| null;
}

export default async function getReservations(
    params: IParams
) {
    try {
        
    
    const {listingId, userId, authorId} = params;


    const query: any = {};

    if(listingId){
        query.listingId = listingId
    }

    if(userId){
        query.userId = userId
    }

    if(authorId){
        query.listing = {userId: authorId}
    }

    const reservations = await prisma.reservation.findMany({
        where: query,
        include:{
            listing: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const safeReservations = reservations.map((reservation)=> ({ 
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        listing:{
            ...reservation.listing,
            createdAt: reservation.listing.createdAt.toISOString(),
            checkinTime: reservation.listing.checkinTime.toISOString(),
            checkoutTime: reservation.listing.checkoutTime.toISOString(),
        }
    }))

    return safeReservations

    } catch (error: any) {
        console.error(error)
        console.log('there is an error: ', error)
        throw new Error ('error')
       
    }
}