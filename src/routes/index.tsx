import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, Heart, Shield, Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Happy 2 Help Counseling — Atlanta Therapy, In-Person & Virtual" },
      { name: "description", content: "Accessible, personalized mental health support in Atlanta. Therapy for adults, teens, children, couples and families." },
    ],
  }),
});

const HERO = "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1600&q=80";

function Index() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-10 flex justify-center">
          <img src={logo} alt="Happy 2 Help Counseling logo" className="w-56 md:w-72 h-auto" />
        </div>
        <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-6">
              <span className="w-8 h-px bg-accent" /> Atlanta, GA · In-person & Virtual
            </div>
            <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-primary">
              Accessible, personalized mental health support.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              A calm, confidential environment — available in-person or virtually — so you can get support in a way that fits your life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition">
                Book a Session <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-primary/20 text-primary px-6 py-3 text-sm font-medium hover:bg-secondary transition">
                Explore Services
              </Link>
              <a href="https://www.therapyportal.com/p/h2hcounseling/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary hover:underline">
                Client Portal
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[var(--shadow-soft)]">
              <img src={HERO} alt="Peaceful natural light through window" className="w-full h-full object-cover" loading="eager" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-[var(--shadow-card)] p-5 max-w-[240px] border border-border">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Our promise</div>
              <div className="mt-1 font-display text-lg text-primary leading-snug">Care that meets you where you are.</div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 grid md:grid-cols-3 gap-10">
          {[
            { icon: Heart, title: "Mission", text: "Provide high-quality care with an emphasis on access and affordability." },
            { icon: Sparkles, title: "Vision", text: "Create a setting that supports healing, growth, and resilience." },
            { icon: Shield, title: "Goal", text: "Help clients reach personal goals using evidence-informed tools and skills." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-card rounded-2xl p-7 border border-border">
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-primary mb-4">
                <Icon size={20} />
              </div>
              <h3 className="font-display text-2xl text-primary">{title}</h3>
              <p className="mt-2 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK SERVICES */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">What we offer</div>
            <h2 className="font-display text-4xl text-primary">A service for every season of life</h2>
          </div>
          <Link to="/services" className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1">
            See all services <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {QUICK.map((s) => (
            <Link to="/services" key={s.title} className="group rounded-2xl overflow-hidden bg-card border border-border hover:shadow-[var(--shadow-card)] transition">
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

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-20">
        <div className="rounded-3xl bg-primary text-primary-foreground p-10 md:p-14 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl">Need help choosing?</h2>
            <p className="mt-3 opacity-85 max-w-md">If you're not sure what kind of support is best, start with a consultation and we'll help match you with the right fit.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-medium hover:opacity-90">
              Get Started <ArrowRight size={16} />
            </Link>
            <Link to="/team" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium hover:bg-primary-foreground/10">
              Meet the Team
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

const QUICK = [
  { title: "Adult Therapy", img: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?auto=format&fit=crop&w=800&q=80" },
  { title: "Child Therapy", img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80" },
  { title: "Teen Counseling", img: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?auto=format&fit=crop&w=800&q=80" },
  { title: "Couples Counseling", img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80" },
];
