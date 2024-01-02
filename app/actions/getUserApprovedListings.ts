import prisma from '@/app/libs/prismadb'

 /* this function is to get the current user's approved listings 
 for filtering approved listings */

interface IParams{
    userId?: string;
   
}

export default async function getUserApprovedListings(
  params: IParams
){
    try {

        const {userId} = params

        const listings = await prisma.listing.findMany({
            where: {
                status: 1,
                userId: userId
            },
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