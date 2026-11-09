import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createEnquiry } from "@/lib/enquiries/create";
import { rateLimit } from "@/lib/security/rate-limit";

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "local";
  const limited = rateLimit(`enquiry:${ip}`, 5, 15 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many enquiries from this network. Try again later." },
      { status: 429 },
    );
  }

  try {
    const body = await req.json();
    const row = await createEnquiry(body, {
      ip,
      userAgent: req.headers.get("user-agent") ?? undefined,
    });
    return NextResponse.json({
      ok: true,
      referenceNumber: row.referenceNumber,
      id: row.id,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "Please check the form fields.", details: err.flatten() },
        { status: 400 },
      );
    }
    console.error(err);
    return NextResponse.json({ error: "Could not save enquiry." }, { status: 500 });
  }
}
