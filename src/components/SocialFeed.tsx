import { ArrowUpRight, Facebook, Heart, Instagram, Music2, Play } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { getTikTokVideos } from "@/lib/social.functions";

const FACEBOOK_URL = "https://www.facebook.com/people/Happy-2-Help-Counseling/61590639628174/";
const TIKTOK_URL = "https://www.tiktok.com/@happy2help59";
const INSTAGRAM_URL = "https://www.instagram.com/happy2helpcounseling";

function formatCount(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export function SocialFeed() {
  const fetchVideos = useServerFn(getTikTokVideos);
  const { data: videos = [] } = useQuery({
    queryKey: ["tiktok-videos"],
    queryFn: () => fetchVideos(),
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });



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
            <div className="min-w-0 overflow-hidden rounded-3xl border border-border bg-background p-3 shadow-sm sm:col-span-2">
              <div className="mb-3 flex items-center justify-between gap-3 px-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Latest on TikTok
                </span>
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#FE2C55]"
                >
                  @happy2help59 <ArrowUpRight size={14} />
                </a>
              </div>

              {videos.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {videos.slice(0, 6).map((video) => (
                    <a
                      key={video.id}
                      href={video.shareUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative block aspect-[9/16] overflow-hidden rounded-2xl bg-secondary"
                    >
                      {video.coverImageUrl ? (
                        <img
                          src={video.coverImageUrl}
                          alt={video.title || "Happy 2 Help TikTok video"}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 space-y-1 p-3 text-left">
                        <p className="line-clamp-2 text-xs font-medium leading-snug text-background">
                          {video.title}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-background/80">
                          <span className="inline-flex items-center gap-1">
                            <Play size={11} /> {formatCount(video.viewCount)}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Heart size={11} /> {formatCount(video.likeCount)}
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex h-56 flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#25F4EE]/10 via-[#FE2C55]/5 to-background p-8 text-center transition-all hover:shadow-md"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-transform group-hover:scale-110">
                    <Music2 size={30} />
                  </div>
                  <p className="max-w-[18rem] text-sm leading-relaxed text-muted-foreground">
                    Short videos with practical mental wellness reminders and encouragement.
                  </p>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#FE2C55]/30 bg-[#FE2C55]/10 px-5 py-2 text-sm font-medium text-[#FE2C55]">
                    Watch on TikTok <ArrowUpRight size={16} />
                  </div>
                </a>
              )}
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