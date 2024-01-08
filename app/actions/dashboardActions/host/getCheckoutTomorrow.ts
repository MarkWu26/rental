import prisma from '@/app/libs/prismadb'

interface IParams{
    hostId?: string;
}

export default async function getCheckoutTomorrow (params: IParams) 
{
 try {
    const {hostId} = params

    const today = new Date();
    today.setHours(0, 0, 0, 0)
    
    const checkoutCountTomorrow = await prisma.reservation.count({
        where: {
            status: 3,
            userId: hostId,
            endDate: {
                gte: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Greater than or equal to the start of tomorrow
                lt: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000) 
              },
        }
    })

    return checkoutCountTomorrow
 } catch (error: any) {
    throw new Error(error)
 }
}
