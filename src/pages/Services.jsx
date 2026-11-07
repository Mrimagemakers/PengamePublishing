import React, { useState } from "react";
import { Mail, Phone, CheckCircle2 } from "lucide-react";

const QUOTE_EMAIL = "Info@pengamepublishing.com";

const SERVICES = [
  {
    name: "Book publishing",
    detail: "Take your manuscript from draft to a finished print and ebook, with editing, cover design, interior layout, and Amazon KDP setup.",
  },
  {
    name: "Children’s & educational books",
    detail: "Illustrated picture books, STEM titles, coloring books, workbooks, and classroom companion guides.",
  },
  {
    name: "AR/VR & interactive books",
    detail: "Add QR codes, augmented reality scenes, and read-along narration that bring a printed book to life on a phone or headset.",
  },
  {
    name: "Games & VR experiences",
    detail: "Browser games and WebXR worlds built from your story, brand, or curriculum, playable on phones, computers, and Meta Quest.",
  },
  {
    name: "Websites & web apps",
    detail: "Author sites, landing pages, onboarding portals, and custom tools for your business.",
  },
  {
    name: "PR & marketing",
    detail: "Press releases, launch campaigns, and media outreach for books, events, and brands.",
  },
  {
    name: "Schools, libraries & partnerships",
    detail: "Bulk book orders, author visits, reading events, and licensed learning content for classrooms.",
  },
  {
    name: "Leadership training & speaking",
    detail: "Keynotes, workshops, and team programs from the PenGame Leadership Academy.",
  },
];

const BUDGETS = ["Under $500", "$500 – $2,500", "$2,500 – $10,000", "$10,000+", "Not sure yet"];
const TIMELINES = ["As soon as possible", "Within 1 month", "1–3 months", "3+ months", "Flexible"];

const EMPTY = { name: "", email: "", phone: "", organization: "", service: "", budget: "", timeline: "", details: "" };

function buildMailto(f) {
  const subject = `Quote request: ${f.service} — ${f.name}`;
  const body = [
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    `Phone: ${f.phone || "—"}`,
    `Organization: ${f.organization || "—"}`,
    `Service: ${f.service}`,
    `Budget: ${f.budget || "—"}`,
    `Timeline: ${f.timeline || "—"}`,
    "",
    "Project details:",
    f.details,
  ].join("\n");
  return `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Field({ label, id, required, children, hint }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-foreground">
        {label} {required ? <span className="text-secondary" aria-hidden="true">*</span> : <span className="font-normal text-muted-foreground">(optional)</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-input bg-card px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export default function Services() {
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const pick = (name) => {
    setForm((f) => ({ ...f, service: name }));
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submit = (e) => {
    e.preventDefault();
    window.location.href = buildMailto(form);
    setSent(true);
  };

  return (
    <>
      <section className="bg-[#0A1730] text-white">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20 md:pt-28">
          <h1 className="max-w-3xl font-heading text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
            Work with PenGame
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            We publish books, build the games and VR worlds around them, and do the same for authors, schools, and businesses. Tell us about your project and we’ll send you a personal quote.
          </p>
          <a
            href="#quote"
            className="mt-10 inline-flex h-12 items-center rounded-full bg-[#D9A53A] px-7 font-semibold text-[#0A1730] transition-colors hover:bg-[#F2D27A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2D27A]"
          >
            Request a quote
          </a>
        </div>
      </section>

      <section className="bg-background py-20" aria-labelledby="services-title">
        <div className="mx-auto max-w-7xl px-6">
          <h2 id="services-title" className="font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
            What we can do for you
          </h2>
          <ul className="mt-10 grid border-t border-border md:grid-cols-2 md:gap-x-12">
            {SERVICES.map((s) => (
              <li key={s.name} className="flex items-start justify-between gap-6 border-b border-border py-7">
                <div className="max-w-md">
                  <h3 className="font-heading text-xl font-bold text-primary">{s.name}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{s.detail}</p>
                </div>
                <button
                  type="button"
                  onClick={() => pick(s.name)}
                  className="mt-1 shrink-0 rounded-full border border-primary/25 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                >
                  Get a quote
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="quote" className="scroll-mt-24 bg-muted/60 py-20" aria-labelledby="quote-title">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 id="quote-title" className="font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
              Request a personal quote
            </h2>
            <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
              Share a few details and we’ll reply within two business days with pricing and next steps.
            </p>
            <div className="mt-8 space-y-3 text-[15px]">
              <a href={`mailto:${QUOTE_EMAIL}`} className="flex items-center gap-3 text-foreground hover:text-primary">
                <Mail className="h-5 w-5 text-secondary" aria-hidden="true" /> {QUOTE_EMAIL}
              </a>
              <a href="tel:+17705854678" className="flex items-center gap-3 text-foreground hover:text-primary">
                <Phone className="h-5 w-5 text-secondary" aria-hidden="true" /> (770) 585-4678
              </a>
            </div>
          </div>

          {sent ? (
            <div className="rounded-2xl border border-border bg-card p-8" role="status">
              <CheckCircle2 className="h-8 w-8 text-secondary" aria-hidden="true" />
              <h3 className="mt-4 font-heading text-2xl font-bold">Your email is ready to send</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Your email app opened with your quote request filled in. Press send there and we’ll reply within two business days.
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Didn’t open? Email us at{" "}
                <a href={buildMailto(form)} className="font-semibold text-primary underline underline-offset-4">{QUOTE_EMAIL}</a>.
              </p>
              <button type="button" onClick={() => { setForm(EMPTY); setSent(false); }} className="mt-6 text-sm font-semibold text-primary underline underline-offset-4">
                Start a new request
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-5 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2 md:p-8">
              <Field label="Your name" id="q-name" required>
                <input id="q-name" required autoComplete="name" value={form.name} onChange={set("name")} className={inputCls} />
              </Field>
              <Field label="Email" id="q-email" required>
                <input id="q-email" type="email" required autoComplete="email" value={form.email} onChange={set("email")} className={inputCls} />
              </Field>
              <Field label="Phone" id="q-phone">
                <input id="q-phone" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} className={inputCls} />
              </Field>
              <Field label="Organization or school" id="q-org">
                <input id="q-org" autoComplete="organization" value={form.organization} onChange={set("organization")} className={inputCls} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="What do you need?" id="q-service" required>
                  <select id="q-service" required value={form.service} onChange={set("service")} className={inputCls}>
                    <option value="" disabled>Choose a service</option>
                    {SERVICES.map((s) => <option key={s.name}>{s.name}</option>)}
                    <option>Something else</option>
                  </select>
                </Field>
              </div>
              <Field label="Budget" id="q-budget">
                <select id="q-budget" value={form.budget} onChange={set("budget")} className={inputCls}>
                  <option value="">Choose a range</option>
                  {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                </select>
              </Field>
              <Field label="Timeline" id="q-timeline">
                <select id="q-timeline" value={form.timeline} onChange={set("timeline")} className={inputCls}>
                  <option value="">Choose a timeline</option>
                  {TIMELINES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Tell us about your project" id="q-details" required hint="Goals, audience, page count or features, and any deadlines.">
                  <textarea id="q-details" required rows={6} value={form.details} onChange={set("details")} className={inputCls} />
                </Field>
              </div>
              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <button type="submit" className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">
                  <Mail className="h-5 w-5" aria-hidden="true" /> Send quote request
                </button>
                <p className="text-sm text-muted-foreground">Opens your email app with your details filled in.</p>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
