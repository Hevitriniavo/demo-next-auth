import { createZodRoute } from "next-zod-route";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { APIError } from "better-auth/api";

export class RouteError extends Error {
    status?: number;
    constructor(message: string, status?: number) {
        super(message);
        this.status = status;
    }
}

export const safeRoute = createZodRoute({
    handleServerError: (e: Error) => {
        if (e instanceof RouteError) {
            return NextResponse.json(
                { message: e.message, status: e.status },
                { status: e.status }
            );
        }

        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json(
                { message: e.message, code: e.code },
                { status: 400 }
            );
        }

        if (e instanceof Prisma.PrismaClientUnknownRequestError) {
            return NextResponse.json(
                { message: "Unknown database error" },
                { status: 500 }
            );
        }

        if (e instanceof APIError) {
            return NextResponse.json(
                { message: e.message, status: e.statusCode },
                { status: e.statusCode }
            );
        }

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    },
});
