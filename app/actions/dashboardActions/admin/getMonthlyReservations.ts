import prisma from '@/app/libs/prismadb';
import {format} from 'date-fns'

interface ReservationsPerMonth {
    [key: string]: number;
}

export default async function getMonthlyReservations() {

  const allReservations = await prisma.reservation.findMany({
    where: {
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
