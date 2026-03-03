import React from "react";
import { Cloud, Gauge, GitBranch, Globe2, LayoutTemplate, Search, Server } from "lucide-react";
import StudentsGraduatesEngineeringTemplate from "./students-graduates-engineering-template";

export default function StudentsGraduatesWebDevelopmentInternshipPage() {
  return (
    <StudentsGraduatesEngineeringTemplate
      programSlug="eng-web-development-internship"
      tags={["Professional", "Web Development", "Frontend + CMS"]}
      heroGlow="rgba(34,211,238,0.22)"
      snapshot={{
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        rating: 4.7,
        deliverable: "Live website with cross-device validation and CMS setup",
        deliverableBadges: ["Responsive build", "CMS integration", "SEO baseline"],
        deliverableLabel: "Web delivery quality",
        includes: ["Live Website", "CMS Deployment"],
        careerPaths: ["Web Developer", "Frontend Developer", "CMS Specialist"],
        curriculumSubtitle: "Build modern web experiences that are responsive, maintainable, and publish-ready.",
        portfolioSubtitle: "Demonstrate end-to-end web project delivery with deployment and optimization.",
        runSubtitle: "A practical internship workflow with weekly build reviews and publishing milestones.",
      }}
      curriculum={[
        { title: "Web Foundations", points: ["HTML/CSS/JS quality patterns", "Component-based UI structure", "Accessibility basics"], icon: LayoutTemplate },
        { title: "Backend Integration", points: ["API-driven pages", "Form and content flows", "Error handling basics"], icon: Server },
        { title: "CMS Workflows", points: ["Content modeling", "Authoring and publishing", "Maintainable update process"], icon: Globe2 },
        { title: "SEO & Optimization", points: ["On-page SEO practices", "Performance tuning", "Cross-device validation"], icon: Search },
      ]}
      buildList={[
        { title: "Live website", desc: "Ship a production-accessible website with clear structure and UX flow.", icon: Cloud },
        { title: "CMS pipeline", desc: "Integrate and configure content workflows for maintainable publishing.", icon: GitBranch },
        { title: "Validation package", desc: "Document performance, SEO, and responsiveness outcomes.", icon: Gauge },
      ]}
      runDetails={[
        { title: "Weekly delivery cadence", desc: "Plan, build, review, and iterate with professional web workflow discipline." },
        { title: "Quality checkpoints", desc: "Validate responsiveness, accessibility, and deployment readiness each sprint." },
        { title: "Portfolio alignment", desc: "Shape deliverables for real recruiter and hiring manager review." },
      ]}
      runBadges={["Responsive web", "CMS", "SEO"]}
      faqs={[
        { q: "Is this suitable for frontend-focused students?", a: "Yes, frontend is central, while backend and CMS integration are covered for complete delivery skills." },
        { q: "Do we deploy live?", a: "Yes, deployment is part of the required final output." },
        { q: "Will SEO be practical?", a: "Yes, you apply concrete SEO and performance practices on your project." },
      ]}
      ctaTitle="Ready to launch a live web project with portfolio proof?"
      ctaText="Apply to join the next web internship cohort and publish a production-ready website with documented results."
    />
  );
}
