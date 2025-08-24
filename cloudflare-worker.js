// Cloudflare Worker for Mailjet Integration
// Deploy this as a Cloudflare Worker to handle form submissions securely

// CORS headers for your domain
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://www.thehangoversessions.co.uk",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

// Common email validation regex (compiled once)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Common Mailjet headers generator
const getMailjetHeaders = (env) => ({
  "Content-Type": "application/json",
  Authorization:
    "Basic " + btoa(`${env.MAILJET_PUBLIC_KEY}:${env.MAILJET_SECRET_KEY}`),
});

// Helper function to add CORS headers to responses
function corsResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
    },
  });
}

// Email validation helper
function validateEmail(email) {
  return email && EMAIL_REGEX.test(email);
}

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: CORS_HEADERS,
      });
    }

    const url = new URL(request.url);
    const { pathname, method } = url;

    // Route handling with early returns
    if (method === "POST") {
      if (pathname === "/api/contact") {
        return handleContact(request, env);
      }
      if (pathname === "/api/newsletter") {
        return handleNewsletter(request, env);
      }
    }

    return new Response("Not Found", { status: 404 });
  },
};

// Handle contact form submissions
async function handleContact(request, env) {
  try {
    const { name, email, demo, message } = await request.json();

    // Input validation
    if (!name || !email || !demo) {
      return corsResponse(
        {
          success: false,
          message: "Name, email, and demo link are required",
        },
        400
      );
    }

    if (!validateEmail(email)) {
      return corsResponse(
        {
          success: false,
          message: "Please enter a valid email address",
        },
        400
      );
    }

    const clientIP = request.headers.get("CF-Connecting-IP");
    const timestamp = new Date();

    // Send email via Mailjet
    const emailData = {
      Messages: [
        {
          From: {
            Email: env.SENDER_EMAIL,
            Name: "The Hangover Sessions",
          },
          To: [
            {
              Email: env.CONTACT_EMAIL,
              Name: "Demo Submissions",
            },
          ],
          Subject: `New Demo Submission from ${name}`,
          TextPart: `
New demo submission received:

Name: ${name}
Email: ${email}
Demo Link: ${demo}

Message:
${message || "No additional message provided."}

---
Submitted via The Hangover Sessions website
IP: ${clientIP}
Timestamp: ${timestamp.toISOString()}
        `,
          HTMLPart: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4a5d3a;">New Demo Submission</h2>
            
            <div style="background: #f4f1e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Demo Link:</strong> <a href="${demo}" target="_blank">${demo}</a></p>
            </div>
            
            <h3 style="color: #4a5d3a;">Message:</h3>
            <div style="background: #ffffff; padding: 15px; border-left: 4px solid #d4822a; margin: 10px 0;">
              <p>${message || "No additional message provided."}</p>
            </div>
            
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #d4c5a9;">
            <p style="color: #666; font-size: 12px;">
              Submitted via The Hangover Sessions website<br>
              IP: ${clientIP}<br>
              Time: ${timestamp.toLocaleString()}
            </p>
          </div>
        `,
        },
      ],
    };

    const mailjetResponse = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: getMailjetHeaders(env),
      body: JSON.stringify(emailData),
    });

    if (!mailjetResponse.ok) {
      const errorText = await mailjetResponse.text();
      console.error("Mailjet error:", errorText);
      throw new Error("Failed to send email");
    }

    return corsResponse({
      success: true,
      message: "Demo submitted successfully! We'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return corsResponse(
      {
        success: false,
        message: "Failed to submit demo. Please try again later.",
      },
      500
    );
  }
}

// Handle newsletter subscriptions
async function handleNewsletter(request, env) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return corsResponse(
        {
          success: false,
          message: "Email address is required",
        },
        400
      );
    }

    if (!validateEmail(email)) {
      return corsResponse(
        {
          success: false,
          message: "Please enter a valid email address",
        },
        400
      );
    }

    const mailjetHeaders = getMailjetHeaders(env);
    const contactName = name || "";

    // Optimized approach: Try listrecipient first (most common case)
    const listData = {
      ContactAlt: email,
      ListID: parseInt(env.NEWSLETTER_LIST_ID),
      IsUnsubscribed: false,
    };

    let listResponse = await fetch(
      "https://api.mailjet.com/v3/REST/listrecipient",
      {
        method: "POST",
        headers: mailjetHeaders,
        body: JSON.stringify(listData),
      }
    );

    if (listResponse.ok) {
      return corsResponse({
        success: true,
        message:
          "Successfully subscribed! Welcome to The Hangover Sessions community.",
      });
    }

    // Fallback 1: Create contact first, then add to list
    try {
      await fetch("https://api.mailjet.com/v3/REST/contact", {
        method: "POST",
        headers: mailjetHeaders,
        body: JSON.stringify({
          Email: email,
          Name: contactName,
        }),
      });

      // Retry list addition
      listResponse = await fetch(
        "https://api.mailjet.com/v3/REST/listrecipient",
        {
          method: "POST",
          headers: mailjetHeaders,
          body: JSON.stringify(listData),
        }
      );

      if (listResponse.ok) {
        return corsResponse({
          success: true,
          message:
            "Successfully subscribed! Welcome to The Hangover Sessions community.",
        });
      }
    } catch (contactError) {
      console.log("Contact creation failed:", contactError);
    }

    // Fallback 2: Use bulk managemanycontacts
    const bulkResponse = await fetch(
      `https://api.mailjet.com/v3/REST/contactslist/${env.NEWSLETTER_LIST_ID}/managemanycontacts`,
      {
        method: "POST",
        headers: mailjetHeaders,
        body: JSON.stringify({
          Action: "addnoforce",
          Contacts: [{ Email: email, Name: contactName }],
        }),
      }
    );

    if (!bulkResponse.ok) {
      const errorText = await bulkResponse.text();
      console.error("All subscription methods failed:", errorText);
      throw new Error("Failed to subscribe to newsletter");
    }

    return corsResponse({
      success: true,
      message:
        "Successfully subscribed! Welcome to The Hangover Sessions community.",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return corsResponse(
      {
        success: false,
        message: "Failed to subscribe. Please try again later.",
      },
      500
    );
  }
}
