import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Mail, Phone, MapPin, AlertCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Book a Session — Happy 2 Help Counseling" },
      {
        name: "description",
        content:
          "Send a secure booking request, call (404) 692-3539, or email Luis@happy2helpcounseling.org.",
      },
    ],
  }),
});

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 md:pt-20 pb-10">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Contact</div>
        <h1 className="font-display text-5xl md:text-6xl text-primary max-w-3xl leading-[1.05]">
          Book an appointment.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
          Send a request below and we'll follow up as soon as possible. You can also call or email
          us directly.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-10 grid md:grid-cols-[1.4fr_1fr] gap-10">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const data = new FormData(form);
            const payload = {
              name: String(data.get("name") || ""),
              email: String(data.get("email") || ""),
              times: String(data.get("times") || ""),
              message: String(data.get("message") || ""),
            };
            setStatus("sending");
            setErrorMsg("");
            try {
              const res = await fetch("/api/booking", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              });
              if (!res.ok) {
                const details = await res.json().catch(() => null);
                throw new Error(details?.error || "The booking request could not be sent.");
              }
              setStatus("sent");
              form.reset();
            } catch (err) {
              console.error("Booking send failed:", err);
              setStatus("error");
              setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
            }
          }}
          className="bg-card border border-border rounded-3xl p-8 md:p-10 space-y-5"
        >
          <h2 className="font-display text-2xl text-primary">Booking Request</h2>
          <Field name="name" label="Full name" required />
          <Field name="email" label="Your email" type="email" required />
          <Field name="times" label="Preferred days/times" />
          <Field name="message" label="Message" textarea />
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send Booking Request"}
          </button>
          {status === "sent" && (
            <p className="text-sm text-green-700">
              Thanks! Your request was sent. Luis will reach out shortly.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-destructive">
              Couldn't send: {errorMsg || "please try again"}. You can also email{" "}
              <a
                className="text-primary hover:underline"
                href="mailto:Luis@happy2helpcounseling.org"
              >
                Luis@happy2helpcounseling.org
              </a>{" "}
              or call (404) 692-3539.
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            If you don't receive a confirmation, you can email us directly or call (404) 692-3539.
          </p>
        </form>

        <aside className="space-y-6">
          <div className="bg-secondary/50 border border-border rounded-3xl p-8">
            <h3 className="font-display text-xl text-primary">Contact</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-1 text-accent" />
                <a href="tel:14046923539" className="hover:underline">
                  (404) 692-3539
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-1 text-accent" />
                <a
                  href="mailto:Luis@happy2helpcounseling.org"
                  className="hover:underline break-all"
                >
                  Luis@happy2helpcounseling.org
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-accent" />
                <span>
                  8735 Dunwoody Place #5032
                  <br />
                  Atlanta, GA 30350
                </span>
              </li>
            </ul>
            <a
              href="https://www.therapyportal.com/p/h2hcounseling/"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90"
            >
              Client Portal
            </a>
          </div>
          <div className="bg-card border border-border rounded-3xl p-6 flex gap-3">
            <AlertCircle size={18} className="text-accent shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              If you're in immediate danger or crisis, call or text{" "}
              <span className="font-medium text-foreground">988</span> (US) or your local emergency
              number.
            </p>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  textarea,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const cls =
    "mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40";
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
        {required && " *"}
      </span>
      {textarea ? (
        <textarea name={name} rows={5} required={required} className={cls} />
      ) : (
        <input name={name} type={type} required={required} className={cls} />
      )}
    </label>
  );
}
