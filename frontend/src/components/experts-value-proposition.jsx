import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Calculator,
  CheckCircle2,
  FileCheck2,
  Globe2,
  Landmark,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";

const THEME = {
  deep: "#0B1220",
  slate: "#1E2A3A",
  sand: "#E9E7DF",
  accent: "#22D3EE",
  accent2: "#A78BFA",
  accent3: "#34D399",
  accent4: "#F59E0B",
  pink: "#C91D67",
};

const WHY_ITEMS = [
  { label: "Monetization infrastructure", icon: Wallet },
  { label: "Access to global learners", icon: Globe2 },
  { label: "Corporate client exposure", icon: Building2 },
  { label: "Institutional licensing opportunities", icon: Landmark },
  { label: "Certification issuance support", icon: FileCheck2 },
  { label: "Legal and payment handling", icon: ShieldCheck },
  { label: "AI-powered curriculum tools", icon: Sparkles },
  { label: "Strategic marketing visibility", icon: BadgeCheck },
];

const PROGRAM_TYPES = [
  { type: "Self-paced", potential: "Scalable volume and evergreen revenue." },
  { type: "Live cohort", potential: "Premium pricing with high engagement outcomes." },
  { type: "Hybrid", potential: "Balanced operational model with strong retention." },
  { type: "Corporate training", potential: "Higher ticket B2B contracts and repeat deals." },
  { type: "Executive education", potential: "Premium positioning with leadership-focused pricing." },
  { type: "Workshops", potential: "Fast launch model for lead generation and upselling." },
  { type: "Bootcamps", potential: "Intensive format with strong perceived value." },
  { type: "Certification tracks", potential: "Credential-led demand and long-term program lifecycle." },
];

const SOCIAL_PROOF = [
  "Experts delivering to cross-border learners and institutions.",
  "Programs used by corporate teams for practical upskilling.",
  "Structured certification workflows designed for employer trust.",
];

