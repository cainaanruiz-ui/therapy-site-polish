import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, Heart, Sparkles } from "lucide-react";
import cristina1 from "@/assets/cristina/cristina-1.png.asset.json";
import cristina2 from "@/assets/cristina/cristina-2.png.asset.json";
import cristina3 from "@/assets/cristina/cristina-3.png.asset.json";
import cristina4 from "@/assets/cristina/cristina-4.png.asset.json";
import cristina5 from "@/assets/cristina/cristina-5.png.asset.json";
import cristina6 from "@/assets/cristina/cristina-6.png.asset.json";
import cristina7 from "@/assets/cristina/cristina-7.png.asset.json";
import cristina8 from "@/assets/cristina/cristina-8.png.asset.json";

export const Route = createFileRoute("/cristina")({
  component: CristinaPage,
  head: () => ({
    meta: [
      { title: "Cristina — A Love Written in Letters" },
      {
        name: "description",
        content:
          "A romantic digital love letter to Cristina, filled with heartfelt writing, memories, and favorite photos together.",
      },
      { property: "og:title", content: "Cristina — A Love Written in Letters" },
      {
        property: "og:description",
        content:
          "A romantic digital love letter to Cristina, filled with heartfelt writing, memories, and favorite photos together.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: cristina7.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Cristina — A Love Written in Letters" },
      {
        name: "twitter:description",
        content:
          "A romantic digital love letter to Cristina, filled with heartfelt writing, memories, and favorite photos together.",
      },
      { name: "twitter:image", content: cristina7.url },
    ],
    links: [{ rel: "canonical", href: "https://www.happy2helpcounseling.org/cristina" }],
  }),
});

const memories = [
  {
    image: cristina7.url,
    title: "Golden hour forever",
    text: "The kind of moment that feels too beautiful to be real — sunset, silence, and the certainty that love can make even a parking lot feel sacred.",
  },
  {
    image: cristina8.url,
    title: "Simple days, bright hearts",
    text: "A quiet car ride, matching smiles, and the kind of peace that only comes when you know you're next to your person.",
  },
  {
    image: cristina5.url,
    title: "Playful love",
    text: "The kind of love that laughs hard, carries each other when life gets heavy, and turns ordinary rooms into core memories.",
  },
  {
    image: cristina3.url,
    title: "Joy in full color",
    text: "Every photo feels like proof that happiness became easier to believe in once you two found each other.",
  },
];

const gallery = [
  { src: cristina1.url, alt: "Cristina and her partner together by the window, smiling and close." },
  { src: cristina6.url, alt: "Close-up portrait of Cristina and her partner sharing a playful moment together." },
  { src: cristina2.url, alt: "Cristina and family in the car sharing a fun, candid moment." },
  { src: cristina4.url, alt: "Cristina and her partner making a playful face together at a restaurant." },
  { src: cristina5.url, alt: "Cristina being carried in front of a mirror during a funny sweet moment together." },
  { src: cristina8.url, alt: "Cristina and her partner smiling together in the car." },
  { src: cristina3.url, alt: "Cristina and her partner smiling together over dinner." },
  { src: cristina7.url, alt: "Cristina and her partner kissing beneath a vivid orange sunset." },
];

