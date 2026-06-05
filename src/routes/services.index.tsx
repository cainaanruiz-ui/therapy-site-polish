import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SERVICE_DETAILS } from "./services.$slug";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Happy 2 Help Counseling" },
      { name: "description", content: "Therapy services for adults, children, teens, couples, families and groups. In-person and virtual sessions in Atlanta, GA." },
    ],
  }),
});

const SERVICES = SERVICE_DETAILS.map((s) => ({ slug: s.slug, title: s.title, desc: s.tagline, img: s.img }));

const FOCUS = [
  "Anxiety & stress", "Depression & mood concerns", "Relationship challenges",
  "Grief & loss", "Trauma recovery", "Self-esteem",
  "Life transitions", "Personal growth",
];

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 md:pt-20 pb-10">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Our Services</div>
        <h1 className="font-display text-5xl md:text-6xl text-primary max-w-3xl leading-[1.05]">Support for every relationship, every stage.</h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
          Services are available for individuals, couples, families and groups — offered in-person or virtually.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90">Book a Session <ArrowRight size={16} /></Link>
          <a href="https://www.therapyportal.com/p/h2hcounseling/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-primary/20 text-primary px-6 py-3 text-sm font-medium hover:bg-secondary">Client Portal</a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <Link to="/services/$slug" params={{ slug: s.slug }} key={s.slug} className="group rounded-2xl overflow-hidden bg-card border border-border hover:shadow-[var(--shadow-card)] transition flex flex-col">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <div className="mt-4 text-sm text-primary inline-flex items-center gap-1 font-medium">Learn more <ArrowRight size={14} /></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Focus Areas</div>
          <h2 className="font-display text-3xl text-primary">Therapy can help with many concerns</h2>
          <ul className="mt-6 grid grid-cols-2 gap-3">
            {FOCUS.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                <CheckCircle2 size={16} className="text-accent" /> {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-secondary/50 rounded-2xl p-8 border border-border">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Rates & Insurance</div>
          <h3 className="font-display text-2xl text-primary">Let's talk about what works for you.</h3>
          <p className="mt-3 text-muted-foreground text-sm">For current rates, insurance information, or billing questions, please contact us directly. Sliding scale availability and insurance options may vary by provider and service type.</p>
          <div className="mt-5 space-y-2 text-sm">
            <div><span className="text-muted-foreground">Email:</span> <a className="text-primary hover:underline" href="mailto:Luis@happy2helpcounseling.org">Luis@happy2helpcounseling.org</a></div>
            <div><span className="text-muted-foreground">Phone:</span> <a className="text-primary hover:underline" href="tel:14046923539">(404) 692-3539</a></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">What to Expect</div>
        <h2 className="font-display text-3xl text-primary mb-10">A simple path forward</h2>
        <ol className="grid md:grid-cols-4 gap-6">
          {[
            ["Start", "Reach out to schedule a consult or first session."],
            ["Session", "Share what's bringing you in and what you want to change."],
            ["Plan", "You and your therapist set goals and choose strategies."],
            ["Progress", "Sessions are weekly or biweekly and adjust over time."],
          ].map(([t, d], i) => (
            <li key={t} className="bg-card border border-border rounded-2xl p-6">
              <div className="text-accent font-display text-3xl">0{i + 1}</div>
              <div className="mt-2 font-display text-lg text-primary">{t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </section>
    </SiteLayout>
  );
}