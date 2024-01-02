import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb'

interface IParams{
    reviewId: string
}

export async function DELETE (
    request: Request,
    {params}: {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error()
    }

    const {reviewId} = params;

    console.log('review id: ', reviewId)

    if(!reviewId || typeof reviewId !== 'string'){
        throw new Error('Invalid ID')
    }

    const updatedReview = await prisma.review.delete({
        where:{
            id: reviewId
        }
    })

    return NextResponse.json(updatedReview)

}