// Cloudflare Pages Function
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

interface RSVPData {
  name: string;
  email: string;
  session: {
    artist: string;
    date: string;
    venue: string;
  };
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: corsHeaders,
  });
}

export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    const body: RSVPData = await request.json();
    const { name, email, session } = body;

    if (!name || !email || !session) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Email to organizers
    const organizerEmail = {
      From: {
        Email: env.MAILJET_FROM_EMAIL || "noreply@thehangoversessions.co.uk",
        Name: "The Hangover Sessions",
      },
      To: [
        {
          Email: "rsvp@thehangoversessions.co.uk",
        },
      ],
      Subject: `RSVP: ${session.artist}`,
      TextPart: `
New RSVP Received

Session: ${session.artist}
Date: ${session.date}
Venue: ${session.venue}

Name: ${name}
Email: ${email}

Add ${email} to mailing list.
      `.trim(),
    };

    // Confirmation email to user
    const confirmationEmail = {
      From: {
        Email: env.MAILJET_FROM_EMAIL || "noreply@thehangoversessions.co.uk",
        Name: "The Hangover Sessions",
      },
      To: [
        {
          Email: email,
          Name: name,
        },
      ],
      Subject: `RSVP Confirmed: ${session.artist}`,
      TextPart: `
Hi ${name},

Thanks for your RSVP! You're on the list for:

${session.artist}
${session.date}
${session.venue}

Entry is free and no ticket is required. Just turn up!

We've added you to our mailing list so you'll hear about future sessions first.

See you there,
The Hangover Sessions team

---
Follow us:
Instagram: @thehangoversessions
YouTube: @HangoverSessions
      `.trim(),
    };

    // Send both emails via Mailjet REST API
    const response = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(
          `${env.MAILJET_API_KEY}:${env.MAILJET_API_SECRET}`
        )}`,
      },
      body: JSON.stringify({
        Messages: [organizerEmail, confirmationEmail],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Mailjet API error:", errorData);
      throw new Error("Failed to send emails");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Mailjet error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}
