import { useEffect } from "react";
import { ArrowUpRight, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const FACEBOOK_URL = "https://www.facebook.com/people/Happy-2-Help-Counseling/61590639628174/";
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

          <div className="grid min-w-0 gap-6 sm:grid-cols-2">
            <div className="min-w-0 overflow-hidden rounded-3xl border border-border bg-background p-3 shadow-sm">
              <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Latest on TikTok
              </div>
              <blockquote
                className="tiktok-embed mx-auto min-w-72 max-w-3xl"
                cite={TIKTOK_URL}
                data-unique-id="happy2help59"
                data-embed-type="creator"
              >
                <section>
                  <a href={TIKTOK_URL} target="_blank" rel="noreferrer">
                    @happy2help59 on TikTok
                  </a>
                </section>
              </blockquote>
            </div>

            <div className="min-w-0 overflow-hidden rounded-3xl border border-border bg-background p-3 shadow-sm">
              <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Latest on Facebook
              </div>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative flex h-[620px] flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#1877F2]/10 via-[#1877F2]/5 to-background p-8 text-center transition-all hover:from-[#1877F2]/20 hover:via-[#1877F2]/10 hover:shadow-md"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-lg transition-transform group-hover:scale-110">
                  <Facebook size={36} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-semibold text-foreground">
                    Happy 2 Help Counseling
                  </h3>
                  <p className="max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
                    Community updates, mental wellness tips, and encouragement for your journey.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#1877F2]/30 bg-[#1877F2]/10 px-5 py-2.5 text-sm font-medium text-[#1877F2] transition-colors group-hover:bg-[#1877F2] group-hover:text-white">
                  Visit our page <ArrowUpRight size={16} />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#1877F2]/0 via-[#1877F2] to-[#1877F2]/0 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}