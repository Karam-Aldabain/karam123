import React, { useLayoutEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  GraduationCap,
  Star,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ApplyFlowModal, THEME, accent, getProgramBySlug } from "./students-graduates";

const iconStrongProps = { strokeWidth: 2.4 };

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Chip({ children, tone = "neutral" }) {
  const styles =
    tone === "pink"
      ? "bg-[#C91D67]/15 text-[#E9E7DF] ring-1 ring-[#C91D67]/30"
      : tone === "slate"
      ? "bg-[#1E2A3A]/35 text-[#E9E7DF] ring-1 ring-white/10"
      : "bg-white/5 text-[#E9E7DF] ring-1 ring-white/10";

  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md", styles)}>
      <span className="h-1.5 w-1.5 rounded-full bg-white/55" />
      {children}
    </span>
  );
}

function Card({ className, children }) {
  return (
    <div
      className={cn(
        "rounded-[22px] bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-md",
        "shadow-[0_20px_80px_rgba(0,0,0,0.45)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function Stat({ icon: Icon, label, value, right }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <Icon className="h-5 w-5 text-[#E9E7DF]" {...iconStrongProps} />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold tracking-wide text-white/60">{label}</div>
            <div className="mt-1 truncate text-lg font-semibold text-[#E9E7DF]">{value}</div>
          </div>
        </div>
        {right}
      </div>
    </Card>
  );
}

function Stars({ rating = 4.8 }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const total = 5;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {Array.from({ length: total }).map((_, i) => {
          const filled = i < full || (i === full && hasHalf);
          return (
            <Star
              key={i}
              className={cn("h-4 w-4", filled ? "text-[#E9E7DF]" : "text-white/25")}
              {...iconStrongProps}
            />
          );
        })}
      </div>
      <div className="text-sm font-semibold text-[#E9E7DF]">{rating.toFixed(1)}</div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-4">
      {eyebrow ? (
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/70 ring-1 ring-white/10">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C91D67]" />
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-xl font-semibold text-[#E9E7DF]">{title}</h2>
      {subtitle ? <p className="mt-2 text-sm leading-relaxed text-white/70">{subtitle}</p> : null}
    </div>
  );
}

export default function StudentsGraduatesEngineeringTemplate({
  programSlug,
  tags = [],
  heroGlow = "rgba(34,211,238,0.22)",
  snapshot,
  curriculum,
  buildList,
  runDetails,
  runBadges,
  faqs,
  ctaTitle,
  ctaText,
}) {
  const [applyOpen, setApplyOpen] = useState(false);
  const program = useMemo(() => getProgramBySlug(programSlug), [programSlug]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!program) {
    return <div className="min-h-screen bg-[#0B1220]" />;
  }

  return (
    <div className="min-h-screen text-white" style={{ background: "linear-gradient(180deg, #050B1F 0%, #071A3E 55%, #0B1220 100%)" }}>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -top-56 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: `radial-gradient(closest-side, ${heroGlow}, rgba(30,42,58,0.18), rgba(11,18,32,0))` }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[420px]"
          style={{ background: "linear-gradient(180deg, rgba(11,18,32,0) 0%, rgba(11,18,32,1) 65%)" }}
        />
      </div>

      <div className="px-5 py-10">
        <div className="mx-auto max-w-6xl">
          <Link to="/students-graduates" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
            Back to Students & Graduates
          </Link>

          <div className="mt-6 overflow-hidden rounded-[28px] ring-1 ring-white/10">
            <div className="relative">
              <div
                className="h-[260px] w-full"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(30,42,58,0.85) 0%, rgba(11,18,32,0.92) 45%, rgba(201,29,103,0.22) 100%), radial-gradient(1200px 300px at 20% 20%, rgba(233,231,223,0.10), rgba(0,0,0,0)), radial-gradient(900px 240px at 80% 40%, rgba(34,211,238,0.18), rgba(0,0,0,0))",
                }}
              />
              <div className="absolute inset-0">
                <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(233,231,223,0.08),transparent_40%),radial-gradient(circle_at_85%_50%,rgba(30,42,58,0.35),transparent_45%)]" />
              </div>

              <div className="absolute inset-0 flex items-end">
                <div className="w-full p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        {tags.map((tag, idx) => (
                          <Chip key={tag} tone={idx === 0 ? "slate" : "neutral"}>
                            {tag}
                          </Chip>
                        ))}
                      </div>

                      <h1 className="text-2xl font-semibold text-[#E9E7DF] sm:text-4xl">{program.name}</h1>
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">{program.description}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setApplyOpen(true)}
                      className={cn(
                        "group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white",
                        "ring-1 ring-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.45)]",
                        "transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                      )}
                      style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 100%)` }}
                    >
                      <Briefcase className="h-4 w-4" {...iconStrongProps} />
                      Apply Now
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" {...iconStrongProps} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] p-6 sm:p-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Stat icon={CalendarDays} label="Duration" value={snapshot.duration} right={<div className="hidden text-xs font-semibold text-white/55 sm:block">Cohort-based</div>} />
                <Stat icon={GraduationCap} label="Intakes" value={snapshot.intakes} right={<div className="hidden text-xs font-semibold text-white/55 sm:block">Limited seats</div>} />
                <Stat icon={Star} label="Industry Mentor Rating" value=" " right={<Stars rating={snapshot.rating} />} />
              </div>

              <div className="mt-4">
                <Card className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-xs font-semibold tracking-wide text-white/60">DELIVERABLE</div>
                      <div className="mt-2 text-lg font-semibold text-[#E9E7DF]">{snapshot.deliverable}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Chip tone="pink">{snapshot.deliverableBadges[0]}</Chip>
                        <Chip tone="slate">{snapshot.deliverableBadges[1]}</Chip>
                        <Chip tone="neutral">{snapshot.deliverableBadges[2]}</Chip>
                      </div>
                    </div>
                    <div className="grid place-items-center rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                      <ShieldCheck className="h-6 w-6 text-[#E9E7DF]" {...iconStrongProps} />
                      <div className="mt-2 text-center text-xs font-semibold text-white/70">{snapshot.deliverableLabel}</div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <Card className="p-6">
                  <div className="text-xs font-semibold tracking-wide text-white/60">INCLUDES</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {snapshot.includes.map((t) => (
                      <span key={t} className="inline-flex items-center gap-2 rounded-full bg-[#C91D67]/15 px-4 py-2 text-sm font-semibold text-[#E9E7DF] ring-1 ring-[#C91D67]/30">
                        <CheckCircle2 className="h-4 w-4" {...iconStrongProps} />
                        {t}
                      </span>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="text-xs font-semibold tracking-wide text-white/60">CAREER PATHS</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {snapshot.careerPaths.map((t) => (
                      <span key={t} className="inline-flex items-center rounded-full bg-[#1E2A3A]/35 px-4 py-2 text-sm font-semibold text-[#E9E7DF] ring-1 ring-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SectionTitle eyebrow="What you will learn" title="Curriculum highlights" subtitle={snapshot.curriculumSubtitle} />

              <div className="grid gap-4 sm:grid-cols-2">
                {curriculum.map(({ title, points, icon: Icon }) => (
                  <Card key={title} className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                        <Icon className="h-5 w-5 text-[#E9E7DF]" {...iconStrongProps} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-base font-semibold text-[#E9E7DF]">{title}</div>
                        <ul className="mt-3 space-y-2 text-sm text-white/70">
                          {points.map((p) => (
                            <li key={p} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C91D67]" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-8">
                <SectionTitle eyebrow="What you will build" title="Portfolio outcomes" subtitle={snapshot.portfolioSubtitle} />
                <div className="grid gap-4 sm:grid-cols-3">
                  {buildList.map(({ title, desc, icon: Icon }) => (
                    <Card key={title} className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                          <Icon className="h-5 w-5 text-[#E9E7DF]" {...iconStrongProps} />
                        </div>
                        <div>
                          <div className="text-base font-semibold text-[#E9E7DF]">{title}</div>
                          <p className="mt-2 text-sm leading-relaxed text-white/70">{desc}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <SectionTitle eyebrow="Details" title="How the program runs" subtitle={snapshot.runSubtitle} />

              <Card className="p-6">
                <div className="space-y-4">
                  {runDetails.map((x) => (
                    <div key={x.title} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                      <div className="text-sm font-semibold text-[#E9E7DF]">{x.title}</div>
                      <div className="mt-1 text-sm leading-relaxed text-white/70">{x.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {runBadges.map((badge, idx) => (
                    <Chip key={badge} tone={idx === 0 ? "pink" : idx === 1 ? "slate" : "neutral"}>
                      {badge}
                    </Chip>
                  ))}
                </div>
              </Card>

              <div className="mt-8">
                <SectionTitle eyebrow="FAQ" title="Common questions" />
                <div className="space-y-4">
                  {faqs.map(({ q, a }) => (
                    <Card key={q} className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                          <HelpCircle className="h-5 w-5 text-[#E9E7DF]" {...iconStrongProps} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#E9E7DF]">{q}</div>
                          <p className="mt-2 text-sm leading-relaxed text-white/70">{a}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Card className="p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xl font-semibold text-[#E9E7DF]">{ctaTitle}</div>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">{ctaText}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setApplyOpen(true)}
                  className={cn(
                    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white",
                    "ring-1 ring-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.45)]",
                    "transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                  )}
                  style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 100%)` }}
                >
                  <Briefcase className="h-4 w-4" {...iconStrongProps} />
                  Apply Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" {...iconStrongProps} />
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <ApplyFlowModal open={applyOpen} program={program} onClose={() => setApplyOpen(false)} />
    </div>
  );
}
