import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb'

interface IParams{
    reviewId: string
}

export async function PUT (
    request: Request,
    {params}: {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error()
    }

    const {reviewId} = params;


    if(!reviewId || typeof reviewId !== 'string'){
        throw new Error('Invalid ID')
    }

    const body = await request.json();

    const {ratingValue, comment} = body;

    const updatedReview = await prisma.review.update({
        where:{
            id: reviewId,
            userId: currentUser?.id
        }, 
        data:{
            ratingValue,
            comment,
            updatedAt: new Date()
        }
    })

    return NextResponse.json(updatedReview)

}