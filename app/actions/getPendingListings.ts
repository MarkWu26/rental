import prisma from '@/app/libs/prismadb'

export interface IListingParams{
    userId?: string
}

export default async function getPendingListings(
    params: IListingParams
){
    try {
        const {userId} = params

        let query: any = {
            status : 2
        }

        if(userId){
             query.userId = userId
        }


        const listings = await prisma.listing.findMany({
            where: query,
            orderBy:{
                createdAt: 'desc'
            }
        })

        const safeListings = listings.map((listing)=>({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            checkinTime: listing.checkinTime.toISOString(),
            checkoutTime: listing.checkoutTime.toISOString(),
        }))

        return safeListings;
    } catch (error:any) {
        throw new Error(error)
    }
}