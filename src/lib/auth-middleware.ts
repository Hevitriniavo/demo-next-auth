import { getSessionWithUser } from "@/lib/session";
import { RouteError } from "./safe-route";

export const authMiddleware = async ({ next, request }: any) => {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
        throw new RouteError('Unauthorized', 401);
    }
    const sessionWithUser = await getSessionWithUser(request.headers);

    if (!sessionWithUser) {
        throw new RouteError('Unauthorized', 401);
    }

    const { user, session } = sessionWithUser;

    if (token !== session.token) {
        throw new RouteError('Unauthorized', 401);
    }

    return next({
        context: { user },
    });
};