import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb'

interface IParams {
    listingId?: string;
}

export async function PUT(
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

    const body = await request.json();
    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathRoomCount,
        guestCount,
        location,
        price,
    } = body

    Object.keys(body).forEach((value:any)=>{
        if(!body[value]){
            NextResponse.error()
        }
    })


    const listing = await prisma.listing.update({
        where:{
            id: listingId,
        },
        data:{
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathRoomCount,
            guestCount,
            latlng: location.latlng,
            locationValue: location.value,
            price: parseInt(price, 10),
        }
    })

    return NextResponse.json(listing)
}