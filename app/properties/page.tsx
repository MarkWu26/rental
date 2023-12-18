import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getListings, { IListingParams } from "../actions/getListings";


interface PropertiesProps{
    searchParams: IListingParams
}

const PropertiesPage = async ({searchParams} : PropertiesProps) => {
    
    const currentUser = await getCurrentUser();
    const listings = await getListings({...searchParams, userId: currentUser?.id})
    console.log('the search params are: ', searchParams)

    /* If you are not logged in, show the login modal instead */
    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }

    /* if there are no listings available for the current user
    render an empty state */
    if(listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title={`No 
                    ${searchParams.filter === 'Pending' ? 'pending' : 
                    searchParams.filter === 'Approved' ? 'approved ' : 
                    searchParams.filter === 'Rejected' ? 'rejected' : ''} properties found`}
                    subtitle={`Looks like you have 
                    ${searchParams.filter === 'Pending' ? 'no pending' : 
                    searchParams.filter === 'Approved' ? 'no approved ' : 
                    searchParams.filter === 'Rejected' ? 'no rejected' : 'no'} properties.`}
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
                filter={searchParams.filter}
            />
        </ClientOnly>
    )
}

export default PropertiesPage