import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

type ServiceDetail = {
  slug: string;
  title: string;
  tagline: string;
  img: string;
  overview: string[];
  whoFor: string[];
  approach: string[];
  topics: string[];
  signs: string[];
  whatToExpect: string[];
  facts: { stat: string; source: string }[];
};

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "adult-therapy",
    title: "Adult Therapy",
    tagline: "One-on-one support for stress, anxiety, depression and life transitions.",
    img: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?auto=format&fit=crop&w=1400&q=80",
    overview: [
      "Adult therapy is a confidential space to talk through what's weighing on you and build practical skills to feel better. Sessions are tailored to your goals — whether that's calming anxiety, lifting low mood, healing from the past, or making a big decision.",
      "Adulthood brings layered pressures — work, relationships, caregiving, finances, identity — and the body and mind keep score. Therapy gives you a place to slow down, make sense of what you're feeling, and try out new ways of responding so the same patterns stop running your life.",
    ],
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
    signs: [
      "Persistent worry, racing thoughts, or trouble sleeping",
      "Low energy, low motivation, or losing interest in things you enjoyed",
      "Irritability, snapping at people you love, or feeling numb",
      "Using food, alcohol, work, or your phone to cope more than you'd like",
    ],
    whatToExpect: [
      "A free, no-pressure consult to make sure it's a good fit",
      "A first session focused on your story and what you want to change",
      "Collaborative goals and clear, doable steps between sessions",
    ],
    facts: [
      { stat: "Nearly 1 in 5 U.S. adults lives with a mental illness in any given year.", source: "National Institute of Mental Health" },
      { stat: "Anxiety disorders affect roughly 19% of U.S. adults each year — the most common mental health concern.", source: "NIMH" },
      { stat: "Around 8% of U.S. adults experience a major depressive episode in a given year.", source: "NIMH" },
      { stat: "Roughly 75% of people who enter therapy show some benefit from it.", source: "American Psychological Association" },
    ],
  },
  {
    slug: "child-therapy",
    title: "Child Therapy",
    tagline: "Play-based, developmentally appropriate care for young children.",
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1400&q=80",
    overview: [
      "Children often express big feelings through play and behavior rather than words. Our child therapy uses play, art, and connection to help kids feel safe, understood, and equipped to handle what's hard.",
      "Early support matters. The skills children build now — naming feelings, calming their bodies, asking for help — shape how they handle stress for the rest of their lives. Parents are a key part of the work and learn tools to use at home, too.",
    ],
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
    signs: [
      "Frequent meltdowns, big anger, or sudden shutdowns",
      "New fears, clinginess, or trouble separating",
      "Changes in sleep, appetite, or stomachaches with no clear cause",
      "Trouble at school, with friendships, or after a family change",
    ],
    whatToExpect: [
      "A parent intake to hear the full picture before meeting your child",
      "Play-based sessions in a calm, kid-friendly space",
      "Regular parent check-ins with strategies to use at home",
    ],
    facts: [
      { stat: "About 1 in 6 U.S. children ages 2–8 has a diagnosed mental, behavioral, or developmental disorder.", source: "Centers for Disease Control and Prevention" },
      { stat: "Roughly 9.4% of children ages 3–17 have diagnosed anxiety; about 4.4% have diagnosed depression.", source: "CDC" },
      { stat: "Half of all lifetime mental illness begins by age 14.", source: "National Alliance on Mental Illness (NAMI)" },
      { stat: "Early intervention improves long-term emotional, academic, and social outcomes for children.", source: "American Academy of Pediatrics" },
    ],
  },
  {
    slug: "teen-counseling",
    title: "Teen Counseling",
    tagline: "A safe space for teens navigating identity, school and relationships.",
    img: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?auto=format&fit=crop&w=1400&q=80",
    overview: [
      "Adolescence is a season of huge change. Teen counseling offers a nonjudgmental space to talk through identity, friendships, family, school pressure, and mental health — at a pace that feels right.",
      "The teen brain is still developing the parts that handle emotion regulation and decision-making, which is why everything can feel so intense. Therapy helps teens understand themselves, build coping skills, and feel less alone — without it being their parent's idea of what should happen.",
    ],
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
    signs: [
      "Pulling away from family or friends they used to enjoy",
      "Big mood swings, irritability, or persistent sadness",
      "Trouble sleeping, changes in appetite, or drops in grades",
      "Talk of hopelessness, self-harm, or feeling like a burden",
    ],
    whatToExpect: [
      "Confidential sessions — what teens share stays private, with clear safety exceptions",
      "A relaxed first session focused on what your teen actually cares about",
      "Optional parent check-ins so caregivers feel informed without invading privacy",
    ],
    facts: [
      { stat: "Nearly 1 in 5 U.S. teens ages 12–17 had a major depressive episode in the past year.", source: "NIMH" },
      { stat: "Roughly 1 in 3 high school students reports persistent feelings of sadness or hopelessness.", source: "CDC Youth Risk Behavior Survey" },
      { stat: "Suicide is the second leading cause of death for people ages 10–24 in the U.S.", source: "CDC" },
      { stat: "Teens who feel connected to family and school are significantly less likely to experience mental health crises.", source: "CDC" },
    ],
  },
  {
    slug: "individual-counseling",
    title: "Individual Counseling",
    tagline: "Personalized, goal-oriented therapy tailored to your needs.",
    img: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1400&q=80",
    overview: [
      "Individual counseling is therapy built around you — your story, your goals, and the pace that feels right. We blend approaches to fit what works best for your situation.",
      "Whether you're working through something specific or just want a space to think clearly, individual therapy is one of the most studied and effective ways to improve mental health, relationships, and overall wellbeing.",
    ],
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
    signs: [
      "The same patterns keep showing up in your life or relationships",
      "You feel disconnected from yourself or unsure what you want",
      "Past experiences keep affecting your present",
      "You want a confidential space to think out loud",
    ],
    whatToExpect: [
      "A first session to map what's happening and what you'd like to be different",
      "An approach matched to you — CBT, person-centered, trauma-informed, or a blend",
      "Sessions that build on each other with concrete progress markers",
    ],
    facts: [
      { stat: "About 50% of U.S. adults will meet criteria for a mental health condition at some point in their life.", source: "CDC" },
      { stat: "Only about half of adults with a mental illness receive treatment in a given year.", source: "NAMI" },
      { stat: "Therapy is as effective as medication for mild-to-moderate depression and anxiety, with longer-lasting benefits.", source: "American Psychological Association" },
      { stat: "Most people start to notice meaningful change within 8–12 sessions.", source: "APA" },
    ],
  },
  {
    slug: "couples-counseling",
    title: "Couples Counseling",
    tagline: "Rebuild connection, communication and trust together.",
    img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1400&q=80",
    overview: [
      "Couples therapy helps partners better understand each other, repair ruptures, and build patterns that bring you closer. Whether you're navigating conflict, a betrayal, or just feeling distant — there's a path forward.",
      "Most couples wait an average of six years after problems start before getting help. You don't have to. Therapy is just as useful for strengthening a healthy relationship as it is for repairing one in crisis.",
    ],
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
    signs: [
      "The same fights on repeat, with no real resolution",
      "Feeling more like roommates than partners",
      "A betrayal, breach of trust, or major life change to navigate",
      "Wanting to deepen connection before something becomes a crisis",
    ],
    whatToExpect: [
      "A joint first session, sometimes followed by individual check-ins",
      "Structured conversations both partners can join safely",
      "Tools and rituals to practice at home between sessions",
    ],
    facts: [
      { stat: "Couples wait an average of 6 years of being unhappy before seeking help.", source: "Dr. John Gottman, Gottman Institute" },
      { stat: "Emotionally Focused Therapy shows 70–75% of couples move from distress to recovery, with 90% showing improvement.", source: "International Centre for Excellence in EFT" },
      { stat: "Strong relationships are linked to better physical health, lower stress, and longer life expectancy.", source: "Harvard Study of Adult Development" },
      { stat: "The way couples handle conflict matters more than how often they fight.", source: "Gottman Institute research" },
    ],
  },
  {
    slug: "family-counseling",
    title: "Family Counseling",
    tagline: "Strengthen relationships and navigate change as a family.",
    img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1400&q=80",
    overview: [
      "Families work best when everyone feels heard. Family counseling brings members together to understand patterns, repair conflict, and build healthier ways of relating.",
      "When one person in a family is struggling, it often shows up across the whole system. Working together — instead of focusing on one 'identified' person — helps everyone shift and creates change that lasts.",
    ],
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
    signs: [
      "Constant tension, yelling, or shutdowns at home",
      "A big change — divorce, blending, loss, illness, immigration — affecting everyone",
      "One family member is struggling and others don't know how to help",
      "Cultural or generational differences are creating distance",
    ],
    whatToExpect: [
      "A first session with the family members most involved",
      "Ground rules so everyone — including kids — can speak safely",
      "Practical homework: routines, repair scripts, and shared agreements",
    ],
    facts: [
      { stat: "Family therapy is shown to improve outcomes for adolescent depression, anxiety, substance use, and behavioral concerns.", source: "American Association for Marriage and Family Therapy" },
      { stat: "Roughly 90% of clients report improved emotional health after family therapy.", source: "AAMFT" },
      { stat: "Supportive family relationships are one of the strongest protective factors for youth mental health.", source: "CDC" },
      { stat: "Family-based interventions can reduce relapse rates for many mental health conditions.", source: "National Institute of Mental Health" },
    ],
  },
  {
    slug: "group-therapy",
    title: "Group Therapy",
    tagline: "Shared healing and growth in a small, supportive group setting.",
    img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1400&q=80",
    overview: [
      "Group therapy is a powerful reminder that you're not alone. In a small, confidential group, members support one another while learning skills and gaining perspective.",
      "Hearing other people put words to what you've been carrying — and being heard yourself — is uniquely healing. Group works alongside, or instead of, individual therapy depending on your goals.",
    ],
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
    signs: [
      "You feel isolated or like no one really 'gets it'",
      "You want to practice connection and communication in a safe space",
      "You're working on something — grief, anxiety, parenting — others share",
      "You'd like an affordable addition to your current support",
    ],
    whatToExpect: [
      "A brief intake to make sure the group is a good fit",
      "Small groups of 4–10 members with clear confidentiality agreements",
      "Weekly sessions with a structured but flexible format",
    ],
    facts: [
      { stat: "Group therapy is as effective as individual therapy for many concerns, including depression and anxiety.", source: "American Psychological Association" },
      { stat: "Loneliness has health risks comparable to smoking 15 cigarettes a day.", source: "U.S. Surgeon General Advisory on Social Connection" },
      { stat: "Feeling understood by peers is one of the strongest predictors of progress in group therapy.", source: "APA" },
      { stat: "Group members often report gains in confidence and social skills that individual therapy alone can't offer.", source: "American Group Psychotherapy Association" },
    ],
  },
  {
    slug: "parenting-support",
    title: "Parenting Support",
    tagline: "Practical strategies and emotional support for parents.",
    img: "https://images.unsplash.com/photo-1542884748-2b87b36c6b90?auto=format&fit=crop&w=1400&q=80",
    overview: [
      "Parenting is one of the hardest, most meaningful jobs there is. Parenting support gives you a place to think, vent, and learn new strategies that fit your child and your family.",
      "You don't need to be in crisis to get help. Many parents come simply to feel less alone, build a parenting toolkit, and respond more calmly when things get hard.",
    ],
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
    signs: [
      "You feel reactive, exhausted, or guilty more often than not",
      "The same hard moments keep repeating at home",
      "You and your co-parent are out of sync",
      "You want to parent differently than how you were parented",
    ],
    whatToExpect: [
      "A first session focused on your child, your family, and your goals",
      "Concrete tools — scripts, routines, calming strategies — to try this week",
      "Ongoing support to adjust and refine as things change",
    ],
    facts: [
      { stat: "The U.S. Surgeon General has called the stress on today's parents an urgent public health concern.", source: "U.S. Surgeon General Advisory, 2024" },
      { stat: "Roughly 41% of parents say most days they're so stressed they can't function.", source: "American Psychological Association" },
      { stat: "Children of caregivers who get parenting support show measurable improvements in behavior and emotional health.", source: "CDC" },
      { stat: "Self-compassion in parents is linked to lower anxiety, depression, and burnout.", source: "Journal of Child and Family Studies" },
    ],
  },
  {
    slug: "coaching-supervision",
    title: "Coaching / Supervision",
    tagline: "Clinical supervision and professional coaching for clinicians.",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1400&q=80",
    overview: [
      "We offer clinical supervision for prelicensed clinicians and professional coaching for therapists growing their practice. Sessions are reflective, practical, and tailored to your stage.",
      "Good supervision protects clients, supports clinicians, and builds long, sustainable careers. Whether you're moving toward licensure or refining an established practice, the space is collaborative and direct.",
    ],
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
    signs: [
      "You're working toward Georgia licensure and need quality supervision hours",
      "You want a consultant on tricky cases or ethics questions",
      "You're noticing burnout, vicarious trauma, or compassion fatigue",
      "You're building a private practice and want a thought partner",
    ],
    whatToExpect: [
      "A scope conversation to align on goals, frequency, and format",
      "Case-focused sessions with documentation that meets board requirements",
      "Honest feedback and a focus on your long-term clinician wellbeing",
    ],
    facts: [
      { stat: "Roughly half of mental health professionals report symptoms of burnout.", source: "American Psychological Association Workforce Study" },
      { stat: "High-quality clinical supervision is consistently linked to better client outcomes and clinician retention.", source: "American Counseling Association" },
      { stat: "Regular consultation reduces the risk of ethical errors and improves cultural responsiveness.", source: "APA Ethics Code Commentary" },
      { stat: "Clinicians with strong peer support report significantly lower rates of compassion fatigue.", source: "ProQOL Research" },
    ],
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
  const { service } = Route.useLoaderData() as { service: ServiceDetail };
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