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
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] tracking-tight text-foreground">
              Compassionate counseling for every chapter of your life.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-prose">
              Happy 2 Help Counseling provides accessible, personalized mental health
              support for adults, teens, children, couples, and families.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium hover:opacity-90">
                Book a session <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium hover:bg-accent/30">
                Explore services
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-border">
              <img src={HERO} alt="Calm therapy environment" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 grid md:grid-cols-3 gap-8">
          {[
            { icon: Heart, title: "Personalized care", text: "Therapy tailored to your story, identity, and goals." },
            { icon: Shield, title: "Safe & confidential", text: "A judgment-free space where healing comes first." },
            { icon: Sparkles, title: "Lasting change", text: "Practical tools and insight that go beyond the session." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-background border border-border p-7">
              <Icon className="text-accent" />
              <h3 className="mt-4 font-display text-2xl text-foreground">{title}</h3>
              <p className="mt-2 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-24 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-foreground">Ready to take the next step?</h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Reach out today and let's find the right therapist and time for you.
        </p>
        <div className="mt-8">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 font-medium hover:opacity-90">
            Get in touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}