const letters = [
  {
    title: "You became home",
    opening: "My beloved Cristina,",
    body: [
      "There is something I rarely say out loud because even writing it makes my chest tighten: I do not know how to imagine a life without you.",
      "I can imagine hard seasons. I can imagine us struggling, rebuilding, staying up through long nights, facing sickness, mistakes, and storms. But I cannot imagine a world where you are gone and I am somehow expected to remain the same man.",
      "Because the truth is simple — the man I was before you and the man I am now are not the same. You changed me too deeply. You loved me too completely. You became part of my heart in a way words still fail to explain.",
      "You are present in almost every happy thought I have. Every dream of the future has your face in it. Every prayer has your name in it. Every goal somehow leads back to you.",
      "Before you, I survived. After you, I lived. You did not just make me happier — you made life feel meaningful, ordinary days feel sacred, and tomorrow feel worth reaching for.",
      "If I could ask God for one thing, it would be this: let me love her for as long as possible. Let me hold her hand for as long as possible. Let me hear her laugh for as long as possible. Because home was never a place. It was always you.",
    ],
  },
  {
    title: "If love could choose forever",
    opening: "My darling Cristina,",
    body: [
      "Sometimes late at night, when the world is quiet and my heart wanders toward the future, I think about growing old with you — decades of memories, children, grandchildren, laughter, tears, and all the beautiful ordinary moments in between.",
      "And then one thought rises above all the rest: a world without you in it is something my heart still refuses to understand.",
      "It is not a thought rooted in fear as much as it is rooted in love. You are woven into every routine, every dream, every prayer, every hope. You are not simply someone I love; you became part of the way I experience life itself.",
      "If one day one of us has to wait for the other, I know love like ours will not disappear. It will remain in the walls of the home we built, in the stories our children tell, in the habits we gave each other, and in the tenderness we leave behind.",
      "Still, what I pray for is beautifully simple: gray hair and wrinkles, slow walks, old photographs, grandchildren in our laps, thousands of ordinary days beside you, and a lifetime full of inside jokes no one else understands.",
      "Whether I leave first or whether you do, my love will never stop reaching for you — because loving you was never something my heart merely learned. It feels like something it was created to do.",
    ],
  },
  {
    title: "Every future version of you",
    opening: "My sweetest Cristina,",
    body: [
      "There is something I have never been able to explain properly: so much of my heart already belongs to moments that have not even happened yet.",
      "When I think of you, I do not think only about today. I think about twenty years from now, thirty years from now, the versions of us that have not even existed yet. I think about the woman you will become, the mother you will become, the grandmother you will become — and somehow I already love those versions of you too.",
      "I love the woman sitting beside me today, but I also love the woman who will someday have more lines around her smile from years of laughing with me, the woman who will cry at milestones because her heart is too full, the woman who will carry our family with tenderness and strength.",
      "Before you, I was always trying to get somewhere, always treating happiness like it was waiting on the other side of some achievement. Then you came into my life, and suddenly happiness had a face, a laugh, a voice, and a name: Cristina.",
      "Now some of my favorite moments are the simplest ones — when you are talking about something random and I am just watching you, when we are together with nothing important to say, when life is completely ordinary and yet somehow unforgettable because it is with you.",
      "We are not finished growing, dreaming, or becoming. And no matter where life leads from here, I want every step of it with you.",
    ],
  },
  {
    title: "I will keep choosing you",
    opening: "My beautiful Cristina,",
    body: [
      "The truth is, my love for you does not stay the same. It grows — every single day.",
      "Even on the days I am frustrated with myself, even when I feel the distance between who I am and who I want to be, even when I feel like I have fallen short, there is something about you that keeps teaching me how to stand back up.",
      "When I met you, I stopped wanting to become better only for myself. I started wanting to become better for us — for our future, for our children, for the life we are going to build together.",
      "You gave me one of the greatest gifts anyone has ever given me: hope. You gave me something worth fighting for when life felt heavy. You gave me a reason to keep taking one more step when I felt exhausted.",
      "There may come days with less money than I hoped for, mistakes I wish I could undo, or moments where I feel afraid. But there will never come a day where I stop loving you. My love for you was never built on perfect circumstances — it was built on choice.",
      "Every morning I wake up and choose you. Every night before I sleep, I choose you. Every dream I have includes you. And if God gives me fifty more years beside you, I believe I will spend every one of them finding new reasons to fall in love with you all over again.",
    ],
  },
  {
    title: "The family we will build",
    opening: "My beautiful Cristina,",
    body: [
      "Sometimes when we talk about our future and the family we dream of having, I catch myself getting emotional before I even realize it. Because when I picture our child, I do not just see a baby — I see a piece of us, a little heartbeat made from two people who loved each other enough to build a life together.",
      "I imagine tiny fingers wrapped around yours, late nights where we are exhausted but smiling, and the first time I hear someone call you Mom. Even thinking about it makes my heart feel full.",
      "I know life will not give us only beautiful days. There will be loss, grief, hard seasons, and moments that test us. And when those days come, I need you to know this with certainty: you will never carry that pain alone.",
      "I will sit with you in it. I will hold your hand through it. I will cry with you if you need me to. And if all you can do is fall apart for a little while, I will stay and help you gather every piece back together.",
      "Our children will know the names, stories, and love of the people who shaped you. They will know the tenderness you carry, and they will grow up seeing what unconditional love looks like because they will see it in you every day.",
      "I did not choose you only for the easy days. I chose you for all of them — the joyful ones, the painful ones, the ordinary ones, and the unforgettable ones. And that is the future I want most: not a perfect life, but a real and beautiful one that we face together, always.",
    ],
  },
];

