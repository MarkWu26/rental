import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST (
    request: Request
) { 
    const currentUser = await getCurrentUser(); 

    if(!currentUser){
        return NextResponse.error()
    }

    const body = await request.json();

    const {comment, ratingValue, listingId} = body

    if(!comment || !ratingValue || !listingId){
        return NextResponse.error();
    }

    const reviews = await prisma.review.create({
        data:{
            comment,
            ratingValue,
            userId: currentUser.id,
            listingId
        }
    })

    return NextResponse.json(reviews)
}
