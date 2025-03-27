import { auth } from "@/lib/auth";

export const getSessionWithUser = async (headers: Headers) => {
  const session = await auth.api.getSession({
    headers: headers
  });

  if (!session) {
    return null;
  }

  return session;
}