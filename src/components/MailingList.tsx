import { useState, FormEvent } from "react";

export default function MailingList() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);
    setSubmitted(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const emailData = {
      email: formData.get("email") as string,
      name: formData.get("name") as string,
    };

    try {
      const response = await fetch("/mailing-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error("Response not OK");
      }

      await response.json();
      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(true);
      setTimeout(() => setError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-brand-green text-white relative overflow-hidden">
      {/* Decorative icons */}
      <img
        src="/Hangover sessions-11.png"
        alt=""
        className="absolute top-10 right-10 w-32 h-32 rotate-12 opacity-20 hidden md:block"
      />
      <img
        src="/Hangover sessions-13.png"
        alt=""
        className="absolute bottom-10 left-10 w-32 h-32 -rotate-12 opacity-20 hidden md:block"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay in the Loop
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Get notified about upcoming sessions, new releases, and special
            events.
          </p>

          {submitted && (
            <div className="mb-6 p-4 bg-white/20 border border-white/40 rounded-lg">
              <p className="font-semibold">✓ Thanks for subscribing!</p>
              <p className="text-sm text-white/90 mt-1">
                We'll keep you posted on all things Hangover Sessions.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-300 rounded-lg">
              <p className="font-semibold">Something went wrong</p>
              <p className="text-sm text-white/90 mt-1">
                Please try again or contact us directly.
              </p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition"
            />
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-brand-orange hover:bg-brand-orange/90 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
