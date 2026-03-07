import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Backpack,
  BadgeCheck,
  BarChart3,
  Bot,
  Briefcase,
  Building2,
  CalendarDays,
  ChevronRight as ChevronRightIcon,
  Cpu,
  FlaskConical,
  Factory,
  Globe,
  GraduationCap,
  Handshake,
  Landmark,
  Map,
  MessageSquareQuote,
  Network,
  Route,
  School,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  UserPlus,
  UserRound,
  Users,
  UsersRound,
  Workflow,
  Wrench,
} from "lucide-react";
import { useLocalTheme } from "../hooks/use-local-theme";
import { useLocation } from "react-router-dom";
import "./Navbar.css";

const COLORS = {
  accent: "#C51F5D",
  primary: "#243447",
  deep: "#141D26",
  sand: "#E2E2D2",
};

const NAV = [
  {
    id: "individuals",
    label: "For Individuals",
    description: "Designed for learners, graduates, and professionals seeking structured career growth",
    align: "start",
    columns: [
      {
        title: "Learner Segments",
        items: [
          {
            label: "Students & Graduates",
            href: "/students-graduates",
            desc: "Industry-integrated internships, career tracks, and portfolio-based learning experiences",
          },
          {
            label: "AI for Real-World Careers",
            href: "/for-individuals/ai-for-real-world-careers",
            desc: "Practical AI applications across business, healthcare, engineering, data, marketing, and beyond",
          },
        ],
      },
      {
        title: "Growth Paths",
        items: [
          {
            label: "1-to-1 Career Mentorship",
            href: "/for-individuals/mentorship",
            desc: "Direct access to industry experts and university professors",
          },
        ],
      },
    ],
    promo: {
      eyebrow: "Individuals",
      title: "Build your career path",
      text: "Modern programs focused on practical growth and measurable outcomes.",
      href: "/for-individuals",
      cta: "Explore Individual Paths",
    },
  },
  {
    id: "organizations",
    label: "For Organizations",
    description: "Built for institutions shaping the workforce of tomorrow",
    align: "start",
    columns: [
      {
        title: "Institution Types",
        items: [
          {
            label: "Universities & Companies",
            href: "/for-organizations/universities-companies",
            desc: "Co-hosted industry programs integrated into academic structures",
          },
          {
            label: "Schools & Early Talent Programs",
            href: "/for-organizations/schools-early-talent-programs",
            desc: "Career exposure programs for high school students and children of employees",
          },
        ],
      },
      {
        title: "Strategic Solutions",
        items: [
          {
            label: "AI for Organizations",
            href: "/for-organizations/ai",
            desc: "Applied AI frameworks tailored to industry sectors and institutional needs",
          },
        ],
      },
    ],
    promo: {
      eyebrow: "Organizations",
      title: "Scale workforce impact",
      text: "Programs and frameworks built for institutional and talent growth.",
      href: "/for-organizations",
      cta: "Explore Organization Solutions",
    },
  },
  {
    id: "insights",
    label: "Insights",
    description: "Thought leadership, value-driven content, and industry intelligence",
    align: "end",
    columns: [
      {
        title: "Impact",
        items: [
          {
            label: "Impact & Outcomes",
            href: "/insights/impact-outcomes",
            desc: "Data-driven results, measurable growth, and professional progress",
          },
          {
            label: "Real Experience",
            href: "/insights/real-experience",
            desc: "Case-based learning examples and practical project execution",
          },
        ],
      },
      {
        title: "Proof",
        items: [
          {
            label: "Success & Testimonials",
            href: "/insights/success-testimonials",
            desc: "Graduate journeys, outcomes, and feedback from learners and partners",
          },
          {
            label: "Our Value Model",
            href: "/insights/our-value-model",
            desc: "How our system creates practical capability and long-term value",
          },
        ],
      },
    ],
    promo: {
      eyebrow: "Insights",
      title: "Track real impact",
      text: "Leadership content, project signals, and measurable career results.",
      href: "/insights",
      cta: "Explore Insights",
    },
  },
  {
    id: "about",
    label: "About",
    description: "Who we are. How we work. Why it matters",
    align: "end",
    columns: [
      {
        title: "Core",
        items: [
          {
            label: "Our Mission & Vision",
            href: "/about/mission-vision",
            desc: "Building structured systems that close the education-to-industry gap",
          },
          {
            label: "How We Work",
            href: "/about/how-we-work",
            desc: "A system-based approach combining projects, mentorship, and measurable outcomes",
          },
          {
            label: "Ecosystem",
            href: "/about/ecosystem",
            desc: "A connected environment integrating experts, institutions, and industry",
          },
          {
            label: "Partnerships",
            href: "/about/partnerships",
            desc: "Institutional collaborations, co-hosting models, and European network partnerships",
          },
        ],
      },
    ],
    promo: {
      eyebrow: "About",
      title: "Understand the model",
      text: "See the system and network behind measurable outcomes.",
      href: "/about/mission-vision",
      cta: "Explore About",
    },
  },
];

