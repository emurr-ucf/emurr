// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { urlBasePath, urlPath } from "./lib/urlPath";

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") return;

  const path = request.url.split(urlBasePath)[1];
  if (!path.includes("/emurr"))
    return NextResponse.rewrite(`${urlPath}/emurr${path}`);
}
