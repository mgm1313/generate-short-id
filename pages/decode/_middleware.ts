import type { NextRequest } from "next/server";
import Hashids from "hashids";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const params = url.searchParams;
  let hash = params.get("hash");
  let salt = params.get("salt") || undefined;

  const hashids = new Hashids(salt, 8, "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");

  const id = hashids.decode(hash);

  return new Response(JSON.stringify({ id }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
