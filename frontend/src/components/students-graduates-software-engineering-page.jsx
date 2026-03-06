import React, { useLayoutEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Rocket,
  CalendarDays,
  Clock3,
  Globe,
  Layers,
  Trophy,
  ClipboardList,
  Code2,
  Database,
  Cloud,
  GitBranch,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  ChevronDown,
  GraduationCap,
  LayoutGrid,
  BadgeCheck,
  Building2,
  Star,
  Home,
  ChevronRight,
} from "lucide-react";
import { ApplyFlowModal, THEME, accent } from "./students-graduates";

const iconStrongProps = { strokeWidth: 2.4 };

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Card({ className, children, style }) {
  return (
    <div
      className={cn(
        "rounded-[22px] bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-md",
        "shadow-[0_20px_80px_rgba(0,0,0,0.45)]",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

function SnapshotItem({ label, value, icon, tint = "rgba(255,255,255,0.08)" }) {
  const IconComp = icon;
  return (
    <div className="flex items-start gap-3">
      <div
        className="grid h-10 w-10 place-items-center rounded-2xl ring-1 ring-white/20"
        style={{
          background: `linear-gradient(145deg, ${tint} 0%, rgba(255,255,255,0.05) 100%)`,
        }}
      >
        <IconComp className="h-5 w-5 text-[#E9E7DF]" {...iconStrongProps} />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold tracking-wide text-white/60">{label}</div>
        <div className="mt-1 text-sm font-semibold text-[#E9E7DF]">{value}</div>
      </div>
    </div>
  );
}

function Stars({ value = 5 }) {
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="inline-flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("h-4 w-4", i < full ? "opacity-100" : "opacity-40")}
          fill={i < full ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-4">
      {eyebrow ? (
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/70 ring-1 ring-white/10">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: THEME.pink }} />
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-xl font-semibold text-[#E9E7DF] sm:text-2xl">{title}</h2>
      {subtitle ? (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">{subtitle}</p>
      ) : null}
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="mt-3 space-y-2 text-sm text-white/70">
      {items.map((p) => (
        <li key={p} className="flex items-start gap-2">
          <span
            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: THEME.pink }}
          />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

function Benefit({ icon: IconComp, title, desc, bullets }) {
  return (
    <div className="rounded-[22px] bg-white/5 p-6 ring-1 ring-white/10">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
        <IconComp className="h-6 w-6 text-[#E9E7DF]" {...iconStrongProps} />
      </div>
      <div className="mt-4 text-base font-semibold text-[#E9E7DF]">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-white/70">{desc}</p>
      {bullets?.length ? <BulletList items={bullets} /> : null}
    </div>
  );
}

function TabsAccordion({ tabs, openId, onToggle }) {
  return (
    <div className="mt-6 rounded-[22px] bg-white/5 ring-1 ring-white/10 backdrop-blur-md">
      <div className="flex flex-wrap gap-2 p-3">
        {tabs.map((t) => {
          const isOpen = openId === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onToggle(t.id)}
              className={cn(
                "group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
                "ring-1 ring-white/10 transition",
                isOpen ? "text-[#E9E7DF]" : "text-white/70 hover:text-white"
              )}
              style={{
                background: isOpen
                  ? `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 100%)`
                  : "rgba(255,255,255,0.04)",
              }}
            >
              {t.label}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isOpen ? "rotate-180" : "rotate-0"
                )}
                {...iconStrongProps}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function HeroLikeScreenshot({ data }) {
  const meta = data.heroMeta;

  return (
    <section
      className="w-full"
      style={{
        background: meta.bg,
        color: meta.ink,
      }}
    >
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold opacity-90">
          <span className="inline-flex items-center gap-2">
            <Home className="h-4 w-4" />
            {meta.breadcrumb[0]}
          </span>
          {meta.breadcrumb.slice(1).map((b) => (
            <span key={b} className="inline-flex items-center gap-2">
              <ChevronRight className="h-4 w-4 opacity-70" />
              <span className="opacity-90">{b}</span>
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            {meta.category ? (
              <div className="mb-4">
                <span className="inline-flex items-center rounded-md bg-white/90 px-3 py-1 text-xs font-bold tracking-wide text-black/80">
                  {meta.category}
                </span>
              </div>
            ) : null}

            <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-6xl">
              {data.hero.title}
              <br />
              {data.hero.title2}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-black/75 sm:text-lg">
              {data.hero.subtitle}
            </p>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-black/75 sm:text-lg">
              {data.hero.subtitle2}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-semibold">
              <div className="inline-flex items-center gap-2">
                <span className="text-base font-extrabold">{meta.ratingValue}</span>
                <span className="inline-flex items-center gap-2">
                  <span style={{ color: meta.ink }}>
                    <Stars value={meta.ratingValue} />
                  </span>
                </span>
              </div>

              <div className="inline-flex items-center gap-2 opacity-95">
                <Trophy className="h-4 w-4" />
                <span>{meta.ceus}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[18px] bg-black/20 ring-1 ring-white/15">
              <div className="relative h-[260px] w-full sm:h-[320px]">
                <img
                  src={meta.heroImage}
                  alt="Software engineering team collaborating on product development"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/10" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {data.hero.tracks.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroInfoRow({ items, className = "" }) {
  return (
    <div className={cn("rounded-[14px] bg-white/90 p-6 text-black/80", className)}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {items.map((item) => (
          <div key={item.label} className="min-w-0">
            <div className="text-xs font-extrabold tracking-wide text-black/60">{item.label}</div>
            <div className="mt-2 text-sm font-extrabold text-black/90">{item.value}</div>
            {item.sub ? <div className="mt-1 text-xs font-semibold text-black/60">{item.sub}</div> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PraktixInternshipProgramPage() {
  const [applyOpen, setApplyOpen] = useState(false);
  const [openSection, setOpenSection] = useState("overview");

  useLayoutEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }

    const forceTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    forceTop();
    requestAnimationFrame(forceTop);
    const t1 = setTimeout(forceTop, 60);
    const t2 = setTimeout(forceTop, 180);
    const t3 = setTimeout(forceTop, 360);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const DARK_BG = "linear-gradient(180deg, #050B1F 0%, #071A3E 55%, #0B1220 100%)";

  const data = useMemo(
    () => ({
      brandTitle: "Praktix Professional Internship Program",
      hero: {
        title: "Software Engineering Internship",
        title2: "Build Real Software Systems",
        subtitle:
          "Develop production-level software through a structured internship designed to simulate real engineering environments used in modern technology companies.",
        subtitle2:
          "Participants work on a complete software project from concept to deployment while applying professional engineering practices used in global tech teams.",
        tracks: ["Frontend Engineering", "Backend Engineering", "Full Stack Development"],
      },

      heroMeta: {
        bg: "#F3E6D3",
        ink: "#1F2937",
        breadcrumb: ["Home", "For Individuals", "Software Engineering"],
        category: "Professional Internship",
        ratingValue: 5,
        ceus: "Career-Focused Program",
        heroImage: "/what-is-software-engineering.jpg",
        infoRow: [
          { label: "Next Cohort", value: "Rolling Enrollment", sub: "New cohorts every 3 months" },
          { label: "Format", value: "Online — Expert Led" },
          { label: "Duration", value: "12–15 Weeks" },
          { label: "Commitment", value: "6–10 Hours / Week" },
          { label: "Project Type", value: "Industry Simulation Project" },
          { label: "Tuition", value: "$1650" },
        ],
      },

      snapshot: [
        {
          label: "Next Cohort",
          value: "Rolling Enrollment — New Cohorts Every 3 Months",
          icon: CalendarDays,
        },
        { label: "Format", value: "Online — Expert Led", icon: Globe },
        { label: "Duration", value: "12–15 Weeks", icon: Clock3 },
        { label: "Commitment", value: "6–10 Hours Per Week", icon: ClipboardList },
        { label: "Project Type", value: "Industry Simulation Project", icon: Layers },
        { label: "Tuition", value: "$1650", icon: Trophy },
      ],

      overview: [
        "Modern software engineering requires far more than writing code. Engineers must understand how systems are designed, built, tested, and deployed in real production environments.",
        "The Praktix Software Engineering Internship provides a structured environment where participants develop a complete software system while learning how modern engineering teams operate.",
        "Throughout the program, participants apply professional development practices including system architecture design, version control workflows, modular development, debugging processes, and technical documentation.",
        "Guided by experienced industry professionals from international technology companies, participants gain practical experience building scalable digital systems while developing the mindset and workflow of professional engineers.",
        "This internship is designed to bridge the gap between academic learning and real-world engineering practice.",
      ],

      build: {
        intro:
          "The internship revolves around developing a complete software system as the central project.",
        lifecycle:
          "Participants work through the full product lifecycle — from defining the technical scope to deploying a working application.",
        types: [
          "Web platforms and applications",
          "SaaS products and internal tools",
          "Data-driven web applications",
          "API-based systems and backend services",
          "Developer productivity tools",
          "Scalable backend architectures",
        ],
        tracks: [
          "Frontend Engineering — building responsive user interfaces and interactive web experiences.",
          "Backend Engineering — designing APIs, databases, and scalable server-side systems.",
          "Full Stack Development — developing complete applications that integrate frontend and backend technologies.",
        ],
        emphasis:
          "The goal is to build software that reflects real engineering standards used in modern product teams.",
      },

      benefits: [
        {
          icon: Rocket,
          title: "Real Software Development Experience",
          desc:
            "Work on a structured engineering project that simulates the workflow of professional software teams and modern product development environments.",
        },
        {
          icon: GitBranch,
          title: "Professional Engineering Portfolio",
          desc: "Each participant graduates with a portfolio that may include:",
          bullets: [
            "GitHub project repository",
            "Technical system documentation",
            "Architecture explanations",
            "Deployment links and working application",
          ],
        },
        {
          icon: Sparkles,
          title: "AI-Assisted Code Evaluation",
          desc:
            "Participants receive structured feedback on code quality, maintainability, and engineering practices through AI-assisted evaluation tools and expert review.",
        },
        {
          icon: ShieldCheck,
          title: "Open Source Contribution Experience",
          desc:
            "Participants learn how to collaborate in open-source environments, understand repository workflows, and contribute to real projects when applicable.",
        },
        {
          icon: GraduationCap,
          title: "Technical Interview Preparation",
          desc:
            "The program includes technical interview preparation sessions where participants practice explaining their projects, discussing architecture decisions, and approaching engineering problem-solving scenarios.",
        },
      ],

      howItWorks: [
        {
          phase: "Phase 1",
          title: "Problem Definition & Product Concept",
          bullets: [
            "Define the product idea",
            "Identify the user problem",
            "Determine the technical scope of the project",
          ],
          icon: HelpCircle,
        },
        {
          phase: "Phase 2",
          title: "System Architecture",
          bullets: [
            "Design system architecture",
            "Plan database structure",
            "Define APIs and select the technology stack",
          ],
          icon: Layers,
        },
        {
          phase: "Phase 3",
          title: "Core Development",
          bullets: [
            "Build frontend interfaces",
            "Develop backend services",
            "Implement authentication mechanisms",
            "Integrate databases and core workflows",
          ],
          icon: Code2,
        },
        {
          phase: "Phase 4",
          title: "Integration & Testing",
          bullets: [
            "Test the full system",
            "Debug issues",
            "Optimize performance",
            "Ensure all system components work correctly together",
          ],
          icon: Database,
        },
        {
          phase: "Phase 5",
          title: "Deployment & Project Presentation",
          bullets: [
            "Deploy the application",
            "Document technical decisions",
            "Present the architecture and development process",
            "Explain engineering challenges encountered during the project",
          ],
          icon: Cloud,
        },
      ],

      outcomes: [
        "Experience building production-level software systems from concept to deployment.",
        "A professional engineering portfolio that demonstrates real development work.",
        "A GitHub repository showcasing the completed project and development process.",
        "Understanding of software architecture, system design, and engineering workflows.",
        "Experience working with collaborative development practices used in modern technology teams.",
        "Exposure to open-source contribution environments and engineering communities.",
        "Preparation for software engineering interviews including technical discussions and project walkthroughs.",
        "Structured performance evaluation based on real project work and engineering practices.",
      ],

      whoShouldApply: [
        "University Students — students in computer science or related fields who want to gain real development experience before entering the job market.",
        "Recent Graduates — graduates seeking practical engineering experience and a portfolio that strengthens their employability.",
        "Career Switchers — individuals transitioning into software engineering who want to build real systems and demonstrate practical capability to employers.",
      ],

      careerValue: {
        title: "Outcomes & Career Value",
        paragraphs: [
          "By the end of the internship, participants graduate with both practical experience and tangible career assets.",
          "Throughout the internship, participants receive mentorship and structured feedback to improve both technical execution and engineering thinking.",
          "New cohorts begin every three months, and applicants are enrolled in the next available program.",
        ],
      },

      finalCta: {
        title: "Start Building Real Software Systems",
        subtitle: "Applications for the next cohort are currently open.",
        text:
          "Build a production-level software system, receive structured technical feedback, and graduate with a portfolio that demonstrates real engineering capability.",
      },
    }),
    []
  );

  const tabs = useMemo(
    () => [
      { id: "overview", label: "Overview" },
      { id: "build", label: "What You Will Build" },
      { id: "benefits", label: "Key Benefits" },
      { id: "how", label: "How the Internship Works" },
      { id: "outcomes", label: "Outcomes & Career Value" },
    ],
    []
  );

  const toggleSection = (id) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const snapshotTints = [
    "rgba(34,211,238,0.22)",
    "rgba(167,139,250,0.20)",
    "rgba(245,158,11,0.18)",
    "rgba(52,211,153,0.18)",
  ];

  const overviewCardTints = [
    "linear-gradient(145deg, rgba(34,211,238,0.13) 0%, rgba(255,255,255,0.05) 100%)",
    "linear-gradient(145deg, rgba(167,139,250,0.12) 0%, rgba(255,255,255,0.05) 100%)",
    "linear-gradient(145deg, rgba(245,158,11,0.12) 0%, rgba(255,255,255,0.05) 100%)",
    "linear-gradient(145deg, rgba(52,211,153,0.12) 0%, rgba(255,255,255,0.05) 100%)",
    "linear-gradient(145deg, rgba(201,29,103,0.12) 0%, rgba(255,255,255,0.05) 100%)",
  ];

  return (
    <div className="min-h-screen text-white" style={{ background: DARK_BG }}>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -top-56 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(197,31,93,0.22), rgba(36,52,71,0.18), rgba(20,29,38,0))",
          }}
        />
      </div>

      <HeroLikeScreenshot data={data} />

      <section className="mx-auto max-w-6xl px-5 py-10">
        <HeroInfoRow items={data.heroMeta.infoRow} className="mb-8" />
        <TabsAccordion tabs={tabs} openId={openSection} onToggle={toggleSection} />

        <div className="mt-8">
          {openSection === "overview" && (
            <div className="space-y-4">
              <SectionTitle
                eyebrow="Overview"
                title="Build engineering thinking, not just coding skills"
                subtitle="A structured environment for learning how real software systems are designed, built, tested, and deployed."
              />
              <div className="grid gap-4 lg:grid-cols-12">
                <Card
                  className="lg:col-span-4"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(34,211,238,0.08) 0%, rgba(255,255,255,0.04) 100%)",
                  }}
                >
                  <div className="text-xs font-semibold tracking-wide text-white/60">
                    PROGRAM SNAPSHOT
                  </div>
                  <div className="mt-4 space-y-3">
                    {data.snapshot.map((item, i) => (
                      <SnapshotItem
                        key={item.label}
                        label={item.label}
                        value={item.value}
                        icon={item.icon}
                        tint={snapshotTints[i % snapshotTints.length]}
                      />
                    ))}
                  </div>
                </Card>

                <Card className="lg:col-span-8">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {data.overview.map((p, i) => (
                      <div
                        key={i}
                        className="rounded-[16px] p-4 ring-1 ring-white/15"
                        style={{ background: overviewCardTints[i % overviewCardTints.length] }}
                      >
                        <div className="text-xs font-semibold tracking-wide text-white/55">
                          POINT {i + 1}
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-white/75">{p}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {openSection === "build" && (
            <div className="space-y-4">
              <SectionTitle
                eyebrow="What You Will Build"
                title="A complete software system from concept to deployment"
                subtitle="Participants work through the full product lifecycle while specializing in one of three engineering tracks."
              />
              <div className="grid gap-4 lg:grid-cols-12">
                <Card className="lg:col-span-7">
                  <div className="text-sm leading-relaxed text-white/70">{data.build.intro}</div>
                  <div className="mt-4 text-sm leading-relaxed text-white/70">
                    {data.build.lifecycle}
                  </div>

                  <div className="mt-5 text-xs font-semibold tracking-wide text-white/60">
                    PROJECTS MAY INCLUDE
                  </div>
                  <BulletList items={data.build.types} />

                  <div className="mt-5 text-sm leading-relaxed text-white/70">
                    {data.build.emphasis}
                  </div>
                </Card>

                <Card className="lg:col-span-5">
                  <div className="text-xs font-semibold tracking-wide text-white/60">
                    SPECIALIZATION TRACKS
                  </div>
                  <BulletList items={data.build.tracks} />

                  <div className="mt-6 rounded-[18px] bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="text-xs font-semibold tracking-wide text-white/60">
                      SUGGESTED STACK VISUAL
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["React", "Node.js", "Python", "PostgreSQL", "Docker", "Git"].map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-[#E9E7DF] ring-1 ring-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {openSection === "benefits" && (
            <div className="space-y-4">
              <SectionTitle
                eyebrow="Key Benefits"
                title="Career advantages beyond traditional training"
                subtitle="Practical outcomes designed to strengthen employability and demonstrate real engineering capability."
              />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {data.benefits.map((b) => (
                  <Benefit key={b.title} {...b} />
                ))}
              </div>
            </div>
          )}

          {openSection === "how" && (
            <div className="space-y-4">
              <SectionTitle
                eyebrow="How the Internship Works"
                title="A workflow modeled on professional software teams"
                subtitle="Participants progress through five structured development phases while building their software system."
              />

              <div className="space-y-4">
                {data.howItWorks.map((p) => (
                  <Card key={p.phase} className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                        <p.icon className="h-5 w-5 text-[#E9E7DF]" {...iconStrongProps} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold tracking-wide text-white/60">
                          {p.phase}
                        </div>
                        <div className="mt-1 text-base font-semibold text-[#E9E7DF]">
                          {p.title}
                        </div>
                        <BulletList items={p.bullets} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {openSection === "outcomes" && (
            <div className="space-y-4">
              <SectionTitle
                eyebrow="Outcomes & Career Value"
                title="Graduate with practical experience and tangible career assets"
                subtitle="The internship is designed to produce visible outputs that employers can evaluate directly."
              />

              <div className="grid gap-4 lg:grid-cols-12">
                <Card className="lg:col-span-7">
                  <div className="text-xs font-semibold tracking-wide text-white/60">
                    PARTICIPANTS GAIN
                  </div>
                  <BulletList items={data.outcomes} />
                </Card>

                <Card className="lg:col-span-5">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white/60">
                    <BadgeCheck className="h-4 w-4" {...iconStrongProps} />
                    WHO THIS INTERNSHIP IS FOR
                  </div>
                  <BulletList items={data.whoShouldApply} />

                  <div className="mt-6 space-y-3 text-sm leading-relaxed text-white/70">
                    {data.careerValue.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          <div className="mt-10">
            <SectionTitle
              eyebrow="Call to action"
              title={data.finalCta.title}
              subtitle={data.finalCta.subtitle}
            />
            <Card className="relative overflow-hidden p-6 sm:p-8">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-2xl"
                style={{ background: "rgba(197,31,93,0.22)" }}
              />
              <div className="relative z-10 flex flex-col gap-6">
                <div className="grid gap-2 sm:grid-cols-3">
                  {["Live mentorship", "Portfolio-ready project", "Interview prep"].map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-white/85 ring-1 ring-white/10"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="text-sm leading-relaxed text-white/75 sm:max-w-3xl">
                  {data.finalCta.text}
                </div>

                <button
                  type="button"
                  onClick={() => setApplyOpen(true)}
                  className={cn(
                    "group inline-flex w-fit items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white",
                    "ring-1 ring-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.45)]",
                    "transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                  )}
                  style={{
                    background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 100%)`,
                  }}
                >
                  <Briefcase className="h-4 w-4" {...iconStrongProps} />
                  Apply Now
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    {...iconStrongProps}
                  />
                </button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <ApplyFlowModal open={applyOpen} program={null} onClose={() => setApplyOpen(false)} />
    </div>
  );
}