'use client'

import Container from "@/app/components/Container"
import CountCard from "@/app/components/dashboard/CountCard";
import RevenueTrendLine from "@/app/components/dashboard/charts/RevenueTrendLine";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { FaChartSimple } from "react-icons/fa6";
import ReservationHistory from "@/app/components/dashboard/ReservationHistory";
import { SafeListings, SafeReservation } from "@/app/types";
import MonthlyReservationBar from "@/app/components/dashboard/charts/MonthlyReservationBar";
import ListingReservationPie from "@/app/components/dashboard/charts/ListingReservationPie";
import { IoMdClose } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";
import ReservationsCountCard from "@/app/components/dashboard/ReservationsCountCard";
import Listings from "@/app/components/dashboard/Listings";
import ListingsCountCard from "@/app/components/dashboard/ListingsCountCard";

interface MonthlyReservations {
  month: string;
  reservations: number;
}

interface MonthlyData {
  month: string;
  earnings: number;
}

interface ListingReservation {
  [name: string]: number
}

interface countReservation {
  totalReservations: number
}

interface DashboardClientProps{
  checkinToday: number;
  totalEarnings: number;
  upcomingReservations?: number;
  totalReservations: number
  monthlyEarnings: MonthlyData[];
  approvedReservations: SafeReservation[];
  monthlyReservations: MonthlyReservations[];
  listingReservationCount: ListingReservation[];
  pendingReservations: number;
  rejectedReservations: number;
  tripsInProgress: number;
  allListings: SafeListings [];
  approvedListings: number;
  pendingListings: number;
  rejectedListings: number;
}

const DashboardClient: React.FC<DashboardClientProps> = ({
  checkinToday,
  totalEarnings,
  upcomingReservations,
  totalReservations,
  monthlyEarnings,
  approvedReservations,
  monthlyReservations,
  listingReservationCount,
  pendingReservations,
  rejectedReservations,
  tripsInProgress,
  allListings,
  approvedListings,
  pendingListings,
  rejectedListings
}) => {

  const widgetNames = [
    {
      title: 'Total Earnings',
      value: `₱ ${totalEarnings.toFixed(2)}`,
      icon: FaRegMoneyBillAlt
    },
    {
      title: 'Upcoming Reservations',
      value: upcomingReservations,
      icon: FaCalendarAlt
    },
    {
      title: 'Check-ins Today',
      value: checkinToday,
      icon: IoKeySharp
    },
    {
      title: 'Total Reservations',
      value: totalReservations,
      icon: FaChartSimple
    },
  ]

  const reservationCardNames = [
    {
      title: 'Trips in Progress',
      value: tripsInProgress,
      icon: IoKeySharp
    },
    {
      title: 'Pending Reservations',
      value: pendingReservations,
      icon: MdOutlinePendingActions
    },
    {
      title: 'Rejected Reservations',
      value: rejectedReservations,
      icon: IoMdClose
    },
  ]

  const listingCardData = [
    {
      title: 'Active Listings',
      value: approvedListings,
      icon: IoKeySharp
    },
    {
      title: 'Pending Listings',
      value: pendingListings,
      icon: MdOutlinePendingActions
    },
    {
      title: 'Rejected Listings',
      value: rejectedListings,
      icon: IoMdClose
    },
  ]

  return (
    <div className="">
    <Container>
         <div className="text-2xl font-bold pb-8">
            Dashboard
        </div>

        <div className="xl:w-full w-auto">
          <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-8
          lg:gap-x-4
          ">
            {widgetNames.map((widget)=> (
                <CountCard
                    title={widget.title}
                    value={widget.value}
                    key={widget.title}
                    icon={widget.icon}
                />
            ))}
          </div>
        </div>

        <div className="flex lg:flex-row gap-4 pt-12 flex-col items-center">
          <div className=" xl:w-[55%] w-full md:w-[55%] flex flex-col gap-2">
                <RevenueTrendLine
                monthlyEarnings={monthlyEarnings}
                />
          </div>
          <div className=" xl:w-[45%] w-full md:w-[55%] flex flex-col gap-2">
                <MonthlyReservationBar
                monthlyReservation={monthlyReservations}
                />
          </div>
        </div>

        <div className="xl:w-full w-auto pt-12">
          <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-8
          lg:gap-x-4
          ">
            {reservationCardNames.map((listing)=> (
                <ReservationsCountCard
                    title={listing.title}
                    value={listing.value}
                    key={listing.title}
                    icon={listing.icon}
                />
            ))}
          </div>
        </div>

      <div className="pt-12 flex lg:flex-row items-center flex-col gap-4">
          <ReservationHistory
            reservations={approvedReservations}
          />
          <ListingReservationPie
          ListingReservationCount={listingReservationCount}
          />

      </div>


      <div className="xl:w-full w-auto pt-12">
          <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-8
          lg:gap-x-4
          ">
            {listingCardData.map((reservation)=> (
                <ListingsCountCard
                    title={reservation.title}
                    value={reservation.value}
                    key={reservation.title}
                    icon={reservation.icon}
                />
            ))}
          </div>
        </div>

      <div className="pt-12  lg:flex-row items-center flex flex-col gap-4">
          <Listings
          listings={allListings}
          />
      </div>
     
    </Container>
    </div>
  
  )
}

export default DashboardClient