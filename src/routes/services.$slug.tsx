import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

type ServiceDetail = {
  slug: string;
  title: string;
  tagline: string;
  img: string;
  overview: string;
  whoFor: string[];
  approach: string[];
  topics: string[];
};

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "adult-therapy",
    title: "Adult Therapy",
    tagline: "One-on-one support for stress, anxiety, depression and life transitions.",
    img: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?auto=format&fit=crop&w=1400&q=80",
    overview:
      "Adult therapy is a confidential space to talk through what's weighing on you and build practical skills to feel better. Sessions are tailored to your goals — whether that's calming anxiety, lifting low mood, healing from the past, or making a big decision.",
    whoFor: [
      "Adults feeling stuck, overwhelmed, or burned out",
      "Anyone navigating a major life transition",
      "People wanting tools for stress, anxiety, or depression",
    ],
    approach: [
      "Evidence-based talk therapy (CBT, person-centered, solution-focused)",
      "Goal setting and skill building between sessions",
      "Weekly or biweekly sessions, in-person or virtual",
    ],
    topics: ["Anxiety", "Depression", "Stress & burnout", "Self-esteem", "Life transitions", "Work concerns"],
  },
  {
    slug: "child-therapy",
    title: "Child Therapy",
    tagline: "Play-based, developmentally appropriate care for young children.",
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1400&q=80",
    overview:
      "Children often express big feelings through play and behavior rather than words. Our child therapy uses play, art, and connection to help kids feel safe, understood, and equipped to handle what's hard.",
    whoFor: [
      "Children ages 4–12",
      "Families noticing changes in mood, sleep, behavior or school",
      "Kids navigating divorce, grief, bullying, or anxiety",
    ],
    approach: [
      "Play and expressive arts therapy",
      "Parent collaboration and coaching",
      "Coordination with schools when helpful",
    ],
    topics: ["Big emotions", "Behavior concerns", "School stress", "Grief & loss", "Anxiety", "Family changes"],
  },
  {
    slug: "teen-counseling",
    title: "Teen Counseling",
    tagline: "A safe space for teens navigating identity, school and relationships.",
    img: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?auto=format&fit=crop&w=1400&q=80",
    overview:
      "Adolescence is a season of huge change. Teen counseling offers a nonjudgmental space to talk through identity, friendships, family, school pressure, and mental health — at a pace that feels right.",
    whoFor: [
      "Teens ages 13–17",
      "Parents concerned about mood, isolation, or risky behavior",
      "Teens managing anxiety, depression, or identity questions",
    ],
    approach: [
      "Teen-led, collaborative sessions",
      "CBT and mindfulness-based tools",
      "Optional parent check-ins to support the work at home",
    ],
    topics: ["Anxiety & depression", "Identity & self-worth", "Friendships", "Academic stress", "Family conflict", "Social media"],
  },
  {
    slug: "individual-counseling",
    title: "Individual Counseling",
    tagline: "Personalized, goal-oriented therapy tailored to your needs.",
    img: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1400&q=80",
    overview:
      "Individual counseling is therapy built around you — your story, your goals, and the pace that feels right. We blend approaches to fit what works best for your situation.",
    whoFor: [
      "Anyone seeking personal growth or change",
      "People processing past experiences",
      "Clients wanting an integrated, tailored approach",
    ],
    approach: [
      "Integrative, evidence-based methods",
      "Clear goals you set together",
      "Regular check-ins on progress",
    ],
    topics: ["Personal growth", "Emotional regulation", "Trauma recovery", "Boundaries", "Confidence", "Decision making"],
  },
  {
    slug: "couples-counseling",
    title: "Couples Counseling",
    tagline: "Rebuild connection, communication and trust together.",
    img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1400&q=80",
    overview:
      "Couples therapy helps partners better understand each other, repair ruptures, and build patterns that bring you closer. Whether you're navigating conflict, a betrayal, or just feeling distant — there's a path forward.",
    whoFor: [
      "Dating, engaged, or married couples",
      "Partners stuck in repeated arguments",
      "Couples rebuilding trust or considering big decisions",
    ],
    approach: [
      "Communication skill building",
      "Attachment-informed sessions",
      "Homework and rituals between sessions",
    ],
    topics: ["Communication", "Conflict patterns", "Trust & betrayal", "Intimacy", "Parenting together", "Life transitions"],
  },
  {
    slug: "family-counseling",
    title: "Family Counseling",
    tagline: "Strengthen relationships and navigate change as a family.",
    img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1400&q=80",
    overview:
      "Families work best when everyone feels heard. Family counseling brings members together to understand patterns, repair conflict, and build healthier ways of relating.",
    whoFor: [
      "Families in conflict or transition",
      "Blended families finding their footing",
      "Parents and teens stuck in cycles of disconnection",
    ],
    approach: [
      "Systemic, strengths-based therapy",
      "Structured conversations everyone can join",
      "Practical tools for home",
    ],
    topics: ["Communication", "Parent-child conflict", "Divorce & blending", "Grief", "Cultural dynamics", "Major transitions"],
  },
  {
    slug: "group-therapy",
    title: "Group Therapy",
    tagline: "Shared healing and growth in a small, supportive group setting.",
    img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1400&q=80",
    overview:
      "Group therapy is a powerful reminder that you're not alone. In a small, confidential group, members support one another while learning skills and gaining perspective.",
    whoFor: [
      "Adults seeking connection alongside therapy",
      "People working on similar themes (anxiety, grief, parenting)",
      "Clients wanting an affordable complement to individual work",
    ],
    approach: [
      "Small groups led by a licensed clinician",
      "Clear group agreements for safety and confidentiality",
      "Skill building and shared reflection",
    ],
    topics: ["Anxiety", "Grief", "Parenting", "Women's groups", "Men's groups", "Life transitions"],
  },
  {
    slug: "parenting-support",
    title: "Parenting Support",
    tagline: "Practical strategies and emotional support for parents.",
    img: "https://images.unsplash.com/photo-1542884748-2b87b36c6b90?auto=format&fit=crop&w=1400&q=80",
    overview:
      "Parenting is one of the hardest, most meaningful jobs there is. Parenting support gives you a place to think, vent, and learn new strategies that fit your child and your family.",
    whoFor: [
      "Parents of children or teens of any age",
      "Co-parents working through a separation",
      "Caregivers feeling burned out or unsure",
    ],
    approach: [
      "Collaborative, nonjudgmental coaching",
      "Evidence-based parenting frameworks",
      "Tools for hard moments and big feelings",
    ],
    topics: ["Discipline & limits", "Big emotions", "School struggles", "Co-parenting", "Teen years", "Caregiver burnout"],
  },
  {
    slug: "coaching-supervision",
    title: "Coaching / Supervision",
    tagline: "Clinical supervision and professional coaching for clinicians.",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1400&q=80",
    overview:
      "We offer clinical supervision for prelicensed clinicians and professional coaching for therapists growing their practice. Sessions are reflective, practical, and tailored to your stage.",
    whoFor: [
      "Prelicensed clinicians (LMSW, APC, AMFT)",
      "Therapists seeking case consultation",
      "Clinicians growing a private practice",
    ],
    approach: [
      "Individual or group supervision",
      "Case consultation and ethics review",
      "Practice-building and professional development",
    ],
    topics: ["Clinical skill", "Ethics", "Case conceptualization", "Cultural humility", "Self-care", "Practice growth"],
  },
];

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICE_DETAILS.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.title} — Happy 2 Help Counseling` },
          { name: "description", content: loaderData.service.tagline },
          { property: "og:title", content: `${loaderData.service.title} — Happy 2 Help Counseling` },
          { property: "og:description", content: loaderData.service.tagline },
          { property: "og:image", content: loaderData.service.img },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-5 sm:px-8 py-24 text-center">
        <h1 className="font-display text-4xl text-primary">Service not found</h1>
        <p className="mt-3 text-muted-foreground">The service you're looking for doesn't exist.</p>
        <Link to="/services" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90">
          <ArrowLeft size={16} /> Back to Services
        </Link>
      </section>
    </SiteLayout>
  ),
  errorComponent: ({ reset }) => (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-5 sm:px-8 py-24 text-center">
        <h1 className="font-display text-4xl text-primary">Something went wrong</h1>
        <button onClick={reset} className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90">Try again</button>
      </section>
    </SiteLayout>
  ),
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { service } = Route.useLoaderData();
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-12 md:pt-16">
        <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft size={14} /> All services
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-6 pb-10 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Service</div>
          <h1 className="font-display text-5xl md:text-6xl text-primary leading-[1.05]">{service.title}</h1>
          <p className="mt-5 text-lg text-muted-foreground">{service.tagline}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90">
              Book a Session <ArrowRight size={16} />
            </Link>
            <a href="https://www.therapyportal.com/p/h2hcounseling/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-primary/20 text-primary px-6 py-3 text-sm font-medium hover:bg-secondary">Client Portal</a>
          </div>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-border">
          <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-12 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Overview</div>
          <p className="text-foreground/85 leading-relaxed text-lg">{service.overview}</p>

          <div className="mt-10">
            <h2 className="font-display text-2xl text-primary">Our approach</h2>
            <ul className="mt-4 space-y-2">
              {service.approach.map((a) => (
                <li key={a} className="flex items-start gap-2 text-foreground/85"><CheckCircle2 size={18} className="text-accent mt-0.5 shrink-0" /> {a}</li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-2xl text-primary">Topics we explore</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {service.topics.map((t) => (
                <span key={t} className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm text-foreground/80">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <aside className="bg-secondary/50 rounded-2xl p-6 border border-border h-fit">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Who it's for</div>
          <ul className="space-y-2">
            {service.whoFor.map((w) => (
              <li key={w} className="flex items-start gap-2 text-sm text-foreground/85"><CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" /> {w}</li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-border text-sm space-y-2">
            <div><span className="text-muted-foreground">Email:</span> <a className="text-primary hover:underline" href="mailto:Luis@happy2helpcounseling.org">Luis@happy2helpcounseling.org</a></div>
            <div><span className="text-muted-foreground">Phone:</span> <a className="text-primary hover:underline" href="tel:14046923539">(404) 692-3539</a></div>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <h2 className="font-display text-3xl text-primary">Explore other services</h2>
          <Link to="/services" className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1">See all <ArrowRight size={14} /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICE_DETAILS.filter((s) => s.slug !== service.slug).slice(0, 4).map((s) => (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group rounded-2xl overflow-hidden bg-card border border-border hover:shadow-[var(--shadow-card)] transition">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="p-4">
                <div className="font-display text-lg text-primary">{s.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}