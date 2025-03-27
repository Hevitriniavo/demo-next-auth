import { auth } from "@/lib/auth";
import { safeRoute } from "@/lib/safe-route";
import { z } from "zod";

const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
});


export const POST = safeRoute
    .body(bodySchema)
    .handler(async (_req, { body }) => {
        const res = await auth.api.signInEmail({ body, asResponse: true });
        return res;
    });

