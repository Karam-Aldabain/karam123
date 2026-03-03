import React from "react";
import { Cloud, Database, Gauge, GitBranch, Smartphone, TestTube2, WandSparkles } from "lucide-react";
import StudentsGraduatesEngineeringTemplate from "./students-graduates-engineering-template";

export default function StudentsGraduatesMobileAppDevelopmentPage() {
  return (
    <StudentsGraduatesEngineeringTemplate
      programSlug="eng-mobile-app-development"
      tags={["Advanced", "Mobile Apps", "Cross-platform"]}
      heroGlow="rgba(52,211,153,0.22)"
      snapshot={{
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        rating: 4.8,
        deliverable: "Production-ready mobile app with deployment pipeline",
        deliverableBadges: ["Cross-platform build", "API integration", "Store-ready flow"],
        deliverableLabel: "Mobile release quality",
        includes: ["Functional Mobile Application", "Deployment Demo"],
        careerPaths: ["Mobile Developer", "React Native Developer", "App Engineer"],
        curriculumSubtitle: "Build, connect, test, and ship high-quality mobile products for real users.",
        portfolioSubtitle: "Show complete app development capability from UX flow to release pipeline.",
        runSubtitle: "Weekly app sprints with implementation checkpoints and quality validation.",
      }}
      curriculum={[
        { title: "Mobile Foundations", points: ["App architecture choices", "Navigation and state", "Platform constraints"], icon: Smartphone },
        { title: "API & Data Layer", points: ["Auth and session handling", "Offline-aware data flows", "Error and retry patterns"], icon: Database },
        { title: "Quality & Performance", points: ["Device testing strategy", "Performance profiling", "Stability improvements"], icon: TestTube2 },
        { title: "Delivery & Release", points: ["Build and signing flows", "CI/CD for mobile", "Release readiness checks"], icon: Cloud },
      ]}
      buildList={[
        { title: "Functional app", desc: "Deliver a working cross-platform application with real use cases.", icon: WandSparkles },
        { title: "Integrated backend flow", desc: "Connect app features to secure APIs and production-like data handling.", icon: GitBranch },
        { title: "Deployment demo", desc: "Show release workflow and quality benchmarks for production readiness.", icon: Gauge },
      ]}
      runDetails={[
        { title: "Weekly product iteration", desc: "Deliver app increments with technical and UX validation." },
        { title: "Engineering quality gates", desc: "Apply testing, performance checks, and review standards before release." },
        { title: "Mentor release reviews", desc: "Get actionable guidance on architecture and delivery decisions." },
      ]}
      runBadges={["Mobile UX", "API integration", "Release pipeline"]}
      faqs={[
        { q: "Will this cover both Android and iOS?", a: "Yes, the program focuses on cross-platform delivery and mobile-specific best practices." },
        { q: "Is deployment included?", a: "Yes, release preparation and deployment workflows are core outcomes." },
        { q: "What can I show after finishing?", a: "A working mobile app, integrated backend flow, and deployment demonstration." },
      ]}
      ctaTitle="Ready to ship a real mobile app portfolio?"
      ctaText="Apply now and build a production-ready mobile application with full delivery documentation."
    />
  );
}
