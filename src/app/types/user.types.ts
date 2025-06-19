import { Prisma } from '@prisma/client';

// User type from Prisma schema
export type User = {
    id: number;
    email: string;
    name: string | null;
    createdAt: Date;
    updatedAt: Date;
};

// Type for creating a new user
export type UserCreateInput = {
    id: number;
    email: string;
    name: string;
}

// Type for updating a user
export type UserUpdateInput = {
    id: number;
    email: string;
    name: string;
}