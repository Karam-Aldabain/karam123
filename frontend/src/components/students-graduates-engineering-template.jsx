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
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  GraduationCap,
  LayoutGrid,
  BadgeCheck,
  Building2,
  Star,
  Bookmark,
  Info,
  Home,
  ChevronRight,
  Smartphone,
  TabletSmartphone,
  Bug,
  Wrench,
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

function Chip({ children, dark = false }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
        "ring-1",
        dark
          ? "bg-black/5 text-black/70 ring-black/10"
          : "bg-white/5 text-white/80 ring-white/10"
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: THEME.pink }} />
      {children}
    </span>
  );
}

function SnapshotItem({ label, value, icon, tint = "rgba(255,255,255,0.08)" }) {
  const IconComp = icon;
  return (
    <div className="flex items-start gap-3">
      <div
        className="grid h-10 w-10 place-items-center rounded-2xl ring-1 ring-white/20"
        style={{ background: `linear-gradient(145deg, ${tint} 0%, rgba(255,255,255,0.05) 100%)` }}
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
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: THEME.pink }} />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

function Benefit({ title, desc, bullets }) {
  return (
    <div className="rounded-[22px] bg-white/5 p-6 ring-1 ring-white/10">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
        <Icon className="h-6 w-6 text-[#E9E7DF]" {...iconStrongProps} />
      </div>
      <div className="mt-4 text-base font-semibold text-[#E9E7DF]">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-white/70">{desc}</p>
      {bullets?.length ? <BulletList items={bullets} /> : null}
    </div>
  );
}

