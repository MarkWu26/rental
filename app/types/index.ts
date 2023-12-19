import {User, Listing, Reservation, Conversation, Message} from '@prisma/client'

export type SafeListings = Omit <
    Listing,
    "createdAt" | "status"
> & {
    createdAt: string;
    status: Number;
}

export type SafeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "Listing" | "status"
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListings;
    status: Number;
}

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified" | "isAdmin"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
    isAdmin: boolean | null
}

export type SafeReservationId = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "status"
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    status: Number;
}

export type FullMessageType = Message & {
  sender: User, 
  seen: User[]
};

export type FullConversationType = Conversation & { 
  users: User[]; 
  messages: FullMessageType[]
};
