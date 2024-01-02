import prisma from '@/app/libs/prismadb'

export default async function getApprovedListings(
    
){
    try {

        let query: any = {
            status: 1
        };

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
            checkoutTime: listing.checkoutTime.toISOString()
        }));

        return safeListings;
    } catch (error:any) {
        throw new Error(error)
    }
}