/**
 * Tabs behavior:
 * - Clicking a tab shows that section (accordion-style)
 * - Only one section visible at a time
 */
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
                className={cn("h-4 w-4 transition-transform duration-200", isOpen ? "rotate-180" : "rotate-0")}
                {...iconStrongProps}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** ===== HERO (matches the screenshot layout) ===== */
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
        {/* Breadcrumb */}
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
          {/* Left */}
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

            {/* Rating row */}
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

          {/* Right visual (image-like card) */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[18px] bg-black/20 ring-1 ring-white/15">
              <div className="relative h-[260px] w-full sm:h-[320px]">
                <img
                  src={meta.heroImage}
                  alt="Mobile app developers collaborating on product design and implementation"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/10" />
              </div>
            </div>
          </div>
        </div>

        {/* Tracks chips */}
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
  const [openSection, setOpenSection] = useState("overview"); // default open

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

      // ✅ Mobile App Development
      hero: {
        title: "Mobile App Development Internship",
        title2: "Ship Real iOS & Android Apps",
        subtitle:
          "Build production-grade mobile applications while working on a structured product project guided by industry professionals from leading European technology companies.\n\nThis internship simulates the workflow of modern mobile teams and focuses on delivering high-quality apps with real engineering practices: architecture, state management, testing, release workflows, and performance.",
        tracks: ["iOS Development", "Android Development", "Cross-Platform (React Native/Flutter)"],
      },

      heroMeta: {
        bg: "#F3E6D3",
        ink: "#1F2937",
        breadcrumb: ["Home", "For Individuals", "Mobile App Development"],
        category: "INTERNSHIP PROGRAM",
        ratingValue: 5,
        ceus: "EARN 2.0 EEUs",
        heroImage: "/mobile-app-development.jpg",
        infoRow: [
          { label: "Next Available Date", value: "Mar 12–Apr 30, 2026" },
          { label: "Format", value: "Self-Paced Online" },
          { label: "Location", value: "Online" },
          { label: "Duration", value: "6 weeks" },
          { label: "Commitment", value: "4–6 hours/week" },
          { label: "Tuition", value: "$2,950" },
        ],
      },

      snapshot: [
        { label: "Next Cohort", value: "Applications Open", icon: CalendarDays },
        { label: "Format", value: "Online – Expert Led", icon: Globe },
        { label: "Duration", value: "12–15 Weeks", icon: Clock3 },
        { label: "Commitment", value: "6–10 Hours / Week", icon: ClipboardList },
        { label: "Project Type", value: "Mobile Product Simulation", icon: Layers },
        { label: "Outcome", value: "App Portfolio + Store-Ready Build", icon: Trophy },
      ],

      overview: [
        "Modern mobile app development requires more than UI building. Engineers must understand app architecture, performance, and release workflows across real devices.",
        "This internship provides a structured environment where participants build real mobile applications while learning how professional mobile teams design, implement, test, and ship apps.",
        "Guided by experienced industry professionals, participants develop a complete mobile product from concept to release-ready build.",
        "Throughout the program, participants apply modern practices including state management, modular architecture, debugging workflows, documentation standards, and collaborative development processes.",
        "The program bridges the gap between academic learning and production mobile engineering environments.",
      ],

      workOn: {
        intro: "The internship revolves around building a complete mobile product as the central project.",
        types: [
          "Mobile UI components and design systems",
          "API integration and offline-first patterns",
          "Authentication, permissions, and secure storage",
          "State management and modular architecture",
          "Testing (unit/UI) and quality gates",
          "Release workflow (builds, signing, distribution)",
        ],
        tracks: ["iOS Development", "Android Development", "Cross-Platform (React Native/Flutter)"],
        emphasis: "The emphasis is on building maintainable, high-performance mobile apps with production workflows.",
      },

      benefits: [
        {
          icon: Rocket,
          title: "Real Mobile Product Experience",
          desc: "Participants build a complete mobile app project that mirrors real-world mobile engineering environments.",
        },
        {
          icon: Smartphone,
          title: "Portfolio-Ready App Builds",
          desc: "Graduate with a demonstrable app and assets that hiring teams can evaluate quickly.",
          bullets: ["App demo (video/links)", "Clean architecture + codebase", "Release-ready build artifacts", "Feature documentation"],
        },
        {
          icon: Sparkles,
          title: "AI-Assisted Code & UX Review",
          desc: "AI tools provide structured feedback on code quality, UI consistency, and documentation to accelerate improvement.",
        },
        {
          icon: Bug,
          title: "Debugging & Performance Skills",
          desc: "Learn practical debugging workflows, profiling basics, and performance optimization patterns for mobile apps.",
        },
        {
          icon: GraduationCap,
          title: "Mobile Interview Preparation",
          desc: "Includes scenario-based interviews: architecture choices, state management tradeoffs, debugging, and feature delivery.",
        },
      ],

      howItWorks: [
        {
          phase: "Phase 1",
          title: "Product Definition & User Flows",
          bullets: ["Define app concept", "Map user journeys", "Set scope and MVP features"],
          icon: HelpCircle,
        },
        {
          phase: "Phase 2",
          title: "Mobile Architecture & Design System",
          bullets: ["Choose architecture pattern", "Set state management approach", "Create UI components and navigation"],
          icon: Layers,
        },
        {
          phase: "Phase 3",
          title: "Core Mobile Development",
          bullets: ["Build screens and flows", "Integrate APIs", "Implement auth, storage, permissions"],
          icon: Code2,
        },
        {
          phase: "Phase 4",
          title: "Testing, Debugging & Performance",
          bullets: ["Add tests", "Debugging workflows", "Optimize UX and performance", "Stabilize app"],
          icon: Database,
        },
        {
          phase: "Phase 5",
          title: "Release Workflow & Presentation",
          bullets: ["Build and sign app", "Prepare distribution package", "Present architecture decisions", "Demo end-to-end product"],
          icon: Cloud,
        },
      ],

      programTakeaways: [
        "Experience building production-grade mobile apps",
        "A professional mobile portfolio with demo assets",
        "Understanding of mobile architecture and state management",
        "Experience integrating APIs and handling offline behavior",
        "Exposure to testing and release workflows",
        "Practical preparation for mobile engineering interviews",
        "Structured performance evaluation based on real project work",
      ],

      learningOutcomes: [
        "Design scalable mobile app architectures",
        "Develop maintainable codebases using modern frameworks",
        "Implement state management patterns for real apps",
        "Integrate APIs securely and handle edge cases",
        "Test, debug, and optimize mobile performance",
        "Communicate technical decisions clearly in interviews and reviews",
      ],

      whoShouldApply: [
        "Final-year university students in computer science or related fields",
        "Recent graduates pursuing iOS/Android/mobile careers",
        "Early-career developers seeking structured mobile experience",
        "Individuals with basic programming knowledge looking to build real mobile apps",
      ],

      programStructure: [
        { label: "Duration", value: "12–15 Weeks" },
        { label: "Format", value: "Online – Expert-Led" },
        { label: "Learning Model", value: "Project-Based Internship" },
        { label: "Project Format", value: "Mobile Product Simulation" },
        { label: "Evaluation Model", value: "Performance-Based Assessment" },
        { label: "Final Outcome", value: "Release-Ready Mobile App Project" },
      ],

      finalDeliverables: [
        "Mobile app (iOS/Android or cross-platform) with core features",
        "GitHub repository with clean architecture",
        "Technical documentation + feature specs",
        "Testing notes and QA checklist",
        "Release workflow artifacts (builds/signing/distribution steps)",
        "Portfolio assets (demo video/screenshots)",
        "Structured performance evaluation report",
      ],

      whyPraktix: {
        title: "Why Praktix Internships",
        paragraphs: [
          "Praktix internships are designed as structured professional development systems rather than traditional training programs.",
          "Each internship operates within the Praktix Internship Operating System, ensuring consistent learning structures, project-based experiences, and measurable outcomes.",
          "Participants develop practical skills by working on real mobile engineering challenges while receiving guidance from industry professionals.",
        ],
      },

      cta: {
        title: "Start Building Mobile Apps",
        subtitle: "Applications for the next cohort are now open.",
      },
    }),
    []
  );

  const tabs = useMemo(
    () => [
      { id: "overview", label: "Overview" },
      { id: "work", label: "What You’ll Work On" },
      { id: "benefits", label: "Key Benefits" },
      { id: "how", label: "How It Works" },
      { id: "outcomes", label: "Outcomes" },
      { id: "structure", label: "Program Structure" },
      { id: "why", label: "Why Praktix" },
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
      {/* Dark background glow */}
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
                eyebrow="Course overview"
                title="Why attend Praktix Mobile App Development Internship?"
                subtitle="A structured, professional environment for building release-ready mobile products end-to-end."
              />
              <div className="grid gap-4 lg:grid-cols-12">
                <Card
                  className="lg:col-span-4"
                  style={{
                    background: "linear-gradient(180deg, rgba(34,211,238,0.08) 0%, rgba(255,255,255,0.04) 100%)",
                  }}
                >
                  <div className="text-xs font-semibold tracking-wide text-white/60">AT A GLANCE</div>
                  <div className="mt-4 space-y-3">
                    {data.snapshot.slice(0, 4).map((item, i) => (
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
                        <div className="text-xs font-semibold tracking-wide text-white/55">POINT {i + 1}</div>
                        <p className="mt-2 text-sm leading-relaxed text-white/75">{p}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {openSection === "work" && (
            <div className="space-y-4">
              <SectionTitle
                eyebrow="Project focus"
                title="What you will work on"
                subtitle="A complete mobile product built through real iOS/Android workflows."
              />
              <div className="grid gap-4 lg:grid-cols-12">
                <Card className="lg:col-span-7">
                  <div className="text-sm leading-relaxed text-white/70">{data.workOn.intro}</div>
                  <div className="mt-5 text-xs font-semibold tracking-wide text-white/60">PROJECT COMPONENTS MAY INCLUDE</div>
                  <BulletList items={data.workOn.types} />
                  <div className="mt-5 text-sm leading-relaxed text-white/70">{data.workOn.emphasis}</div>
                </Card>

                <Card className="lg:col-span-5">
                  <div className="text-xs font-semibold tracking-wide text-white/60">TRACKS</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {data.workOn.tracks.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-[#E9E7DF] ring-1 ring-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {openSection === "benefits" && (
            <div className="space-y-4">
              <SectionTitle
                eyebrow="Key benefits"
                title="What you get from the internship"
                subtitle="Practical outcomes designed to translate into real mobile hiring advantages."
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
                eyebrow="Workflow"
                title="How the internship works"
                subtitle="A structured development framework based on professional mobile workflows."
              />

              <div className="space-y-4">
                {data.howItWorks.map((p) => (
                  <Card key={p.phase} className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                        <p.icon className="h-5 w-5 text-[#E9E7DF]" {...iconStrongProps} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold tracking-wide text-white/60">{p.phase}</div>
                        <div className="mt-1 text-base font-semibold text-[#E9E7DF]">{p.title}</div>
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
                eyebrow="Outcomes"
                title="Learning outcomes, takeaways & final deliverables"
                subtitle="What you’ll be able to do—and what you’ll graduate with."
              />

              <div className="grid gap-4 lg:grid-cols-12">
                <Card className="lg:col-span-6">
                  <div className="text-xs font-semibold tracking-wide text-white/60">PROGRAM TAKEAWAYS</div>
                  <BulletList items={data.programTakeaways} />
                </Card>

                <Card className="lg:col-span-6">
                  <div className="text-xs font-semibold tracking-wide text-white/60">LEARNING OUTCOMES</div>
                  <BulletList items={data.learningOutcomes} />
                </Card>
              </div>

              <div className="grid gap-4 lg:grid-cols-12">
                <Card className="lg:col-span-6">
                  <div className="text-xs font-semibold tracking-wide text-white/60">FINAL DELIVERABLES</div>
                  <BulletList items={data.finalDeliverables} />
                </Card>

                <Card className="lg:col-span-6">
                  <div className="text-xs font-semibold tracking-wide text-white/60">WHO SHOULD APPLY</div>
                  <BulletList items={data.whoShouldApply} />
                </Card>
              </div>
            </div>
          )}

          {openSection === "structure" && (
            <div className="space-y-4">
              <SectionTitle
                eyebrow="Program structure"
                title="How the program is organized"
                subtitle="Clear timelines, a project-based model, and performance-based assessment."
              />

              <div className="grid gap-4 lg:grid-cols-12">
                <Card className="lg:col-span-7">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white/60">
                    <LayoutGrid className="h-4 w-4" {...iconStrongProps} />
                    STRUCTURE OVERVIEW
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {data.programStructure.map((row) => (
                      <div key={row.label} className="rounded-[18px] bg-white/5 p-4 ring-1 ring-white/10">
                        <div className="text-xs font-semibold text-white/60">{row.label}</div>
                        <div className="mt-1 text-sm font-semibold text-[#E9E7DF]">{row.value}</div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="lg:col-span-5">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white/60">
                    <BadgeCheck className="h-4 w-4" {...iconStrongProps} />
                    EVALUATION & OUTCOME
                  </div>
                  <div className="mt-3 text-sm leading-relaxed text-white/70">
                    You’ll be evaluated based on real mobile product work, architecture quality, testing discipline, UI quality,
                    and your ability to communicate technical decisions—ending with a release-ready app and portfolio assets.
                  </div>
                </Card>
              </div>
            </div>
          )}

          {openSection === "why" && (
            <div className="space-y-4">
              <SectionTitle
                eyebrow="Praktix system"
                title={data.whyPraktix.title}
                subtitle="Why this internship is built differently than traditional training programs."
              />

              <div className="grid gap-4 lg:grid-cols-12">
                <Card className="lg:col-span-7">
                  <div className="space-y-4 text-sm leading-relaxed text-white/70">
                    {data.whyPraktix.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </Card>

                <Card className="lg:col-span-5">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white/60">
                    <Building2 className="h-4 w-4" {...iconStrongProps} />
                    PRAKTIX INTERNSHIP OPERATING SYSTEM
                  </div>
                  <BulletList
                    items={[
                      "Consistent learning structures",
                      "Project-based experience",
                      "Measurable outcomes",
                      "Guidance from industry professionals",
                    ]}
                  />
                </Card>
              </div>
            </div>
          )}

          <div className="mt-10">
            <SectionTitle eyebrow="Call to action" title={data.cta.title} subtitle={data.cta.subtitle} />
            <Card className="relative overflow-hidden p-6 sm:p-8">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-2xl"
                style={{ background: "rgba(197,31,93,0.22)" }}
              />
              <div className="relative z-10 flex flex-col gap-6">
                <div className="grid gap-2 sm:grid-cols-3">
                  {["Live mentorship", "Portfolio-ready app", "Interview prep"].map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-white/85 ring-1 ring-white/10"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="text-sm leading-relaxed text-white/75 sm:max-w-3xl">
                  Build a release-ready mobile app, receive structured technical feedback, and graduate with artifacts hiring
                  managers can evaluate directly (repo, architecture notes, demos, and release workflow).
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
