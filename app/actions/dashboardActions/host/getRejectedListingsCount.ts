import prisma from '@/app/libs/prismadb'

interface IParams{
    hostId?: string;
}

export default async function getRejectedListingsCount (params: IParams) 
{
 try {
    const {hostId} = params

    const rejectedListings = await prisma.listing.count({
        where: {
            status: 3,
            userId: hostId,
        }
    })

    return rejectedListings
 } catch (error: any) {
    throw new Error(error)
 }
}
