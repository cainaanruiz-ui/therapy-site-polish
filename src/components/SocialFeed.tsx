import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FACEBOOK_URL = "https://www.facebook.com/share/14mHiHFZgjL/?mibextid=wwXIfr";
const TIKTOK_URL = "https://www.tiktok.com/@happy2help59";

export function SocialFeed() {
  useEffect(() => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.tiktok.com/embed.js"]',
    );

    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="border-y border-border bg-secondary/40" aria-labelledby="social-heading">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="h-px w-8 bg-accent" /> Stay connected
            </div>
            <h2 id="social-heading" className="font-display text-4xl leading-tight text-foreground md:text-5xl">
              A little encouragement for your feed.
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Follow Happy 2 Help for practical mental wellness reminders, community updates,
              and moments of encouragement.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-full">
                <a href={TIKTOK_URL} target="_blank" rel="noreferrer">
                  <span className="font-semibold">TikTok</span> @happy2help59 <ArrowUpRight />
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">
                  Facebook <ArrowUpRight />
                </a>
              </Button>
            </div>
          </div>

          <div className="min-w-0 overflow-hidden rounded-3xl border border-border bg-background p-3 shadow-sm sm:p-6">
            <blockquote
              className="tiktok-embed mx-auto"
              cite={TIKTOK_URL}
              data-unique-id="happy2help59"
              data-embed-type="creator"
              style={{ maxWidth: "780px", minWidth: "288px" }}
            >
              <section>
                <a href={TIKTOK_URL} target="_blank" rel="noreferrer">
                  @happy2help59 on TikTok
                </a>
              </section>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}