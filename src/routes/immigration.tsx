import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/immigration")({
  component: ImmigrationPage,
  head: () => ({
    meta: [
      { title: "Immigration Psychological Evaluations — Happy 2 Help Counseling" },
      { name: "description", content: "Culturally sensitive immigration psychological evaluations for I-601/I-601A, asylum, U Visa, VAWA and cancellation of removal cases." },
    ],
  }),
});

const CASES = [
  "Extreme Hardship Waivers (I-601 and I-601A)",
  "Asylum Applications",
  "U Visas for Victims of Crime",
  "VAWA (Violence Against Women Act) Petitions",
  "Cancellation of Removal Proceedings",
];

const STEPS = [
  ["Initial Consultation", "We'll discuss your situation and what your immigration case requires."],
  ["Comprehensive Evaluation", "We'll explore psychological history, current emotional functioning, and relevant experiences."],
  ["Detailed Report", "A professionally written report tailored to USCIS and immigration court standards."],
  ["Attorney Collaboration", "We coordinate with your legal team to support the goals of your case."],
];

function ImmigrationPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 md:pt-20 pb-10 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Immigration Evaluations</div>
          <h1 className="font-display text-5xl md:text-6xl text-primary leading-[1.05]">Compassionate evaluations that tell your story.</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Navigating the immigration process can be one of the most challenging experiences in life. We provide professional, culturally sensitive immigration psychological evaluations to support your case and strengthen your application.
          </p>
        </div>
        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-[var(--shadow-soft)]">
          <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80" alt="Document review and consultation" className="w-full h-full object-cover" loading="lazy" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-3xl text-primary">Comprehensive Evaluations for:</h2>
          <ul className="mt-6 space-y-3">
            {CASES.map((c) => (
              <li key={c} className="flex items-start gap-3 text-foreground/85">
                <CheckCircle2 size={18} className="text-accent mt-1 shrink-0" /> {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-4">
          {[
            ["Expertise You Can Trust", "Clinical Director Luis Ruiz is a licensed Clinical Social Worker with years of experience conducting psychological evaluations for immigration cases. As an immigrant and U.S. Army veteran, he brings unique understanding and deep empathy to every evaluation."],
            ["Culturally Sensitive, Trauma-Informed", "Every person's experience is unique. Our approach is culturally sensitive and trauma-informed, designed to create a safe, supportive environment where you can share your story."],
            ["Confidential & Professional", "Your privacy is our priority. All evaluations are handled with professionalism and confidentiality, following the highest ethical standards."],
          ].map(([t, d]) => (
            <div key={t} className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-display text-lg text-primary">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 border-y border-border">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">What to Expect</div>
          <h2 className="font-display text-3xl text-primary mb-10">A clear process, every step of the way</h2>
          <ol className="grid md:grid-cols-4 gap-5">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="bg-card border border-border rounded-2xl p-6">
                <div className="text-accent font-display text-3xl">0{i + 1}</div>
                <div className="mt-2 font-display text-lg text-primary">{t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
        <div className="rounded-3xl bg-primary text-primary-foreground p-10 md:p-14 grid md:grid-cols-[1.5fr_1fr] gap-8 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl">Why These Evaluations Matter</h2>
            <p className="mt-3 opacity-85 max-w-xl">Reports can help explain how immigration-related stress, family separation, fear of return, or trauma impacts mental health — providing courts and USCIS officials a clearer understanding of the human side of a case.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-medium hover:opacity-90">Schedule an Evaluation <ArrowRight size={16} /></Link>
            <a href="https://www.therapyportal.com/p/h2hcounseling/" target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium hover:bg-primary-foreground/10">Client Portal</a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}