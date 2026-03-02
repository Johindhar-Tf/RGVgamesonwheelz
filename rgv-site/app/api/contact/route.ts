import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  /* ── CORS / Origin check ── */
  const origin  = req.headers.get("origin") ?? "";
  const allowed = process.env.ALLOWED_ORIGIN ?? "";

  if (allowed && origin !== allowed) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  /* ── Parse body ── */
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, phone, email, service, date, time, message, website } = body;

  /* ── Honeypot check ── */
  if (website && website.trim() !== "") {
    // Bot detected — return 200 silently
    return NextResponse.json({ ok: true });
  }

  /* ── Required fields ── */
  if (!name || !phone || !email || !service) {
    return NextResponse.json(
      { error: "Missing required fields: name, phone, email, service" },
      { status: 400 }
    );
  }

  /* ── Resend config ── */
  const apiKey     = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL;

  if (!apiKey || !ownerEmail) {
    console.error("Missing RESEND_API_KEY or OWNER_EMAIL environment variables");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  /* ── Send email ── */
  try {
    const { error } = await resend.emails.send({
      from: "RGV Games on Wheelz <bookings@rgvgamesonwheelz.com>",
      to: [ownerEmail],
      subject: "New Booking Request — RGV Games on Wheelz",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>New Booking Request</title>
          </head>
          <body style="font-family: 'DM Sans', Arial, sans-serif; background:#0A0816; color:#fff; margin:0; padding:0;">
            <div style="max-width:600px; margin:0 auto; padding:40px 24px;">

              <!-- Header -->
              <div style="background:linear-gradient(135deg,#6D28D9,#4C1D95); border-radius:16px; padding:32px; text-align:center; margin-bottom:24px;">
                <div style="font-size:2rem; font-weight:900; color:#fff; letter-spacing:-0.02em;">
                  RGV<span style="color:#D946EF;">.</span>WHEELZ
                </div>
                <div style="color:rgba(255,255,255,0.7); font-size:0.85rem; margin-top:8px; letter-spacing:0.15em; text-transform:uppercase;">
                  New Booking Request
                </div>
              </div>

              <!-- Details card -->
              <div style="background:#130F24; border:1px solid rgba(109,40,217,0.2); border-radius:16px; padding:28px; margin-bottom:24px;">
                <h2 style="font-size:1rem; color:#D946EF; text-transform:uppercase; letter-spacing:0.1em; margin:0 0 20px 0;">
                  Customer Details
                </h2>

                ${[
                  ["👤 Name",      name],
                  ["📞 Phone",     phone],
                  ["✉️ Email",     email],
                  ["🎮 Event Type", service],
                  ["📅 Date",      date || "Not specified"],
                  ["⏰ Time",      time || "Not specified"],
                ]
                  .map(
                    ([label, value]) => `
                  <div style="display:flex; gap:16px; margin-bottom:14px; padding-bottom:14px; border-bottom:1px solid rgba(255,255,255,0.06);">
                    <div style="color:rgba(255,255,255,0.5); font-size:0.8rem; min-width:130px;">${label}</div>
                    <div style="color:#fff; font-size:0.9rem; font-weight:500;">${value}</div>
                  </div>`
                  )
                  .join("")}

                ${
                  message
                    ? `<div style="margin-top:16px;">
                        <div style="color:rgba(255,255,255,0.5); font-size:0.8rem; margin-bottom:8px;">📝 Additional Notes</div>
                        <div style="background:rgba(109,40,217,0.1); border:1px solid rgba(109,40,217,0.2); border-radius:10px; padding:14px; color:rgba(255,255,255,0.8); font-size:0.85rem; line-height:1.6;">
                          ${message.replace(/\n/g, "<br/>")}
                        </div>
                      </div>`
                    : ""
                }
              </div>

              <!-- CTA -->
              <div style="text-align:center; padding:16px;">
                <a href="tel:${phone.replace(/\D/g, "")}"
                   style="display:inline-block; background:#D946EF; color:#fff; font-weight:700; font-size:0.9rem; padding:14px 32px; border-radius:50px; text-decoration:none; letter-spacing:0.05em;">
                  📞 Call ${name.split(" ")[0]}
                </a>
              </div>

              <!-- Footer -->
              <div style="text-align:center; color:rgba(255,255,255,0.25); font-size:0.7rem; margin-top:24px; letter-spacing:0.1em; text-transform:uppercase;">
                RGV Games on Wheelz · McAllen, Texas · (956) 278-0283
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
