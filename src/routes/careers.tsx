import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, ClipboardCheck, GraduationCap, HeartHandshake, Languages, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/careers")({
  component: CareersPage,
  head: () => ({
    meta: [
      { title: "Careers — Join Our Team | Happy 2 Help Counseling" },
      { name: "description", content: "We're hiring licensed therapists in Atlanta, GA. Join a team that values cultural responsiveness, collaboration, and evidence-based care." },
      { property: "og:title", content: "Careers — Join Our Team | Happy 2 Help Counseling" },
      { property: "og:description", content: "We're hiring licensed therapists in Atlanta, GA. Join a team that values cultural responsiveness, collaboration, and evidence-based care." },
    ],
  }),
});

function CareersPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 md:pt-20 pb-10">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Careers</div>
        <h1 className="font-display text-5xl md:text-6xl text-primary max-w-3xl leading-[1.05]">
          Grow with us.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
          Happy 2 Help Counseling is always looking for compassionate, skilled clinicians who share our commitment to accessible, culturally responsive care.
        </p>
      </section>

      {/* WHY JOIN */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Why join our team</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: HeartHandshake, title: "Supportive Culture", text: "Collaborative environment with mentorship, peer consultation, and genuine work-life balance." },
              { icon: Languages, title: "Bilingual Welcome", text: "We celebrate linguistic diversity and actively seek clinicians fluent in Spanish and other languages." },
              { icon: ShieldCheck, title: "Full Autonomy", text: "Manage your own caseload and schedule while benefiting from shared administrative support." },
              { icon: GraduationCap, title: "Continuing Growth", text: "Access training, supervision (when required), and professional development opportunities." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-card rounded-2xl p-6 border border-border">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary mb-3">
                  <Icon size={18} />
                </div>
                <h3 className="font-display text-xl text-primary">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN ROLE */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Open Position</div>
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-primary">Licensed Therapist / Counselor</h2>
              <p className="mt-3 text-muted-foreground">Atlanta, GA · In-person & Virtual · Part-time / Full-time</p>
            </div>

            <div className="space-y-5">
              <div>
                <h3 className="font-display text-xl text-primary flex items-center gap-2">
                  <ClipboardCheck size={18} className="text-accent" />
                  What you'll do
                </h3>
                <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Provide individual, couples, family, and/or group therapy to diverse client populations.</li>
                  <li>Complete intake assessments, treatment plans, and progress notes in a timely manner.</li>
                  <li>Maintain ethical and legal standards in accordance with GA licensing boards.</li>
                  <li>Collaborate with the clinical director and team for case consultation as needed.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-display text-xl text-primary flex items-center gap-2">
                  <GraduationCap size={18} className="text-accent" />
                  Qualifications we need
                </h3>
                <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Active Georgia license as an LCSW, LPC, LMFT, or Psychologist (or license-eligible with supervision plan).</li>
                  <li>Experience providing therapy to adults, adolescents, children, couples, or families.</li>
                  <li>Strong documentation skills and comfort with electronic health records.</li>
                  <li>Cultural responsiveness and a genuine commitment to serving diverse communities.</li>
                  <li>Bilingual (English/Spanish) is a strong plus, not required.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-display text-xl text-primary flex items-center gap-2">
                  <HeartHandshake size={18} className="text-accent" />
                  What we offer
                </h3>
                <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Competitive fee-split or salaried options depending on role and experience.</li>
                  <li>Flexible scheduling and hybrid in-person/virtual options.</li>
                  <li>Administrative support for billing, scheduling, and credentialing.</li>
                  <li>Peer consultation and clinical supervision resources.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-10 sticky top-24">
            <h3 className="font-display text-2xl">Ready to apply?</h3>
            <p className="mt-3 opacity-85 text-sm leading-relaxed">
              Send your resume, cover letter, and a copy of your current Georgia license (or proof of eligibility) to:
            </p>
            <a href="mailto:Luis@happy2helpcounseling.org" className="mt-4 inline-block text-accent underline underline-offset-4 hover:opacity-90">
              Luis@happy2helpcounseling.org
            </a>
            <p className="mt-6 text-sm opacity-75">
              We review applications on a rolling basis and typically respond within 5 business days.
            </p>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
              >
                Contact Us <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
