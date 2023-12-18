import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb'

interface IParams {
    reservationId?: string;
}

export async function PATCH(
    request: Request,
    {params} : {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error()
    }

    const {reservationId} = params;

    if(!reservationId || typeof reservationId !== 'string'){
        throw new Error('Invalid Id')
    }

    const updatedReservation = await prisma.reservation.update({
        where:{
            id: reservationId,
            listing:{
                userId: currentUser.id
            }
        },
        data:{
            status: 1 // 1 for approval status
        }
    })

    return NextResponse.json(updatedReservation)
}