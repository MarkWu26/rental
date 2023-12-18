import getCurrentUser from '@/app/actions/getCurrentUser'

const isAdmin = async () => {
    const currentUser = await getCurrentUser();

        if(!currentUser){
            return false
        }
        
        if(currentUser?.isAdmin){
           return true
        } else{
            return false
        }

}

export default isAdmin