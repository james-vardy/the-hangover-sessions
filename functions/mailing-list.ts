// Cloudflare Pages Function
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

interface MailingListData {
  email: string;
  name: string;
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: corsHeaders,
  });
}

export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    const body: MailingListData = await request.json();
    const { email, name } = body;

    if (!email || !name) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Logo URL
    const logoUrl = "https://thehangoversessions.co.uk/fallback-image.png";

    // Mailjet API credentials
    const auth = btoa(`${env.MAILJET_API_KEY}:${env.MAILJET_API_SECRET}`);

    // Step 1: Create or update the contact
    const contactPayload = {
      Email: email,
      Name: name,
      IsExcludedFromCampaigns: false,
    };

    const contactResponse = await fetch(
      "https://api.mailjet.com/v3/REST/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify(contactPayload),
      }
    );

    // If contact already exists, that's fine - we'll still subscribe them
    if (!contactResponse.ok && contactResponse.status !== 400) {
      throw new Error("Failed to create contact");
    }

    // Step 2: Subscribe contact to the mailing list
    const subscribePayload = {
      ContactsLists: [
        {
          ListID: parseInt(env.MAILJET_LIST_ID),
          Action: "addnoforce",
        },
      ],
    };

    const subscribeResponse = await fetch(
      `https://api.mailjet.com/v3/REST/contact/${encodeURIComponent(
        email
      )}/managecontactslists`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify(subscribePayload),
      }
    );

    if (!subscribeResponse.ok) {
      throw new Error("Failed to subscribe to mailing list");
    }

    // Step 3: Send confirmation email to subscriber
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
      Subject: "Welcome to The Hangover Sessions Mailing List!",
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
              <h2>Welcome to The Hangover Sessions!</h2>
              <p>Hi ${name},</p>
              <p>Thanks for subscribing to our mailing list!</p>
              <p>We'll keep you updated on:</p>
              <ul>
                <li>Upcoming live sessions at Hyde Park Book Club</li>
                <li>New video releases on YouTube</li>
                <li>Special events and announcements</li>
                <li>New music releases on Bandcamp and Spotify</li>
              </ul>
              <p>In the meantime:</p>
              <ul>
                <li>Follow us on <a href="https://www.instagram.com/thehangoversessions">Instagram</a></li>
                <li>Subscribe on <a href="https://www.youtube.com/@HangoverSessions">YouTube</a></li>
                <li>Check out releases on <a href="https://thehangoversessions.bandcamp.com">Bandcamp</a></li>
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
Hi ${name},

Thanks for subscribing to The Hangover Sessions mailing list!

We'll keep you updated on:
- Upcoming live sessions at Hyde Park Book Club
- New video releases on YouTube
- Special events and announcements
- New music releases on Bandcamp and Spotify

Follow us:
- Instagram: https://www.instagram.com/thehangoversessions
- YouTube: https://www.youtube.com/@HangoverSessions
- Bandcamp: https://privateregcords.bandcamp.com

The Hangover Sessions
Sunday mornings at Hyde Park Book Club, Leeds
https://thehangoversessions.co.uk
      `.trim(),
    };

    // Send the email
    const emailPayload = {
      Messages: [confirmationEmail],
    };

    await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(emailPayload),
    });

    return new Response(
      JSON.stringify({ success: true, message: "Subscribed successfully" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to subscribe" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
}
