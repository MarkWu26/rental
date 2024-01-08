'use client'

import { SafeListings } from "@/app/types"
import Pagination from '@mui/material/Pagination';
import {useState} from 'react'
import ListingItem from "./components/ListingItem";

interface ListingsProps{
  listings: SafeListings [] & {
    totalReservations?: number;
    totalEarnings?: number;
  }
  isAdmin?: boolean
}

const Listings: React.FC<ListingsProps> = ({
  listings,
  isAdmin = false
}) => {

  const listingsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const lastReviewIndex = currentPage * listingsPerPage;
    const firstReviewIndex = lastReviewIndex - listingsPerPage;
    const slicedListings = listings.slice(firstReviewIndex, lastReviewIndex);

    const totalPages = Math.ceil(listings.length / listingsPerPage);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        console.log('the new page: ', page)
        setCurrentPage(page);
      };

  return (

    <div className="w-full flex flex-col gap-4 rounded-xl bg-white border-[1px] border-neutral-100 shadow-xl py-4 relative ">
      <div className="font-bold px-6 text-lg">
       {isAdmin ? 'All Listings' : 'My Listings'}
      </div>
      <hr/>
      <div className="flex flex-row px-6 pb-2">
        <div className="w-[35%]">
          Name
        </div>
        <div className="w-[25%]">
          Price Per Night
        </div>
        <div className="w-[30%]">
          Accumulated Earnings
        </div>
        <div  className="w-[25%]">
          Total Reservations
        </div>
        <div  className="w-[20%]">
          Status
        </div>
        <div  className="w-[15%]">
          Action
        </div>
      </div>
      <div className="flex flex-col gap-4 px-6 overflow-y-auto pb-2">

        {slicedListings.map((listing)=> (
          <>
          <div
          key={listing.id}
          className=""
          >
          <ListingItem
          listing={listing}
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

export default Listings