import prisma from '@/app/libs/prismadb'

interface IParams{
    hostId?: string;
}

export default async function getCheckoutToday (params: IParams) 
{
 try {
    const today = new Date();
    today.setHours(0, 0, 0, 0)
    const {hostId} = params
    const checkoutCount = await prisma.reservation.count({
        where: {
            status: 3,
            userId: hostId,
            endDate: {
                gte: today, // Greater than or equal to the start of today
                lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Less than the start of the next day
              },
        }
    })

    return checkoutCount
 } catch (error: any) {
    throw new Error(error)
 }
}
