import prisma from '@/app/libs/prismadb'

interface IParams{
    hostId?: string;
}

export default async function getApprovedListingsCount (params: IParams) 
{
 try {
    const {hostId} = params

    const approvedListings = await prisma.listing.count({
        where: {
            status: 1,
            userId: hostId,
        }
    })

    return approvedListings
 } catch (error: any) {
    throw new Error(error)
 }
}
