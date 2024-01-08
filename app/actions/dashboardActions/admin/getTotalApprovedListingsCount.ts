import prisma from '@/app/libs/prismadb'



export default async function getTotalApprovedListingsCount () {
 try {


    const approvedListings = await prisma.listing.count({
        where: {
            status: 1,
        }
    })

    return approvedListings
 } catch (error: any) {
    throw new Error(error)
 }
}
