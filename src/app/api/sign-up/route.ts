import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { RouteError, safeRoute } from "@/lib/safe-route";
import { z } from "zod";

const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
    name: z.string().min(3),
});

export const POST = safeRoute
    .body(bodySchema)
    .handler(async (_req, { body }) => {
        const existingUser = await prisma.user.findUnique({
            where: { email: body.email },
        });

        if (existingUser) {
            throw new RouteError("Email already in use", 400);
        }
        const res = await auth.api.signUpEmail({ returnHeaders: true, body });
        return res;
    });
