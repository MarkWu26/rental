'use client'

import { SafeReservation } from "@/app/types"
import ReservationItem from "./components/ReservationItem";
import Pagination from '@mui/material/Pagination';
import {useState} from 'react'

interface ReservationHistoryProps{
  reservations: SafeReservation[] & {
    totalEarnings?: number
  };
  isAdmin?: boolean
}

const ReservationHistory: React.FC<ReservationHistoryProps> = ({
  reservations,
  isAdmin = false
}) => {

  console.log(reservations)

  const reservationsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const lastReviewIndex = currentPage * reservationsPerPage;
    const firstReviewIndex = lastReviewIndex - reservationsPerPage;
    const slicedReservations = reservations.slice(firstReviewIndex, lastReviewIndex);

    const totalPages = Math.ceil(reservations.length / reservationsPerPage);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        console.log('the new page: ', page)
        setCurrentPage(page);
      };

  return (

    <div className="xl:w-[65%] w-full md:w-[65%] flex flex-col gap-4 rounded-xl bg-white border-[1px] border-neutral-100 shadow-xl py-4 relative ">
      <div className="font-bold px-6 text-lg">
        Reservation History
      </div>
      <hr/>
      <div className="flex flex-row px-6 pb-2">
        <div className="w-[35%]">
          Name
        </div>
        <div className="w-[30%]">
          Rentee
        </div>
        <div className="w-[40%]">
          Dates
        </div>
        <div  className="w-[25%]">
          Earnings
        </div>
        <div  className="w-[20%]">
          Status
        </div>
        {!isAdmin && (
        <div  className="w-[15%]">
        Action
        </div>
        )}
       
      </div>
      <div className="flex flex-col gap-4 px-6 overflow-y-auto pb-2">

        {slicedReservations.map((reservation)=> (
          <>
          <div
          key={reservation.id}
          className=""
          >
          <ReservationItem
          key={reservation.id}
          reservation={reservation}
          isAdmin={isAdmin}
          />
          </div>
          <hr/>
          </>
        ))}
        
      </div>


      <div className="">
      <hr/>
        <Pagination 
        shape="rounded"
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        className='mt-4'
        />
      </div>
     
    </div>
  )
}

export default ReservationHistory