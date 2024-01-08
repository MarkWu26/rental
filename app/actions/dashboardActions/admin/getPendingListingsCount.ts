import prisma from '@/app/libs/prismadb'


export default async function getPendingListingsCount () 
{
 try {

    const pendingListings = await prisma.listing.count({
        where: {
            status: 2,
        }
    })

    return pendingListings
 } catch (error: any) {
    throw new Error(error)
 }
}
