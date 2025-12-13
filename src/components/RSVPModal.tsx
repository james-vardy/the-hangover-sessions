import { useState, FormEvent } from "react";
import type { Session } from "../data/sessions";

interface RSVPModalProps {
  session: Session;
  isOpen: boolean;
  onClose: () => void;
}

export default function RSVPModal({
  session,
  isOpen,
  onClose,
}: RSVPModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const emailData = {
      name: formData.get("name"),
      email: formData.get("email"),
      session: {
        artist: session.artist,
        date: session.displayDate,
        venue: session.venue,
      },
    };

    try {
      const response = await fetch("/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
        }, 2000);
      } else {
        alert(
          "Failed to send RSVP. Please try again or email us directly at rsvp@thehangoversessions.co.uk"
        );
      }
    } catch (error) {
      alert(
        "Failed to send RSVP. Please try again or email us directly at rsvp@thehangoversessions.co.uk"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-brand-dark mb-1">RSVP</h3>
            <p className="text-sm text-gray-600">{session.artist}</p>
            <p className="text-sm text-gray-600">{session.displayDate}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mb-4 text-brand-green">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-lg font-medium text-brand-dark mb-2">
              You're on the list!
            </p>
            <p className="text-sm text-gray-600">
              Check your email for confirmation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="rsvp-name"
                className="block text-sm font-medium text-brand-dark mb-2"
              >
                Your Name *
              </label>
              <input
                type="text"
                id="rsvp-name"
                name="name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="rsvp-email"
                className="block text-sm font-medium text-brand-dark mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="rsvp-email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition"
                placeholder="your@email.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll add you to our mailing list for updates
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-orange hover:bg-brand-orange/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {isSubmitting ? "Sending..." : "Confirm RSVP"}
            </button>

            <p className="text-xs text-gray-600 text-center">
              Entry is free. No ticket required.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
