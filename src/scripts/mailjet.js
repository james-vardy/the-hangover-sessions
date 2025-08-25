import { config } from "./config.js";

// Mailjet Handler - Integrated worker-only implementation
export const MailjetHandler = {
  // Helper function for consistent error responses
  createErrorResponse: (
    message = "Something went wrong. Please try again."
  ) => ({
    success: false,
    message,
  }),

  // Shared worker request function
  makeWorkerRequest: async function (endpoint, data) {
    try {
      const response = await fetch(`${config.workerUrl}${endpoint}`, {
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
      throw new Error(
        "Service temporarily unavailable. Please try again later."
      );
    }
  },

  // Contact Form Handler - Worker only
  handleContactForm: async function (formData) {
    try {
      return await this.makeWorkerRequest("/api/contact", formData);
    } catch (error) {
      return this.createErrorResponse(
        "Failed to submit demo. Please try again later."
      );
    }
  },

  // Newsletter Subscription Handler - Worker only
  handleNewsletterSignup: async function (email, name = "") {
    try {
      return await this.makeWorkerRequest("/api/newsletter", { email, name });
    } catch (error) {
      return this.createErrorResponse(
        "Failed to subscribe. Please try again later."
      );
    }
  },
};
