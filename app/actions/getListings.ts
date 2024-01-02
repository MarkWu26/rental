import prisma from '@/app/libs/prismadb'

export interface IListingParams{
    userId?: string;
    filter?: string;
}

export default async function getListings(
    params: IListingParams
){
    try {
        const {userId, filter} = params;
        console.log('the current user id is: ', userId)
     

        let query: any = {};

        if(userId){
            query.userId = userId;
        }

        if (filter === 'Pending'){
            query.status = 2
        } else if (filter === 'Approved'){
            query.status = 1
        } else if (filter === 'Rejected'){
            query.status = 3
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy:{
                createdAt: 'desc'
            }
        });

        const safeListings = listings.map((listing)=>({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            checkinTime: listing.checkinTime.toISOString(),
            checkoutTime: listing.checkoutTime.toISOString(),
        }));

        return safeListings;
    } catch (error:any) {
        throw new Error(error)
    }
}