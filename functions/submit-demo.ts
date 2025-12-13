// Cloudflare Pages Function
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

interface DemoSubmission {
  artistName: string;
  email: string;
  demoLink: string;
  message?: string;
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: corsHeaders,
  });
}

export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    const body: DemoSubmission = await request.json();
    const { artistName, email, demoLink, message } = body;

    if (!artistName || !email || !demoLink) {
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
          Email: "thehangoversessions@gmail.com",
        },
      ],
      Subject: `Demo Submission: ${artistName}`,
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
              <h2>New Demo Submission</h2>
              <div class="field">
                <div class="label">Artist / Band Name:</div>
                <div class="value">${artistName}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Demo Link:</div>
                <div class="value"><a href="${demoLink}" target="_blank">${demoLink}</a></div>
              </div>
              ${
                message
                  ? `
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${message}</div>
                </div>
              `
                  : ""
              }
            </div>
          </div>
        </body>
        </html>
      `,
      TextPart: `
New Demo Submission

Artist: ${artistName}
Email: ${email}
Demo Link: ${demoLink}
${message ? `\nMessage:\n${message}` : ""}
      `.trim(),
    };

    // Confirmation email to submitter
    const confirmationEmail = {
      From: {
        Email: env.MAILJET_FROM_EMAIL || "noreply@thehangoversessions.co.uk",
        Name: "The Hangover Sessions",
      },
      To: [
        {
          Email: email,
          Name: artistName,
        },
      ],
      Subject: "Demo Received - The Hangover Sessions",
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
              <h2>Thanks for your demo submission!</h2>
              <p>Hi ${artistName},</p>
              <p>We've received your demo and will give it a listen. We'll be in touch if we think you'd be a good fit for The Hangover Sessions.</p>
              <p><strong>You've been subscribed to our mailing list</strong> so you'll hear about future sessions and announcements first.</p>
              <p>In the meantime:</p>
              <ul>
                <li>Follow us on Instagram: <a href="https://www.instagram.com/thehangoversessions/" target="_blank">@thehangoversessions</a></li>
                <li>Subscribe on YouTube: <a href="https://www.youtube.com/@HangoverSessions" target="_blank">@HangoverSessions</a></li>
              </ul>
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
Hi ${artistName},

Thanks for your demo submission!

We've received your demo and will give it a listen. We'll be in touch if we think you'd be a good fit for The Hangover Sessions.

You've been subscribed to our mailing list so you'll hear about future sessions and announcements first.

In the meantime:
- Follow us on Instagram: @thehangoversessions
- Subscribe on YouTube: @HangoverSessions

---
Don't want to receive emails from us? Reply with "Unsubscribe"
The Hangover Sessions | Hyde Park Book Club, Leeds
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
    return new Response(
      JSON.stringify({ error: "Failed to send demo submission" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
}
