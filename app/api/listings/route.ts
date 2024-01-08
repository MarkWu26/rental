import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST (
    request: Request
) {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error()
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
        idImageSrc,
        documentImageSrc,
        rentalType,
        checkinTime,
        checkoutTime,
        cleaningFee,
        isCleaningFee
    } = body

    Object.keys(body).forEach((value:any)=>{
        if(!body[value]){
            NextResponse.error()
        }
    })

    if(cleaningFee < 0 || price < 0){
        return NextResponse.error();
    }
    
    let data = {
            title,
            description,
            imageSrc,
            idImageSrc,
            documentImageSrc,
            category,
            roomCount,
            bathRoomCount,
            guestCount,
            latlng: location.latlng,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id,
            status: 2,
            reason: '',
            rentalType,
            checkinTime,
            checkoutTime,
            cleaningFee: parseInt(cleaningFee, 10)
        
    } 


    if(!isCleaningFee){
        data.cleaningFee = 0
    } 

    const listing = await prisma.listing.create({
        data:data
    })

    return NextResponse.json(listing)
}