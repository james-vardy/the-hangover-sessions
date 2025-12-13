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

    // Logo URL (will be accessible from the deployed domain)
    const logoUrl = "https://thehangoversessions.co.uk/fallback-image.png";

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
      HTMLPart: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            @font-face {
              font-family: 'Aileron';
              src: url('https://thehangoversessions.co.uk/fonts/Aileron-Regular.otf') format('opentype');
              font-weight: 400;
              font-style: normal;
            }
            @font-face {
              font-family: 'Aileron';
              src: url('https://thehangoversessions.co.uk/fonts/Aileron-SemiBold.otf') format('opentype');
              font-weight: 600;
              font-style: normal;
            }
            @font-face {
              font-family: 'Aileron';
              src: url('https://thehangoversessions.co.uk/fonts/Aileron-Bold.otf') format('opentype');
              font-weight: 700;
              font-style: normal;
            }
            body { font-family: 'Aileron', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .logo { text-align: center; margin-bottom: 30px; }
            .logo img { max-width: 200px; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: 600; color: #555; }
            .value { margin-top: 5px; }
            a { color: #FF6B35; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <img src="${logoUrl}" alt="The Hangover Sessions" />
            </div>
            <div class="content">
              <h2>New RSVP Received</h2>
              <div class="field">
                <div class="label">Session:</div>
                <div class="value">${session.artist}</div>
              </div>
              <div class="field">
                <div class="label">Date:</div>
                <div class="value">${session.date}</div>
              </div>
              <div class="field">
                <div class="label">Venue:</div>
                <div class="value">${session.venue}</div>
              </div>
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
                <strong>Action:</strong> Add ${email} to mailing list.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
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
      HTMLPart: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            @font-face {
              font-family: 'Aileron';
              src: url('https://thehangoversessions.co.uk/fonts/Aileron-Regular.otf') format('opentype');
              font-weight: 400;
              font-style: normal;
            }
            @font-face {
              font-family: 'Aileron';
              src: url('https://thehangoversessions.co.uk/fonts/Aileron-SemiBold.otf') format('opentype');
              font-weight: 600;
              font-style: normal;
            }
            @font-face {
              font-family: 'Aileron';
              src: url('https://thehangoversessions.co.uk/fonts/Aileron-Bold.otf') format('opentype');
              font-weight: 700;
              font-style: normal;
            }
            body { font-family: 'Aileron', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .logo { text-align: center; margin-bottom: 30px; }
            .logo img { max-width: 200px; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 8px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
            a { color: #FF6B35; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <img src="${logoUrl}" alt="The Hangover Sessions" />
            </div>
            <div class="content">
              <h2>You're on the list!</h2>
              <p>Hi ${name},</p>
              <p>Thanks for your RSVP! You're confirmed for:</p>
              <div style="background: #fff; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 0; font-weight: 600; font-size: 18px;">${session.artist}</p>
                <p style="margin: 5px 0 0 0; color: #666;">${session.date}</p>
                <p style="margin: 5px 0 0 0; color: #666;">${session.venue}</p>
              </div>
              <p><strong>Entry is free and no ticket is required. Just turn up!</strong></p>
              <p>We've added you to our mailing list so you'll hear about future sessions and announcements first.</p>
              <p>In the meantime:</p>
              <ul>
                <li>Follow us on Instagram: <a href="https://www.instagram.com/thehangoversessions/" target="_blank">@thehangoversessions</a></li>
                <li>Subscribe on YouTube: <a href="https://www.youtube.com/@HangoverSessions" target="_blank">@HangoverSessions</a></li>
              </ul>
              <p>See you there!</p>
            </div>
            <div class="footer">
              <p>Don't want to receive emails from us? <a href="[[UNSUB_LINK_LOCALE]]">Unsubscribe</a></p>
              <p>The Hangover Sessions | Hyde Park Book Club, Leeds</p>
            </div>
          </div>
        </body>
        </html>
      `,
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
