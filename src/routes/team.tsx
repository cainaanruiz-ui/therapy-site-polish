import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import luisImg from "@/assets/luis.jpg";
import karenImg from "@/assets/karen.jpg";
import brittanyImg from "@/assets/brittany.jpg";

export const Route = createFileRoute("/team")({
  component: TeamPage,
  head: () => ({
    meta: [
      { title: "Meet Our Team — Happy 2 Help Counseling" },
      { name: "description", content: "Bilingual, culturally responsive clinicians providing compassionate care in Atlanta, GA." },
    ],
  }),
});

const TEAM = [
  {
    name: "Luis E. Ruiz, LCSW",
    role: "Clinical Director · Therapist",
    img: luisImg,
    bio: [
      "I am a bilingual (English and Spanish) Licensed Clinical Social Worker with years of experience providing counseling focused on anxiety, depression, trauma, stress management, PTSD, and family and relationship issues.",
      "I believe the goal of therapy is to help clients achieve their personal goals and live life to the fullest using evidence-based psychotherapy. I embrace the therapeutic relationship as an opportunity to connect with clients using a collaborative approach.",
      "I am retired from the U.S. Army and completed two combat tours in Iraq. I am a devoted husband to my wife, Micaih, and a loving parent to my two wonderful children, Haley and Cainaan.",
    ],
  },
  {
    name: "Karen Sanchez, M.Ed.",
    role: "Therapist",
    img: karenImg,
    bio: [
      "Karen brings over 10 years of counseling experience, working extensively with high-trauma populations and supporting children and adolescents through life's most challenging moments. She specializes in working with youth ages 6–18, helping them navigate emotional, behavioral and developmental concerns with compassion and cultural sensitivity.",
      "Karen holds a Master's in School Counseling from Liberty University and is currently pursuing her Doctorate in Counselor Education and Supervision. As a bilingual therapist fluent in English and Spanish, she is passionate about providing accessible, inclusive care for diverse families.",
      "Karen is excited to bring her experience and heart for healing to the Happy 2 Help Counseling team, walking alongside children and families on their journey toward growth and resilience.",
    ],
  },
  {
    name: "Brittany Henson, MSW",
    role: "Therapist · New Therapist Loading…",
    img: brittanyImg,
    bio: [
      "🌱 New therapist loading… please be patient, magic is happening! Brittany is the newest addition to the Happy 2 Help Counseling family, and we couldn't be more excited to welcome her.",
      "Brittany holds a Master of Social Work (MSW) and brings warmth, humor and a deep heart for helping people feel truly seen. She believes therapy should feel less like a checklist and more like a real conversation — where growth, honesty and a little bit of laughter all have a seat at the table.",
      "A full bio is on its way soon. In the meantime, know that Brittany is ready to walk alongside you with compassion, curiosity and care.",
    ],
  },
];

function TeamPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 md:pt-20 pb-10">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Our Team</div>
        <h1 className="font-display text-5xl md:text-6xl text-primary max-w-3xl leading-[1.05]">Caring clinicians, dedicated to your story.</h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
          Our clinicians provide culturally responsive care in a supportive, professional environment.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-10 space-y-16">
        {TEAM.map((m, i) => (
          <article key={m.name} className={`grid md:grid-cols-[1fr_1.5fr] gap-10 items-start ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-secondary shadow-[var(--shadow-card)]">
              <img src={m.img} alt={m.name} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-display text-3xl text-primary">{m.name}</h2>
              <div className="mt-1 text-sm uppercase tracking-widest text-accent">{m.role}</div>
              <div className="mt-6 space-y-4 text-foreground/80 leading-relaxed">
                {m.bio.map((p, idx) => <p key={idx}>{p}</p>)}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
        <div className="rounded-3xl bg-secondary/50 border border-border p-10 md:p-14 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-primary">Ready to take the next step?</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">We'd be honored to support you. Schedule a consultation and we'll match you with the right fit.</p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90">Book a Session</Link>
            <Link to="/services" className="inline-flex items-center rounded-full border border-primary/20 text-primary px-6 py-3 text-sm font-medium hover:bg-background">Explore Services</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}