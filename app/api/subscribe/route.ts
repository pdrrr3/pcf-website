import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const trimmed = (name ?? "").trim();
  const spaceIndex = trimmed.indexOf(" ");
  const firstName = spaceIndex === -1 ? trimmed : trimmed.slice(0, spaceIndex);
  const lastName = spaceIndex === -1 ? "" : trimmed.slice(spaceIndex + 1);

  const res = await fetch("https://app.loops.so/api/v1/contacts/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
    },
    body: JSON.stringify({ email, firstName, lastName, subscribed: true, source: "waitlist" }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: data.message ?? "Something went wrong." },
      { status: res.status }
    );
  }

  return NextResponse.json({ success: true });
}
