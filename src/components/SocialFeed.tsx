import { ArrowUpRight, Facebook, Instagram, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const FACEBOOK_URL = "https://www.facebook.com/people/Happy-2-Help-Counseling/61590639628174/";
const TIKTOK_URL = "https://www.tiktok.com/@happy2help59";
const INSTAGRAM_URL = "https://www.instagram.com/happy2helpcounseling";

export function SocialFeed() {

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
              <Button asChild variant="outline" className="rounded-full">
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                  Instagram <ArrowUpRight />
                </a>
              </Button>
            </div>
          </div>

          <div className="grid min-w-0 gap-6 sm:grid-cols-2">
            <div className="min-w-0 overflow-hidden rounded-3xl border border-border bg-background p-3 shadow-sm">
              <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Latest on TikTok
              </div>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative flex h-[620px] flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#25F4EE]/10 via-[#FE2C55]/5 to-background p-8 text-center transition-all hover:from-[#25F4EE]/20 hover:via-[#FE2C55]/10 hover:shadow-md"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-transform group-hover:scale-110">
                  <Music2 size={36} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-semibold text-foreground">
                    @happy2help59
                  </h3>
                  <p className="max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
                    Short videos with practical mental wellness reminders and encouragement.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#FE2C55]/30 bg-[#FE2C55]/10 px-5 py-2.5 text-sm font-medium text-[#FE2C55] transition-colors group-hover:bg-[#FE2C55] group-hover:text-white">
                  Watch on TikTok <ArrowUpRight size={16} />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#25F4EE]/0 via-[#FE2C55] to-[#25F4EE]/0 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
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

            <div className="min-w-0 overflow-hidden rounded-3xl border border-border bg-background p-3 shadow-sm sm:col-span-2">
              <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Latest on Instagram
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative flex h-56 flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#833AB4]/10 via-[#FD1D1D]/5 to-[#FCB045]/10 p-8 text-center transition-all hover:from-[#833AB4]/20 hover:via-[#FD1D1D]/10 hover:to-[#FCB045]/20 hover:shadow-md"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white shadow-lg transition-transform group-hover:scale-110">
                  <Instagram size={30} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-2xl font-semibold text-foreground">
                    @happy2helpcounseling
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Daily encouragement and behind-the-scenes moments from our practice.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#FD1D1D]/30 bg-[#FD1D1D]/10 px-5 py-2 text-sm font-medium text-[#C13584] transition-colors group-hover:bg-[#C13584] group-hover:text-white">
                  Follow us <ArrowUpRight size={16} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}