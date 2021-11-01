import type { NextRequest } from "next/server";
import Hashids from "hashids";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const params = url.searchParams;
  let id = params.get("id");
  let salt = params.get("salt") || undefined;

  const hashids = new Hashids(salt, 8, "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");

  if (!hashids.isValidId(id)) {
    return new Response(
      JSON.stringify({
        message: `Passed id ${id} is not valid! (possibly not a number)`,
      }),
      {
        status: 422,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const hash = hashids.encode(id);

  return new Response(JSON.stringify({ hash }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
