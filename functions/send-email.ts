// Cloudflare Pages Function
import Mailjet from "node-mailjet";

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
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const mailjet = new Mailjet({
      apiKey: env.MAILJET_API_KEY,
      apiSecret: env.MAILJET_API_SECRET,
    });

    await mailjet.post("send", { version: "v3.1" }).request({
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
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Mailjet error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
