import prisma from '@/app/libs/prismadb'

export default async function getTotalListingsCount () {
 try {


    const totalListings = await prisma.listing.count()

    return totalListings
 } catch (error: any) {
    throw new Error(error)
 }
}
