import HomeClient from "./HomeClient";
import getApprovedListings from "./actions/getApprovedListings";
import getCurrentUser from "./actions/getCurrentUser";
import { IListingParams } from "./actions/getListings";
/* import getReviews from "./actions/getReviews"; */
import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyState";

interface HomeProps{
  searchParams: IListingParams
}

const Home = async ({searchParams}: HomeProps) => {
  const listings = await getApprovedListings()
  const user = await getCurrentUser();
 /*  const reviews = await getReviews(); */
  
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
