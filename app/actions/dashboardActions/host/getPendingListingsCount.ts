import prisma from '@/app/libs/prismadb'

interface IParams{
    hostId?: string;
}

export default async function getPendingListingsCount (params: IParams) 
{
 try {
    const {hostId} = params

    const pendingListings = await prisma.listing.count({
        where: {
            status: 2,
            userId: hostId,
        }
    })

    return pendingListings
 } catch (error: any) {
    throw new Error(error)
 }
}
