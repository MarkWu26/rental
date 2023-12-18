import HomeClient from "./HomeClient";
import getApprovedListings from "./actions/getApprovedListings";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps{
  searchParams: IListingParams
}


const Home = async ({searchParams}: HomeProps) => {
  const listings = await getApprovedListings()
  const user = await getCurrentUser();
  
  if(listings.length === 0){
    return (
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <HomeClient
      listings={listings}
      currentUser={user}
      />
    </ClientOnly>
  )
}

export default Home;
