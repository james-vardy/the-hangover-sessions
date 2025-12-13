import { useState, FormEvent } from "react";

export default function DemoSubmission() {
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

    const demoData = {
      artistName: formData.get("artist-name") as string,
      email: formData.get("email") as string,
      demoLink: formData.get("demo-link") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/submit-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(demoData),
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
    <section id="demo" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative corner icons */}
      <img
        src="/Hangover sessions-15.png"
        alt=""
        className="absolute top-8 left-8 w-24 h-24 rotate-12"
      />
      <img
        src="/Hangover sessions-17.png"
        alt=""
        className="absolute bottom-8 right-8 w-24 h-24 -rotate-12"
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

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-500 rounded-lg text-center">
              <p className="text-red-700 font-medium">
                Failed to send demo. Please try again or email us directly at{" "}
                <a
                  href="mailto:thehangoversessions@gmail.com"
                  className="underline hover:text-red-900"
                >
                  thehangoversessions@gmail.com
                </a>
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
                placeholder="SoundCloud Link, Google Drive, Dropbox, etc."
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
