// Mailjet Configuration - Worker Only
// Secure implementation that only uses Cloudflare Worker

// Worker endpoint
const WORKER_URL =
  import.meta.env.WORKER_URL ||
  process.env.WORKER_URL ||
  "https://hangover-sessions-api.james-vardy.workers.dev";

// Helper function for consistent error responses
const createErrorResponse = (
  message = "Something went wrong. Please try again."
) => ({
  success: false,
  message,
});

// Shared worker request function
async function makeWorkerRequest(endpoint, data) {
  try {
    const response = await fetch(`${WORKER_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Worker error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Worker request failed for ${endpoint}:`, error);
    throw new Error("Service temporarily unavailable. Please try again later.");
  }
}

// Contact Form Handler - Worker only
async function handleContactForm(formData) {
  try {
    return await makeWorkerRequest("/api/contact", formData);
  } catch (error) {
    return createErrorResponse(
      "Failed to submit demo. Please try again later."
    );
  }
}

// Newsletter Subscription Handler - Worker only
async function handleNewsletterSignup(email, name = "") {
  try {
    return await makeWorkerRequest("/api/newsletter", { email, name });
  } catch (error) {
    return createErrorResponse("Failed to subscribe. Please try again later.");
  }
}

// Export functions for use in main script
window.MailjetHandler = {
  handleContactForm,
  handleNewsletterSignup,
};
