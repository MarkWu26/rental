import prisma from '@/app/libs/prismadb'

export default async function getRejectedListingsCount () 
{
 try {

    const rejectedListings = await prisma.listing.count({
        where: {
            status: 3
        }
    })

    return rejectedListings
 } catch (error: any) {
    throw new Error(error)
 }
}
