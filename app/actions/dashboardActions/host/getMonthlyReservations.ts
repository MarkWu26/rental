import prisma from '@/app/libs/prismadb';
import {format} from 'date-fns'

interface IParams {
  hostId?: string;
}

interface ReservationsPerMonth {
    [key: string]: number;
  }
  

export default async function getMonthlyReservations(params: IParams) {
  const { hostId } = params;

  const allReservations = await prisma.reservation.findMany({
    where: {
        listing: {
            userId: hostId
        },
        status: 1,
      },
        orderBy:{
          createdAt: 'asc'
        }
  });

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const reservationsPerMonth: ReservationsPerMonth = {};

  allReservations.forEach((reservation) => {
    const monthYear = format(reservation.createdAt, 'MMMM yyyy')// Extracts "YYYY-MM" from the date
    const monthName = capitalize(monthYear.split(' ')[0])
    if (!reservationsPerMonth[monthName]) {
      reservationsPerMonth[monthName] = 0;
    }

    reservationsPerMonth[monthName]++;
  });

  const reservationsData = [reservationsPerMonth].flatMap((monthData)=>
  Object.entries(monthData).map(([month, reservations]) => ({
    month,
    reservations
  })))
  return reservationsData;
  
}