const FAQ = [
  {
    q: "Who owns my intellectual property?",
    a: "You retain ownership of your original content. Platform rights are limited to delivery and agreed distribution scope.",
  },
  {
    q: "When do payouts happen?",
    a: "Payouts follow the configured schedule with transparent gross, fee, tax, and net breakdown in your dashboard.",
  },
  {
    q: "Can I define different pricing for corporate and public cohorts?",
    a: "Yes. Registration includes separate corporate/public pricing controls and additional pricing logic options.",
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Card({ className, children, tone = "dark" }) {
  return (
    <div
      className={cn(
        "rounded-[26px] p-5 backdrop-blur-md",
        tone === "dark"
          ? "bg-white/5 ring-1 ring-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.40)]"
          : "bg-white/65 ring-1 ring-[#0B1220]/10 shadow-[0_16px_48px_rgba(0,0,0,0.14)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/75 ring-1 ring-white/10">
      <span className="h-1.5 w-1.5 rounded-full bg-[#C91D67]" />
      {children}
    </span>
  );
}

function IconTile({ icon: Icon, color, tone = "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-2xl ring-1",
        tone === "dark" ? "bg-white/5 ring-white/10" : "bg-white/75 ring-[#0B1220]/10"
      )}
    >
      <Icon className="h-5 w-5" style={{ color }} />
    </span>
  );
}

export default function ExpertsValuePropositionPage() {
  const [programPrice, setProgramPrice] = useState(1000);
  const [learners, setLearners] = useState(30);
  const [commission, setCommission] = useState(15);

  const numbers = useMemo(() => {
    const gross = Math.max(0, Number(programPrice || 0)) * Math.max(0, Number(learners || 0));
    const fee = gross * (Math.max(0, Number(commission || 0)) / 100);
    const net = gross - fee;
    return { gross, fee, net };
  }, [programPrice, learners, commission]);

  const iconPalette = [THEME.accent, THEME.accent2, THEME.accent3, THEME.accent4, THEME.slate, THEME.pink];

  return (
    <div className="min-h-screen" style={{ background: THEME.sand, color: THEME.deep }}>
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #050B1F 0%, #071A3E 55%, #0B1220 100%)" }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full">
          <div
            className="absolute -top-56 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(197,31,93,0.25), rgba(36,52,71,0.18), rgba(20,29,38,0))",
            }}
          />
        </div>

        <div className="relative z-10 px-5 py-10 text-white">
          <div className="mx-auto max-w-6xl">
            <div className="mb-3 flex flex-wrap gap-2">
              <Pill>Expert Value Framework</Pill>
              <Pill>Built for delivery</Pill>
            </div>

            <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-[#E9E7DF] sm:text-5xl">
              Build, price, certify, and scale your programs through structured expert infrastructure.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
              Praktix is built for professional educators and industry specialists who need transparent monetization, institutional-grade governance, and flexible pricing control.
            </p>
            <a
              href="/experts/register"
              className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #C91D67 0%, rgba(201,29,103,0.72) 100%)" }}
            >
              Create My Expert Account
              <ArrowRight className="h-4 w-4" />
            </a>

            <div className="mt-10 pb-8">
              <Card className="p-6" tone="dark">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-[#E9E7DF]">Why Praktix for Experts</h2>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/70 ring-1 ring-white/10">
                    {WHY_ITEMS.length} pillars
                  </span>
                </div>
                <div className="space-y-3">
                  {WHY_ITEMS.slice(0, 4).map(({ label, icon: Icon }, idx) => (
                    <div key={label} className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                      <IconTile icon={Icon} color={iconPalette[idx % iconPalette.length]} tone="dark" />
                      <div>
                        <div className="font-semibold text-[#E9E7DF]">{label}</div>
                        <div className="text-sm text-white/60">Layer {idx + 1}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mt-1 grid gap-5 lg:grid-cols-2">
            <Card className="p-6" tone="light">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#0B1220]">
                <Calculator className="h-4 w-4" style={{ color: THEME.accent2 }} />
                Example earnings calculator
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <InputNumber label="Program Price" value={programPrice} onChange={setProgramPrice} tone="light" />
                <InputNumber label="Learners" value={learners} onChange={setLearners} tone="light" />
                <InputNumber label="Platform Fee %" value={commission} onChange={setCommission} tone="light" />
              </div>
              <div className="mt-5 space-y-2 text-sm">
                <Row label="Gross revenue" value={formatCurrency(numbers.gross)} tone="light" />
                <Row label="Platform fee" value={formatCurrency(numbers.fee)} tone="light" />
                <Row label="Net payout" value={formatCurrency(numbers.net)} tone="light" bold />
              </div>
            </Card>

            <Card className="p-6" tone="light">
              <h3 className="text-lg font-semibold text-[#0B1220]">Reference Scenario</h3>
              <p className="mt-3 text-sm text-[#0B1220]/70">If you sell a EUR 1,000 program to 30 learners:</p>
              <ul className="mt-3 space-y-2 text-sm text-[#0B1220]/90">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4" style={{ color: THEME.accent3 }} />
                  Gross revenue: EUR 30,000
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4" style={{ color: THEME.accent2 }} />
                  Platform fee: X% (configurable)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4" style={{ color: THEME.accent4 }} />
                  Net payout: transparent before publishing
                </li>
              </ul>
              <p className="mt-4 text-xs text-[#0B1220]/60">
                Financial policies are shown clearly in expert onboarding and dashboard breakdowns.
              </p>
            </Card>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-[#0B1220]">Program Types Experts Can Create</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {PROGRAM_TYPES.map((item, idx) => (
                <Card key={item.type} className="p-5" tone="light">
                  <div className="flex items-center gap-3">
                    <IconTile icon={Briefcase} color={iconPalette[(idx + 1) % iconPalette.length]} tone="light" />
                    <h3 className="text-base font-semibold text-[#0B1220]">{item.type}</h3>
                  </div>
                  <p className="mt-2 text-sm text-[#0B1220]/70">{item.potential}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-[#0B1220]">Trust & Governance</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                "Quality standards",
                "Expert verification",
                "Certification authority",
                "Intellectual property ownership",
                "Data protection",
              ].map((item, idx) => (
                <Card key={item} className="p-4" tone="light">
                  <div className="flex items-center gap-3 text-sm font-medium text-[#0B1220]">
                    <ShieldCheck className="h-4 w-4" style={{ color: iconPalette[idx % iconPalette.length] }} />
                    {item}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Card className="p-6" tone="light">
              <h3 className="text-lg font-semibold text-[#0B1220]">Why experts choose this model</h3>
              <ul className="mt-4 space-y-3 text-sm text-[#0B1220]/80">
                {SOCIAL_PROOF.map((item, idx) => (
                  <li key={item} className="flex items-start gap-2">
                    <BadgeCheck className="mt-0.5 h-4 w-4" style={{ color: iconPalette[idx % iconPalette.length] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6" tone="light">
              <h3 className="text-lg font-semibold text-[#0B1220]">FAQ</h3>
              <div className="mt-4 space-y-4">
                {FAQ.map((item) => (
                  <article key={item.q}>
                    <p className="text-sm font-semibold text-[#0B1220]/90">{item.q}</p>
                    <p className="mt-1 text-sm text-[#0B1220]/72">{item.a}</p>
                  </article>
                ))}
              </div>
            </Card>
          </div>

          <div className="mt-8">
            <Card className="p-6 sm:p-8" tone="light">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#0B1220] sm:text-2xl">
                    Ready to structure your expert business on Praktix?
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-[#0B1220]/70 sm:text-base">
                    Continue to registration and configure your profile, monetization model, and pricing logic.
                  </p>
                </div>
                <a
                  href="/experts/register"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg, #C91D67 0%, rgba(201,29,103,0.72) 100%)" }}
                >
                  Create My Expert Account
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

function InputNumber({ label, value, onChange, tone = "dark" }) {
  return (
    <label className={cn("text-xs", tone === "dark" ? "text-white/70" : "text-[#0B1220]/65")}>
      {label}
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          "mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none",
          tone === "dark"
            ? "border-white/15 bg-[#0B1220] text-white focus:border-white/35"
            : "border-[#0B1220]/15 bg-white/80 text-[#0B1220] focus:border-[#0B1220]/35"
        )}
      />
    </label>
  );
}

function Row({ label, value, bold = false, tone = "dark" }) {
  return (
    <div className="flex items-center justify-between">
      <span className={tone === "dark" ? "text-white/75" : "text-[#0B1220]/72"}>{label}</span>
      <span className={cn(bold ? "font-semibold" : "", tone === "dark" ? "text-white" : "text-[#0B1220]")}>
        {value}
      </span>
    </div>
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(
    Number.isFinite(value) ? value : 0
  );
}