function Chevron({ open }) {
  return (
    <svg className={`px-chev ${open ? "open" : ""}`} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return open ? (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const ICONS_BY_TITLE = {
  "Students & Graduates": GraduationCap,
  "Women in Tech": Users,
  "AI for Real-World Careers": Cpu,
  "Career Tracks & Bootcamps": Route,
  "Life Training": FlaskConical,
  "1-to-1 Career Mentorship": UserRound,
  "Trend Lab": TrendingUp,
  "Universities & Companies": School,
  "Schools & Early Talent Programs": Backpack,
  "AI for Organizations": Bot,
  Partnerships: Handshake,
  "Innovation & Workforce Tools": Wrench,
  Value: BadgeCheck,
  "Our Value Model": BadgeCheck,
  "Real Projects": Briefcase,
  "Real Experience": Briefcase,
  "Global Exposure": Globe,
  "Career Outcomes": BarChart3,
  "Impact & Outcomes": BarChart3,
  "Success Stories": Trophy,
  "Success & Testimonials": MessageSquareQuote,
  "Feedback & Testimonials": MessageSquareQuote,
  "Our Mission & Vision": Target,
  "How We Work": Workflow,
  PARTNERSHIPS: Handshake,
  Ecosystem: Network,
  "Global Expert Network": UsersRound,
  "Industry Engagements": Factory,
  "Educational & Career Events": CalendarDays,
  "Hiring Initiatives": UserPlus,
  "Become an Expert": Sparkles,
  "University Partnerships": School,
  "Industry Partners": Building2,
  "Affiliate Network": UsersRound,
  "Become a Co-Host": Handshake,
  "Strategic Alliances": Network,
  "Volunteer as an Expert": UserPlus,
};

function ItemIcon({ title, active = false, className = "" }) {
  const Icon = ICONS_BY_TITLE[title];
  return (
    <span className={`px-itemIcon ${active ? "active" : ""} ${className}`}>
      {Icon ? <Icon size={18} strokeWidth={1.8} /> : <span className="px-itemIconFallback" />}
    </span>
  );
}

export default function Navbar({ dir = "ltr" }) {
  const [openId, setOpenId] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useLocalTheme();
  const location = useLocation();
  const brandLogoSrc = "/navbar-logo-dark.png";
  const navRef = useRef(null);
  const closeTimer = useRef(null);
  const navItems = useMemo(() => NAV, []);
  const forceDarkTheme =
    location.pathname.startsWith("/students-graduates") ||
    location.pathname.startsWith("/for-individuals/students-graduates");
  const headerTheme = forceDarkTheme ? "dark" : theme;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 920px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setOpenId(null);
        setMobileOpen(false);
      }
    }
    function onClick(e) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target)) {
        setOpenId(null);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  function openMenu(id) {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenId(id);
  }

  function scheduleClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenId(null), 140);
  }

  function toggleMobile() {
    setMobileOpen((v) => !v);
    setOpenId(null);
  }

  function onNavLink() {
    setOpenId(null);
    setMobileOpen(false);
  }

  return (
    <header
      className={`px-header ${headerTheme === "dark" ? "dark" : "light"}`}
      style={{
        ["--px-accent"]: COLORS.accent,
        ["--px-primary"]: COLORS.primary,
        ["--px-deep"]: COLORS.deep,
        ["--px-sand"]: COLORS.sand,
      }}
      dir={dir}
    >
      <nav className="px-nav" ref={navRef} aria-label="Primary">
        <div className="px-container">
          {/* LEFT: Brand */}
          <a className="px-brand" href="/" onClick={onNavLink} aria-label="Praktix Home">
            <img className="px-brandLogo" src={brandLogoSrc} alt="Praktix logo" />
          </a>

          {/* CENTER: Desktop nav (perfectly centered) */}
          <div className="px-center" onPointerLeave={() => !isMobile && scheduleClose()}>
            {navItems.map((group) => {
              const open = openId === group.id;

              return (
                <div
                  key={group.id}
                  className="px-item"
                  data-align={group.align || "start"}
                  onPointerEnter={() => !isMobile && openMenu(group.id)}
                >
                  <button
                    className={`px-trigger ${open ? "active" : ""}`}
                    aria-haspopup="menu"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : group.id)}
                    type="button"
                  >
                    <span>{group.label}</span>
                    <Chevron open={open} />
                  </button>

                  {open && (
                    <div
                      className="px-mega"
                      role="menu"
                      aria-label={group.label}
                      onPointerEnter={() => !isMobile && openMenu(group.id)}
                      onPointerLeave={() => {
                        if (!isMobile) scheduleClose();
                      }}
                    >
                      <div className="px-megaGrid">
                        <div className="px-cols">
                          {group.columns.map((col) => (
                            <div key={col.title} className="px-col">
                              <div className="px-colTitle">{col.title}</div>
                              <ul className="px-colList">
                                {col.items.map((it) => (
                                  <li key={it.href}>
                                    <a
                                      className="px-linkCard"
                                      href={it.href}
                                      onClick={onNavLink}
                                    >
                                      <div className="px-linkHead">
                                        <ItemIcon title={it.label} />
                                        <div className="px-linkLabel">{it.label}</div>
                                        <ChevronRightIcon className="px-linkArrow" size={18} strokeWidth={2} />
                                      </div>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT: Actions pinned to the far right */}
          <div className="px-right">
            <div className="px-actions">
              <a className="px-cta" href="/portal" onClick={onNavLink}>
                Login Portal
              </a>
            </div>

            <button className="px-mobileBtn" type="button" aria-label="Toggle menu" onClick={toggleMobile}>
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {mobileOpen && (
          <div className="px-mobilePanel">
            <div className="px-mobileInner">
            <div className="px-mobileActions">
              <a className="px-cta mobile" href="/portal" onClick={onNavLink}>
                Login Portal
              </a>
              </div>

              <div className="px-accordion">
                {navItems.map((group) => {
                  const open = openId === group.id;
                  return (
                    <div key={group.id} className="px-accItem">
                      <button
                        className={`px-accTrigger ${open ? "active" : ""}`}
                        type="button"
                        onClick={() => setOpenId(open ? null : group.id)}
                      >
                        <span>{group.label}</span>
                        <Chevron open={open} />
                      </button>

                      {open && (
                        <div className="px-accBody">
                          {group.columns.map((col) => (
                            <div key={col.title} className="px-accCol">
                              <div className="px-colTitle">{col.title}</div>
                              <ul className="px-accList">
                                {col.items.map((it) => (
                                  <li key={it.href}>
                                    <a
                                      className="px-accLink"
                                      href={it.href}
                                      onClick={onNavLink}
                                    >
                                      <ItemIcon title={it.label} className="mobile" />
                                      <span>{it.label}</span>
                                      <ChevronRightIcon className="px-linkArrow" size={16} strokeWidth={2} />
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="px-mobileFooter">
                <a className="px-mutedLink" href="/contact" onClick={onNavLink}>
                  Contact
                </a>
                <span className="px-dot">|</span>
                <a className="px-mutedLink" href="/about/mission-vision" onClick={onNavLink}>
                  About Praktix
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
