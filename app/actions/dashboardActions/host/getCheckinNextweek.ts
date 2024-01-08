import prisma from '@/app/libs/prismadb'

interface IParams{
    hostId?: string;
}

export default async function getCheckinNextweek (params: IParams) 
{
 try {
    const {hostId} = params

    const today = new Date();
    today.setHours(0, 0, 0, 0)
    
    const checkinCountToday = await prisma.reservation.count({
        where: {
            status: 3,
            userId: hostId,
            startDate: {
                gte: new Date(today.getTime() + 7 + 24 * 60 * 60 * 1000), // Greater than or equal to the start of tomorrow
              },
        }
    })

    return checkinCountToday
 } catch (error: any) {
    throw new Error(error)
 }
}
