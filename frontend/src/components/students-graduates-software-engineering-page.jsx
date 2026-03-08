import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
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
        "rounded-[24px] p-5 ring-1 backdrop-blur-xl transition duration-300 hover:-translate-y-1",
        "ring-white/10 shadow-[0_22px_70px_rgba(4,12,32,0.36)]",
        className
      )}
      style={{
        background:
          "linear-gradient(180deg, rgba(15,29,61,0.96) 0%, rgba(9,21,46,0.94) 100%)",
        ...style,
      }}
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
        className="grid h-10 w-10 place-items-center rounded-2xl ring-1 ring-white/15"
        style={{
          background: `linear-gradient(145deg, ${tint} 0%, rgba(255,255,255,0.05) 100%)`,
        }}
      >
        <IconComp className="h-5 w-5 text-[#FFD2E3]" {...iconStrongProps} />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold tracking-wide text-white/60">{label}</div>
        <div className="mt-1 text-sm font-semibold text-white">{value}</div>
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
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#C91D67]/15 px-3 py-1 text-xs font-semibold text-[#FFD2E3] ring-1 ring-[#C91D67]/25">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: THEME.pink }} />
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-xl font-semibold text-[#F8FAFC] sm:text-2xl">{title}</h2>
      {subtitle ? (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">{subtitle}</p>
      ) : null}
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="mt-3 space-y-2 text-sm text-white/80">
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

function Benefit({ icon, title, desc, bullets }) {
  const IconComp = icon;
  return (
    <div className="flex h-full flex-col rounded-[24px] bg-[linear-gradient(180deg,rgba(15,29,61,0.98),rgba(10,20,42,0.96))] p-7 ring-1 ring-white/10 shadow-[0_24px_55px_rgba(5,10,25,0.34)] transition duration-300 hover:-translate-y-1.5 hover:ring-[#C91D67]/30">
      <div className="flex items-start gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-[20px] bg-[linear-gradient(145deg,rgba(201,29,103,0.20),rgba(255,255,255,0.04))] ring-1 ring-white/10 shadow-[0_10px_24px_rgba(201,29,103,0.12)]">
          <IconComp className="h-6 w-6 text-[#FFD2E3]" {...iconStrongProps} />
        </div>
      </div>
      <div className="mt-5 text-[17px] font-semibold leading-8 text-white">{title}</div>
      <div className="mt-3 flex flex-1 flex-col">
        <p className="text-[15px] leading-8 text-white/75">{desc}</p>
        {bullets?.length ? <BulletList items={bullets} /> : null}
      </div>
    </div>
  );
}

function TabsAccordion({ tabs, openId, onToggle }) {
  const tabDotColors = [
    "#F472B6",
    "#38BDF8",
    "#F59E0B",
    "#34D399",
    "#A78BFA",
  ];
  return (
    <div
      className="mt-6 rounded-[28px] ring-1 backdrop-blur-xl shadow-[0_24px_70px_rgba(4,12,32,0.28)]"
      style={{
        background:
          "linear-gradient(180deg, rgba(18,35,73,0.72) 0%, rgba(13,27,57,0.82) 100%)",
        borderColor: "rgba(255,255,255,0.12)",
      }}
    >
      <div className="flex flex-wrap gap-3 p-4">
        {tabs.map((t) => {
          const isOpen = openId === t.id;
          const dotColor = tabDotColors[tabs.findIndex((item) => item.id === t.id) % tabDotColors.length];
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onToggle(t.id)}
              className={cn(
                "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold",
                "ring-1 transition duration-300 hover:-translate-y-0.5",
                isOpen ? "text-white ring-transparent" : "text-white/85 hover:text-white"
              )}
              style={{
                background: isOpen
                  ? `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.78)} 100%)`
                  : "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                borderColor: isOpen ? "transparent" : "rgba(255,255,255,0.10)",
                boxShadow: isOpen ? "0 14px 32px rgba(201,29,103,0.26)" : "none",
              }}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: isOpen ? "rgba(255,255,255,0.95)" : dotColor }}
              />
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
  const heroPillBg = "linear-gradient(135deg, #0E2A66 0%, #163D8F 100%)";

  return (
    <section
      className="w-full"
      style={{
        background: meta.bg,
        color: meta.ink,
      }}
    >
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
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
            </h1>

            <div className="mt-5">
              <span
                className="inline-flex items-center rounded-full px-4 py-2 text-sm font-bold text-white shadow-[0_14px_34px_rgba(201,29,103,0.24)]"
                style={{ background: heroPillBg, boxShadow: "0 14px 34px rgba(14,42,102,0.28)" }}
              >
                {data.hero.title2}
              </span>
            </div>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-black/75 sm:text-lg">
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
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white ring-1 ring-transparent shadow-[0_14px_34px_rgba(201,29,103,0.18)]"
              style={{ background: heroPillBg, boxShadow: "0 14px 34px rgba(14,42,102,0.24)" }}
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
    <div
      className={cn(
        "rounded-[24px] p-6 text-white ring-1 backdrop-blur-xl shadow-[0_26px_70px_rgba(4,12,32,0.28)]",
        className
      )}
      style={{
        background:
          "linear-gradient(135deg, rgba(16,36,76,0.78) 0%, rgba(12,27,58,0.88) 62%, rgba(10,22,46,0.92) 100%)",
        borderColor: "rgba(255,255,255,0.12)",
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {items.map((item, index) => (
          <div
            key={item.label}
            className="min-w-0 rounded-[18px] px-4 py-4 ring-1 transition duration-300 hover:-translate-y-0.5"
            style={{
              background:
                index % 3 === 0
                  ? "linear-gradient(145deg, rgba(201,29,103,0.16) 0%, rgba(255,255,255,0.04) 100%)"
                  : index % 3 === 1
                  ? "linear-gradient(145deg, rgba(34,211,238,0.14) 0%, rgba(255,255,255,0.03) 100%)"
                  : "linear-gradient(145deg, rgba(99,102,241,0.14) 0%, rgba(255,255,255,0.03) 100%)",
              borderColor: "rgba(255,255,255,0.10)",
            }}
          >
            <div className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/55">{item.label}</div>
            <div className="mt-2 text-sm font-extrabold leading-snug text-white">{item.value}</div>
            {item.sub ? <div className="mt-1.5 text-xs font-medium leading-relaxed text-white/65">{item.sub}</div> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PraktixInternshipProgramPage() {
  const [applyOpen, setApplyOpen] = useState(false);
  const [openSection, setOpenSection] = useState("overview");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentUrl = new URL(window.location.href);
    const authStatus = currentUrl.searchParams.get("auth");
    const nextStep = currentUrl.searchParams.get("step");
    const apply = currentUrl.searchParams.get("apply");

    if (authStatus === "success" && nextStep === "2" && apply === "1") {
      setApplyOpen(true);
    }
  }, []);

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
        category: "",
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
        extra:
          "New cohorts begin every three months, and applicants are enrolled in the next available program.",
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
      { id: "who", label: "Outcomes & Career Value" },
    ],
    []
  );

  const toggleSection = (id) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const overviewCardTints = [
    "linear-gradient(145deg, rgba(34,211,238,0.14) 0%, rgba(255,255,255,0.03) 100%)",
    "linear-gradient(145deg, rgba(167,139,250,0.14) 0%, rgba(255,255,255,0.03) 100%)",
    "linear-gradient(145deg, rgba(245,158,11,0.14) 0%, rgba(255,255,255,0.03) 100%)",
    "linear-gradient(145deg, rgba(52,211,153,0.14) 0%, rgba(255,255,255,0.03) 100%)",
    "linear-gradient(145deg, rgba(201,29,103,0.16) 0%, rgba(255,255,255,0.03) 100%)",
  ];

  return (
    <div className="min-h-screen text-[#1F2937]" style={{ background: DARK_BG }}>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -top-56 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(197,31,93,0.22), rgba(36,52,71,0.18), rgba(20,29,38,0))",
          }}
        />
        <div
          className="absolute right-[-140px] top-[22%] h-[420px] w-[420px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(59,130,246,0.16), rgba(255,255,255,0))" }}
        />
      </div>

      <HeroLikeScreenshot data={data} />

      <section className="mx-auto max-w-6xl px-5 pt-10">
        <div className="relative">
          <div
            className="pointer-events-none absolute -left-10 top-2 h-28 w-28 rounded-full blur-3xl"
            style={{ background: "rgba(201,29,103,0.18)" }}
          />
          <div
            className="pointer-events-none absolute right-0 top-10 h-24 w-24 rounded-full blur-3xl"
            style={{ background: "rgba(34,211,238,0.12)" }}
          />
          <HeroInfoRow items={data.heroMeta.infoRow} className="mb-6" />
          <TabsAccordion tabs={tabs} openId={openSection} onToggle={toggleSection} />
        </div>

        <div className="mt-8">
          {openSection === "overview" && (
            <div className="space-y-4">
              <SectionTitle
                title="Build engineering thinking, not just coding skills"
                subtitle="A structured environment for learning how real software systems are designed, built, tested, and deployed."
              />
              <div className="grid gap-4 lg:grid-cols-12">
                <Card className="lg:col-span-12">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {data.overview.map((p, i) => (
                      <div
                        key={i}
                        className="group relative overflow-hidden rounded-[20px] p-5 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:ring-[#C91D67]/25"
                        style={{ background: overviewCardTints[i % overviewCardTints.length] }}
                      >
                        <div
                          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-80"
                          style={{
                            background:
                              i % 5 === 0
                                ? "linear-gradient(90deg, #38BDF8 0%, transparent 100%)"
                                : i % 5 === 1
                                ? "linear-gradient(90deg, #A78BFA 0%, transparent 100%)"
                                : i % 5 === 2
                                ? "linear-gradient(90deg, #F59E0B 0%, transparent 100%)"
                                : i % 5 === 3
                                ? "linear-gradient(90deg, #34D399 0%, transparent 100%)"
                                : "linear-gradient(90deg, #F472B6 0%, transparent 100%)",
                          }}
                        />
                        <div className="flex items-center gap-3">
                          <span
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold text-white shadow-[0_8px_18px_rgba(0,0,0,0.18)]"
                            style={{
                              background:
                                i % 5 === 0
                                  ? "linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)"
                                  : i % 5 === 1
                                  ? "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)"
                                  : i % 5 === 2
                                  ? "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)"
                                  : i % 5 === 3
                                  ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                                  : "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
                            }}
                          >
                            {i + 1}
                          </span>
                        
                        </div>
                        <p className="mt-4 text-[15px] leading-8 text-white/85">{p}</p>
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
                title="A complete software system from concept to deployment"
                subtitle="Participants work through the full product lifecycle while specializing in one of three engineering tracks."
              />
              <div className="grid gap-4 lg:grid-cols-12">
                <Card className="lg:col-span-7">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-semibold tracking-[0.16em] text-white/60">
                      BUILD SCOPE
                    </div>
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold text-white"
                      style={{ background: "linear-gradient(135deg, rgba(14,42,102,0.95) 0%, rgba(22,61,143,0.95) 100%)" }}
                    >
                      End-to-End
                    </span>
                  </div>
                  <div className="mt-4 h-px w-full bg-gradient-to-r from-[#38BDF8]/60 via-white/10 to-transparent" />
                  <div className="mt-5 rounded-[18px] bg-[linear-gradient(145deg,rgba(56,189,248,0.08),rgba(255,255,255,0.02))] p-5 ring-1 ring-white/10">
                    <div className="text-[17px] font-semibold leading-8 text-white">{data.build.intro}</div>
                    <div className="mt-3 text-[15px] leading-8 text-white/70">
                      {data.build.lifecycle}
                    </div>
                  </div>

                  <div className="mt-6 text-xs font-semibold tracking-[0.16em] text-white/60">
                    PROJECTS  INCLUDE
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {data.build.types.map((item, index) => (
                      <div
                        key={item}
                        className="rounded-[16px] px-4 py-3 ring-1 ring-white/10 transition duration-300 hover:-translate-y-0.5 hover:ring-[#38BDF8]/25"
                        style={{
                          background:
                            index % 2 === 0
                              ? "linear-gradient(145deg, rgba(56,189,248,0.10) 0%, rgba(255,255,255,0.02) 100%)"
                              : "linear-gradient(145deg, rgba(201,29,103,0.10) 0%, rgba(255,255,255,0.02) 100%)",
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                            style={{ background: index % 2 === 0 ? "#38BDF8" : "#F472B6" }}
                          />
                          <span className="text-sm leading-7 text-white/80">{item}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[16px] border border-dashed border-white/10 px-4 py-4 text-[15px] leading-8 text-white/75">
                    {data.build.emphasis}
                  </div>
                </Card>

                <Card className="lg:col-span-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-semibold tracking-[0.16em] text-white/60">
                      SPECIALIZATION TRACKS
                    </div>
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold text-white"
                      style={{ background: "linear-gradient(135deg, rgba(201,29,103,0.95) 0%, rgba(233,76,144,0.95) 100%)" }}
                    >
                      3 Paths
                    </span>
                  </div>
                  <div className="mt-4 h-px w-full bg-gradient-to-r from-[#C91D67]/60 via-white/10 to-transparent" />
                  <div className="mt-5 space-y-3">
                    {data.build.tracks.map((track, index) => (
                      <div
                        key={track}
                        className="rounded-[16px] p-4 ring-1 ring-white/10 transition duration-300 hover:-translate-y-0.5"
                        style={{
                          background:
                            index === 0
                              ? "linear-gradient(145deg, rgba(56,189,248,0.10) 0%, rgba(255,255,255,0.02) 100%)"
                              : index === 1
                              ? "linear-gradient(145deg, rgba(167,139,250,0.10) 0%, rgba(255,255,255,0.02) 100%)"
                              : "linear-gradient(145deg, rgba(244,114,182,0.10) 0%, rgba(255,255,255,0.02) 100%)",
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className="mt-1 inline-flex h-7 min-w-[28px] items-center justify-center rounded-full text-xs font-bold text-white"
                            style={{
                              background:
                                index === 0
                                  ? "linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)"
                                  : index === 1
                                  ? "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)"
                                  : "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
                            }}
                          >
                            {index + 1}
                          </span>
                          <p className="text-sm leading-7 text-white/80">{track}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[20px] bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 ring-1 ring-white/10">
                    <div className="flex items-center justify-between gap-3">
                     
                      
                    </div>
                    <div className="mt-4 h-px w-full bg-gradient-to-r from-[#163D8F]/80 via-white/10 to-transparent" />
                    <div className="mt-4 flex flex-wrap gap-3">
                      {["React", "Node.js", "Python", "PostgreSQL", "Docker", "Git"].map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10 shadow-[0_10px_24px_rgba(14,42,102,0.18)] transition duration-300 hover:-translate-y-0.5"
                          style={{
                            background: "linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)",
                          }}
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
                title="Career advantages beyond traditional training"
                subtitle="Practical outcomes designed to strengthen employability and demonstrate real engineering capability."
              />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {data.benefits.map((b, index) => (
                  <div key={b.title} className="relative">
                    <div
                      className="pointer-events-none absolute inset-x-8 top-0 h-[2px]"
                      style={{
                        background:
                          index % 5 === 0
                            ? "linear-gradient(90deg, #F472B6 0%, transparent 100%)"
                            : index % 5 === 1
                            ? "linear-gradient(90deg, #38BDF8 0%, transparent 100%)"
                            : index % 5 === 2
                            ? "linear-gradient(90deg, #A78BFA 0%, transparent 100%)"
                            : index % 5 === 3
                            ? "linear-gradient(90deg, #34D399 0%, transparent 100%)"
                            : "linear-gradient(90deg, #F59E0B 0%, transparent 100%)",
                      }}
                    />
                    <Benefit {...b} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {openSection === "how" && (
            <div className="space-y-4">
              <SectionTitle
                title="A workflow modeled on professional software teams"
                subtitle="Participants progress through five structured development phases while building their software system."
              />

              <div className="space-y-4">
                {data.howItWorks.map((p, index) => (
                  <Card
                    key={p.phase}
                    className="relative overflow-hidden p-6"
                    style={{
                      background:
                        index % 2 === 0
                          ? "linear-gradient(180deg, rgba(16,33,68,0.96) 0%, rgba(10,22,46,0.96) 100%)"
                          : "linear-gradient(180deg, rgba(13,31,64,0.96) 0%, rgba(8,20,42,0.96) 100%)",
                    }}
                  >
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
                      style={{
                        background:
                          index % 5 === 0
                            ? "linear-gradient(90deg, #F472B6 0%, transparent 100%)"
                            : index % 5 === 1
                            ? "linear-gradient(90deg, #38BDF8 0%, transparent 100%)"
                            : index % 5 === 2
                            ? "linear-gradient(90deg, #A78BFA 0%, transparent 100%)"
                            : index % 5 === 3
                            ? "linear-gradient(90deg, #34D399 0%, transparent 100%)"
                            : "linear-gradient(90deg, #F59E0B 0%, transparent 100%)",
                      }}
                    />
                    <div className="flex items-start gap-3">
                      <div
                        className="grid h-12 w-12 place-items-center rounded-[18px] ring-1 ring-white/10 shadow-[0_10px_24px_rgba(201,29,103,0.12)]"
                        style={{
                          background:
                            index % 5 === 0
                              ? "linear-gradient(145deg, rgba(244,114,182,0.22), rgba(255,255,255,0.03))"
                              : index % 5 === 1
                              ? "linear-gradient(145deg, rgba(56,189,248,0.22), rgba(255,255,255,0.03))"
                              : index % 5 === 2
                              ? "linear-gradient(145deg, rgba(167,139,250,0.22), rgba(255,255,255,0.03))"
                              : index % 5 === 3
                              ? "linear-gradient(145deg, rgba(52,211,153,0.22), rgba(255,255,255,0.03))"
                              : "linear-gradient(145deg, rgba(245,158,11,0.22), rgba(255,255,255,0.03))",
                        }}
                      >
                        <p.icon className="h-5 w-5 text-[#FFD2E3]" {...iconStrongProps} />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold text-white"
                            style={{
                              background:
                                index % 5 === 0
                                  ? "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)"
                                  : index % 5 === 1
                                  ? "linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)"
                                  : index % 5 === 2
                                  ? "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)"
                                  : index % 5 === 3
                                  ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                                  : "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                            }}
                          >
                            Step {index + 1}
                          </span>
                        </div>
                        <div className="mt-2 text-[18px] font-semibold leading-8 text-white">
                          {p.title}
                        </div>
                        <div className="mt-4 rounded-[18px] bg-white/[0.03] p-4 ring-1 ring-white/10">
                          <BulletList items={p.bullets} />
                        </div>
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
                title="Graduate with practical experience and tangible career assets"
                subtitle="The internship is designed to produce visible outputs that employers can evaluate directly."
              />

              <div className="grid gap-4 lg:grid-cols-12">
                <Card className="lg:col-span-12">
                  <div className="text-xs font-semibold tracking-wide text-white/60">
                    PARTICIPANTS GAIN
                  </div>
                  <BulletList items={data.outcomes} />
                </Card>
              </div>
            </div>
          )}

          {openSection === "who" && (
            <div className="space-y-4">
              <SectionTitle
                title="Outcomes & Career Value"
                subtitle="By the end of the internship, participants graduate with both practical experience and tangible career assets."
              />

              <div className="grid gap-4 lg:grid-cols-12">
                <Card className="lg:col-span-12">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white/60">
                    <BadgeCheck className="h-4 w-4 text-[#FFD2E3]" {...iconStrongProps} />
                    PARTICIPANTS GAIN
                  </div>
                  <div className="mt-4 rounded-[22px] bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 ring-1 ring-white/10">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        Career Assets
                      </span>
                      
                    </div>
                    <div className="h-px w-full bg-gradient-to-r from-[#C91D67]/60 via-white/10 to-transparent" />
                    <BulletList
                      items={[
                        "Experience building production-level software systems from concept to deployment.",
                        "A professional engineering portfolio that demonstrates real development work.",
                        "A GitHub repository showcasing the completed project and development process.",
                        "Understanding of software architecture, system design, and engineering workflows.",
                        "Experience working with collaborative development practices used in modern technology teams.",
                        "Exposure to open-source contribution environments and engineering communities.",
                        "Preparation for software engineering interviews including technical discussions and project walkthroughs.",
                        "Structured performance evaluation based on real project work and engineering practices.",
                      ]}
                    />
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white/60">
                    <BadgeCheck className="h-4 w-4 text-[#FFD2E3]" {...iconStrongProps} />
                    WHO THIS INTERNSHIP IS FOR
                    </div>
                   
                  </div>
                  <div className="mt-4 space-y-5">
                    {[
                      {
                        title: "University Students",
                        desc:
                          "Students in computer science or related fields who want to gain real development experience before entering the job market.",
                      },
                      {
                        title: "Recent Graduates",
                        desc:
                          "Graduates seeking practical engineering experience and a portfolio that strengthens their employability.",
                      },
                      {
                        title: "Career Switchers",
                        desc:
                          "Individuals transitioning into software engineering who want to build real systems and demonstrate practical capability to employers.",
                      },
                    ].map((item, index) => (
                      <div
                        key={item.title}
                        className="rounded-[20px] p-5 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:ring-[#C91D67]/25"
                        style={{
                          background:
                            index === 0
                              ? "linear-gradient(145deg, rgba(56,189,248,0.10) 0%, rgba(255,255,255,0.03) 100%)"
                              : index === 1
                              ? "linear-gradient(145deg, rgba(167,139,250,0.10) 0%, rgba(255,255,255,0.03) 100%)"
                              : "linear-gradient(145deg, rgba(244,114,182,0.10) 0%, rgba(255,255,255,0.03) 100%)",
                        }}
                      >
                        <div className="flex items-start gap-4">
                          <span
                            className="inline-flex h-10 min-w-[40px] items-center justify-center rounded-full text-sm font-bold text-white"
                            style={{
                              background:
                                index === 0
                                  ? "linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)"
                                  : index === 1
                                  ? "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)"
                                  : "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
                            }}
                          >
                            {index + 1}
                          </span>
                          <div>
                            <div className="text-[18px] font-semibold text-white">{item.title}</div>
                            <p className="mt-2 text-[15px] leading-8 text-white/75">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          <div
            className="relative left-1/2 right-1/2 mt-4 w-screen -translate-x-1/2 px-4 pt-4 pb-4 sm:px-6 sm:pt-6 sm:pb-6"
            style={{
              background: "linear-gradient(180deg, #E9E7DF 0%, #F3E6D3 100%)",
            }}
          >
            <div className="mx-auto max-w-6xl">
              <div className="w-full">
              <div className="mb-4">
                <h2 className="text-3xl font-semibold text-[#111827] sm:text-4xl">
                  {data.finalCta.title}
                </h2>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#4B5563]">
                  {data.finalCta.subtitle}
                </p>
              </div>
              <Card
                className="relative overflow-hidden p-6 sm:p-8"
                style={{
                  background: "linear-gradient(180deg, rgba(255,250,244,0.98) 0%, rgba(248,239,229,0.96) 100%)",
                  borderColor: "rgba(145, 120, 104, 0.18)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-2xl"
                style={{ background: "rgba(197,31,93,0.22)" }}
              />
              <div
                className="pointer-events-none absolute -bottom-12 left-10 h-36 w-36 rounded-full blur-3xl"
                style={{ background: "rgba(34,211,238,0.14)" }}
              />
              <div className="relative z-10 flex flex-col gap-6">
                <div className="grid gap-2 sm:grid-cols-3">
                  {["Live mentorship", "Portfolio-ready project", "Interview prep"].map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold text-white ring-1 ring-transparent shadow-[0_10px_24px_rgba(201,29,103,0.15)]"
                      style={{ background: `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.74)} 100%)` }}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="text-sm leading-relaxed text-[#4B5563] sm:max-w-3xl">
                  {data.finalCta.extra}
                </div>

                <div className="text-sm leading-relaxed text-[#4B5563] sm:max-w-3xl">
                  {data.finalCta.text}
                </div>

                <button
                  type="button"
                  onClick={() => setApplyOpen(true)}
                  className={cn(
                    "group inline-flex w-fit items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white",
                    "ring-1 ring-transparent shadow-[0_18px_46px_rgba(201,29,103,0.24)]",
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
          </div>
        </div>
      </section>

      <ApplyFlowModal
        open={applyOpen}
        program={null}
        hidePreferredCategory
        hideSelectedProgram
        onClose={() => setApplyOpen(false)}
      />
    </div>
  );
}
