import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
){
    const currentUser = await getCurrentUser();

   
    if(!currentUser){
        return NextResponse.error()
    }

    const body = await request.json();

    const {
        listingId,
        startDate,
        endDate,
        totalPrice,
        idImageSrc
    } = body;

    console.log('id image src: ', idImageSrc)
    console.log('totalPrice ', totalPrice)
    console.log('listingId ', listingId);
    console.log('start date', startDate)

    if (!listingId || !startDate || !endDate || !totalPrice ){
        return NextResponse.error();
    }

    const listingAndReservation = await prisma.listing.update({
        where:{
            id: listingId
        },
        data:{
            reservations:{
                create:{
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                    status: 2,
                    reason: '',
                    idImageSrc: idImageSrc
                }
            }
        }
    })

    return NextResponse.json(listingAndReservation)
}