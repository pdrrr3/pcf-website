import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, company, role, preferredTime, message } = await req.json();

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !company?.trim() || !role) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const loopsApiKey = process.env.LOOPS_API_KEY;
    if (!loopsApiKey) {
      console.error("LOOPS_API_KEY not configured");
      return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
    }

    // Send notification emails via Loops transactional
    const dataVariables = {
      name,
      email,
      company,
      role,
      phone: phone || "Not provided",
      preferredTime: preferredTime || "Not specified",
      message: message || "No message",
    };

    const recipients = ["m@preconfinder.com", "hello@preconfinder.com"];
    await Promise.all(
      recipients.map((to) =>
        fetch("https://app.loops.so/api/v1/transactional", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loopsApiKey}`,
          },
          body: JSON.stringify({
            transactionalId: "cmndnfn0h02ka0izejys29alk",
            email: to,
            dataVariables,
          }),
        })
      )
    );

    // Also create contact in Loops for CRM tracking
    const trimmed = name.trim();
    const spaceIndex = trimmed.indexOf(" ");
    const firstName = spaceIndex === -1 ? trimmed : trimmed.slice(0, spaceIndex);
    const lastName = spaceIndex === -1 ? "" : trimmed.slice(spaceIndex + 1);

    await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loopsApiKey}`,
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        firstName,
        lastName,
        company,
        source: "demo_request",
        role,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Demo request error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
