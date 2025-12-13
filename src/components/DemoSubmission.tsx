import { useState, FormEvent } from "react";

export default function DemoSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const emailData = {
      to: "demos@thehangoversessions.co.uk",
      subject: `Demo Submission: ${formData.get("artist-name")}`,
      text: `
New Demo Submission

Artist: ${formData.get("artist-name")}
Email: ${formData.get("email")}
Demo Link: ${formData.get("demo-link")}

Message:
${formData.get("message") || "No message provided"}
      `.trim(),
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        setSubmitted(true);
        e.currentTarget.reset();
      } else {
        alert(
          "Failed to send demo. Please try again or email us directly at demos@thehangoversessions.co.uk"
        );
      }
    } catch (error) {
      alert(
        "Failed to send demo. Please try again or email us directly at demos@thehangoversessions.co.uk"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="demo" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative corner icons */}
      <img
        src="/Hangover sessions-15.png"
        alt=""
        className="absolute top-8 left-8 w-24 h-24 opacity-30 rotate-12"
      />
      <img
        src="/Hangover sessions-17.png"
        alt=""
        className="absolute bottom-8 right-8 w-24 h-24 opacity-30 -rotate-12"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Submit Your Demo
            </h2>
            <p className="text-gray-600">
              Want to perform at The Hangover Sessions? Send us your music and
              we'll be in touch.
            </p>
          </div>

          {submitted && (
            <div className="mb-6 p-4 bg-brand-green/10 border border-brand-green rounded-lg text-center">
              <p className="text-brand-green font-medium">
                Demo received! We'll listen and get back to you soon.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="artist-name"
                className="block text-sm font-medium text-brand-dark mb-2"
              >
                Artist / Band Name *
              </label>
              <input
                type="text"
                id="artist-name"
                name="artist-name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition"
                placeholder="Your artist or band name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-brand-dark mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="demo-link"
                className="block text-sm font-medium text-brand-dark mb-2"
              >
                Demo Link *
              </label>
              <input
                type="url"
                id="demo-link"
                name="demo-link"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition"
                placeholder="https://spotify.com/... or https://soundcloud.com/..."
              />
              <p className="text-sm text-gray-500 mt-2">
                Spotify, SoundCloud, YouTube, Bandcamp, etc.
              </p>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-brand-dark mb-2"
              >
                Tell us about your music
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition resize-none"
                placeholder="Genre, influences, why you'd be great for The Hangover Sessions..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-orange hover:bg-brand-orange/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors"
            >
              {isSubmitting ? "Sending..." : "Submit Demo"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
