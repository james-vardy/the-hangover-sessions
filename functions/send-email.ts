// Cloudflare Pages Function
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function onRequestOptions() {
  return new Response(null, {
    headers: corsHeaders,
  });
}

export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { to, subject, text } = body;

    if (!to || !subject || !text) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Send email via Mailjet REST API
    const response = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(
          `${env.MAILJET_API_KEY}:${env.MAILJET_API_SECRET}`
        )}`,
      },
      body: JSON.stringify({
        Messages: [
          {
            From: {
              Email:
                env.MAILJET_FROM_EMAIL || "noreply@thehangoversessions.co.uk",
              Name: "The Hangover Sessions",
            },
            To: [
              {
                Email: to,
              },
            ],
            Subject: subject,
            TextPart: text,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Mailjet API error:", errorData);
      throw new Error("Failed to send email");
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
