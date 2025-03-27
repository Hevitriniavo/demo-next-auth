import { authMiddleware } from "@/lib/auth-middleware";
import { safeRoute } from "@/lib/safe-route";
import { NextResponse } from "next/server";

export const GET = safeRoute
  .use(authMiddleware)
  .handler(async (_request, _context) => {
    return NextResponse.json({ success: true }, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  });
