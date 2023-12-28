import prisma from '@/app/libs/prismadb'

interface IParams{
    listingId?: string
}

export default async function getReviews (params: IParams) {
    try {

        const {listingId} = params

        const reviews = await prisma.review.findMany({
            where: {
                listingId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include:{
                user: true
            }
        });

        const safeReviews = reviews.map((review)=>({
            ...review,
            createdAt: review.createdAt.toISOString(),
            updatedAt: review.updatedAt.toISOString(),
            user:{
                ...review.user,
                createdAt: review.user.createdAt.toISOString(),
                updatedAt: review.user.updatedAt.toISOString(),
                emailVerified: review.user.emailVerified?.toISOString() || null
            }
        }))

        return safeReviews
    } catch (error: any) {
        throw new Error (error)
    }
}