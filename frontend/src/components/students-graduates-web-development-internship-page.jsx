import React from "react";
import { Cloud, Gauge, GitBranch, Globe2, LayoutTemplate, Search, Server } from "lucide-react";
import StudentsGraduatesEngineeringTemplate from "./students-graduates-engineering-template";

export default function StudentsGraduatesWebDevelopmentInternshipPage() {
  return (
    <StudentsGraduatesEngineeringTemplate
      programSlug="eng-web-development-internship"
      tags={["Professional", "Web Development Internship", "Frontend + Backend"]}
      heroGlow="rgba(34,211,238,0.22)"
      snapshot={{
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        rating: 4.8,
        deliverable: "Production-ready web application with API integration and deployment",
        deliverableBadges: ["Responsive UI", "Backend API", "Deployment + SEO"],
        deliverableLabel: "Web product readiness",
        includes: ["Live Web Application", "API Integration", "Deployment Workflow"],
        careerPaths: ["Web Developer", "Frontend Developer", "Full Stack Developer"],
        curriculumSubtitle: "Build modern web applications that are responsive, maintainable, and deployment-ready.",
        portfolioSubtitle: "Demonstrate end-to-end web delivery from UI implementation to backend integration.",
        runSubtitle: "A practical internship workflow with sprint planning, code reviews, and release milestones.",
      }}
      curriculum={[
        {
          title: "Frontend Foundations",
          points: ["HTML/CSS/JS quality patterns", "Component-based UI architecture", "Accessibility and responsive behavior"],
          icon: LayoutTemplate,
        },
        {
          title: "Backend & APIs",
          points: ["REST API integration", "Form/data flows", "Auth and error handling fundamentals"],
          icon: Server,
        },
        {
          title: "Content & Admin Workflows",
          points: ["CMS/content modeling basics", "Structured authoring and publishing", "Maintainable update processes"],
          icon: Globe2,
        },
        {
          title: "SEO & Performance",
          points: ["On-page SEO practices", "Core performance tuning", "Cross-device testing and validation"],
          icon: Search,
        },
      ]}
      buildList={[
        { title: "Live web application", desc: "Ship a production-accessible app with clear architecture and UX flow.", icon: Cloud },
        { title: "Integration pipeline", desc: "Connect frontend to backend services with maintainable data flows.", icon: GitBranch },
        { title: "Quality validation package", desc: "Document performance, SEO, responsiveness, and release readiness outcomes.", icon: Gauge },
      ]}
      runDetails={[
        { title: "Weekly sprint cadence", desc: "Plan, build, review, and iterate with professional web product workflow discipline." },
        { title: "Quality checkpoints", desc: "Validate responsiveness, accessibility, API behavior, and deployment readiness each sprint." },
        { title: "Portfolio alignment", desc: "Shape deliverables for practical recruiter and hiring manager technical review." },
      ]}
      runBadges={["Responsive Web", "API Integration", "SEO + Performance"]}
      faqs={[
        {
          q: "Is this suitable for frontend-focused students?",
          a: "Yes. Frontend is a core focus, and backend/API integration is added for complete delivery skills.",
        },
        { q: "Do we deploy a live project?", a: "Yes. Deployment is part of the required final deliverable." },
        {
          q: "Will SEO and performance be practical?",
          a: "Yes. You apply concrete SEO and performance practices directly on your internship project.",
        },
      ]}
      ctaTitle="Ready to ship a production-ready web application with portfolio proof?"
      ctaText="Apply to join the next web development internship cohort and deliver a live project with documented technical outcomes."
    />
  );
}
