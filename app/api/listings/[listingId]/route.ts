import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb'

interface IParams {
    listingId?: string;
}

export async function DELETE(
    request: Request,
    {params} : {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error()
    }

    const {listingId} = params;

    if(!listingId || typeof listingId !== 'string'){
        throw new Error('Invalid Id')
    }

    if(currentUser.email === 'admin@gmail.com'){
        const listing = await prisma.listing.deleteMany({
            where:{
                id:listingId
            }
        })
        return NextResponse.json(listing)
    }

    const listing = await prisma.listing.deleteMany({
        where:{
            id: listingId,
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing)
}