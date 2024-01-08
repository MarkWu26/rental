import prisma from '@/app/libs/prismadb'

interface IParams{
    hostId?: string;
}

export default async function getCheckinToday (params: IParams) 
{
 try {
    const {hostId} = params

    const today = new Date();
    today.setHours(0, 0, 0, 0)
    
    const checkinCountToday = await prisma.reservation.count({
        where: {
            status: 1,
            listing: {
                userId: hostId
            },
            startDate: {
                gte: today, // Greater than or equal to the start of today
                lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Less than the start of the next day
              },
        }
    })

    return checkinCountToday
 } catch (error: any) {
    throw new Error(error)
 }
}
