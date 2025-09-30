import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "blog",
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

export function HEAD() {
  return new Response(null, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