function CristinaPage() {
  return (
    <main className="min-h-screen bg-[var(--love-bg)] text-[var(--love-ink)] font-love-body">
      <section className="relative overflow-hidden border-b border-[oklch(0.82_0.04_10/0.55)] bg-[linear-gradient(180deg,oklch(0.99_0.01_20),oklch(0.95_0.03_8))]">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,oklch(0.88_0.08_20/0.45),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-8 pb-20 md:pt-10 md:pb-28">
          <div className="flex items-center justify-between gap-4 text-sm">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.8_0.04_10/0.65)] bg-white/70 px-4 py-2 text-[var(--love-ink)] transition hover:bg-white"
            >
              Back to main site
            </Link>
            <div className="hidden md:flex items-center gap-2 text-[oklch(0.52_0.06_8)]">
              <Heart size={14} className="fill-current" />
              A private corner of forever
            </div>
          </div>

          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.83_0.05_15/0.7)] bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[oklch(0.56_0.08_10)]">
                <Sparkles size={14} /> For Cristina
              </div>
              <h1 className="mt-6 max-w-4xl font-love-display text-6xl leading-[0.95] text-[var(--love-rose-deep)] md:text-8xl">
                A love written in letters,
                <span className="block text-[var(--love-ink)]"> memories, and the future.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[oklch(0.4_0.04_350)] md:text-xl">
                This is a place for everything your heart keeps returning to: the photos, the promises,
                the quiet gratitude, the dreams of family, and the truth that loving Cristina changed
                what life means.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#letters"
                  className="inline-flex items-center rounded-full bg-[var(--love-rose-deep)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Read the letters
                </a>
                <a
                  href="#gallery"
                  className="inline-flex items-center rounded-full border border-[oklch(0.8_0.04_10/0.75)] bg-white/70 px-6 py-3 text-sm font-semibold text-[var(--love-ink)] transition hover:bg-white"
                >
                  View your photos
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-10">
                  <figure className="overflow-hidden rounded-[2rem] border border-white/70 bg-white p-2 love-glow">
                    <img src={cristina8.url} alt="Cristina and her partner smiling together in the car." className="aspect-[4/5] w-full rounded-[1.4rem] object-cover" />
                  </figure>
                  <figure className="overflow-hidden rounded-[2rem] border border-white/70 bg-white p-2 shadow-[0_20px_60px_-30px_oklch(0.61_0.16_8/0.28)]">
                    <img src={cristina3.url} alt="Cristina and her partner smiling together over dinner." className="aspect-[4/5] w-full rounded-[1.4rem] object-cover" />
                  </figure>
                </div>
                <div className="space-y-4">
                  <figure className="overflow-hidden rounded-[2.25rem] border border-white/70 bg-white p-2 love-glow">
                    <img src={cristina7.url} alt="Cristina and her partner kissing beneath a vivid orange sunset." className="aspect-[4/5] w-full rounded-[1.5rem] object-cover" />
                  </figure>
                  <div className="rounded-[2rem] border border-[oklch(0.84_0.04_10/0.8)] bg-white/80 p-6 text-center shadow-[0_16px_50px_-28px_oklch(0.61_0.16_8/0.3)]">
                    <div className="font-love-display text-3xl text-[var(--love-rose-deep)]">"Home was never a place. It was you."</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 flex justify-center">
            <a href="#moments" className="inline-flex flex-col items-center gap-2 text-sm text-[oklch(0.5_0.05_12)] hover:text-[var(--love-rose-deep)]">
              <span>Scroll through your story</span>
              <ChevronDown size={18} />
            </a>
          </div>
        </div>
      </section>

      <section id="moments" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.55_0.06_10)]">Favorite moments</p>
          <h2 className="mt-3 font-love-display text-5xl text-[var(--love-rose-deep)]">The beautiful ordinary</h2>
          <p className="mt-4 text-lg leading-8 text-[oklch(0.4_0.04_350)]">
            Not because every moment was perfect, but because love made even the simplest moments feel unforgettable.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {memories.map((memory) => (
            <article key={memory.title} className="overflow-hidden rounded-[2rem] border border-[oklch(0.84_0.04_10/0.7)] bg-white/80 shadow-[0_20px_60px_-40px_oklch(0.61_0.16_8/0.35)]">
              <img src={memory.image} alt={memory.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />
              <div className="p-6 md:p-7">
                <h3 className="font-love-display text-3xl text-[var(--love-rose-deep)]">{memory.title}</h3>
                <p className="mt-3 leading-8 text-[oklch(0.4_0.04_350)]">{memory.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="letters" className="border-y border-[oklch(0.84_0.04_10/0.7)] bg-[oklch(0.96_0.025_20)]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.55_0.06_10)]">Love letters</p>
            <h2 className="mt-3 font-love-display text-5xl text-[var(--love-rose-deep)]">Everything your heart has been trying to say</h2>
            <p className="mt-4 text-lg leading-8 text-[oklch(0.4_0.04_350)]">
              Your words kept their depth and emotion — I just shaped the openings so each letter reads clearly and beautifully from the start.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {letters.map((letter) => (
              <article key={letter.title} className="love-paper rounded-[2rem] border border-[oklch(0.84_0.04_10/0.75)] p-8 shadow-[0_26px_70px_-42px_oklch(0.61_0.16_8/0.34)] md:p-10">
                <p className="text-xs uppercase tracking-[0.28em] text-[oklch(0.56_0.08_10)]">{letter.title}</p>
                <h3 className="mt-4 font-love-display text-4xl text-[var(--love-rose-deep)]">{letter.opening}</h3>
                <div className="mt-6 space-y-5 text-[1.02rem] leading-8 text-[oklch(0.33_0.04_345)]">
                  {letter.body.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.55_0.06_10)]">Photo gallery</p>
            <h2 className="mt-3 font-love-display text-5xl text-[var(--love-rose-deep)]">Proof that joy looks like this</h2>
            <p className="mt-4 text-lg leading-8 text-[oklch(0.4_0.04_350)]">
              Every one of these belongs here — candid, playful, intimate, and full of the kind of love that already feels like a lifetime.
            </p>
          </div>
          <div className="rounded-full border border-[oklch(0.82_0.04_10/0.7)] bg-white/70 px-5 py-3 text-sm text-[oklch(0.44_0.04_350)]">
            8 favorite photos and more to come
          </div>
        </div>

        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {gallery.map((photo, index) => (
            <figure key={photo.src} className={`mb-5 overflow-hidden rounded-[1.75rem] border border-white/80 bg-white p-2 shadow-[0_18px_55px_-35px_oklch(0.61_0.16_8/0.32)] ${index % 3 === 0 ? "" : ""}`}>
              <img src={photo.src} alt={photo.alt} loading="lazy" className="w-full rounded-[1.2rem] object-cover" />
            </figure>
          ))}
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-[oklch(0.82_0.05_12/0.8)] bg-[linear-gradient(135deg,oklch(0.99_0.01_10),oklch(0.93_0.04_8))] p-10 text-center shadow-[0_26px_70px_-36px_oklch(0.61_0.16_8/0.35)] md:p-14">
          <p className="text-xs uppercase tracking-[0.35em] text-[oklch(0.56_0.08_10)]">For your forever person</p>
          <h2 className="mt-4 font-love-display text-5xl text-[var(--love-rose-deep)] md:text-6xl">The most beautiful chapter will always be you.</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[oklch(0.4_0.04_350)]">
            This page can keep growing with more photos, more letters, anniversaries, voice notes, timelines,
            or anything else you want to add for Cristina.
          </p>
        </div>
      </section>
    </main>
  );
}
