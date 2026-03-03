import React from "react";
import { Boxes, Cloud, Database, Gauge, GitBranch, Rocket, ShieldCheck } from "lucide-react";
import StudentsGraduatesEngineeringTemplate from "./students-graduates-engineering-template";

export default function StudentsGraduatesDigitalTwinPage() {
  return (
    <StudentsGraduatesEngineeringTemplate
      programSlug="eng-digital-twin-engineering"
      tags={["Advanced", "Digital Twin", "Simulation"]}
      heroGlow="rgba(245,158,11,0.22)"
      snapshot={{
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        rating: 4.9,
        deliverable: "Digital twin prototype connected to real system signals",
        deliverableBadges: ["Signal integration", "Simulation model", "Executive demo"],
        deliverableLabel: "Validated twin output",
        includes: ["Functional Digital Twin Prototype", "Executive Demo Presentation"],
        careerPaths: ["Digital Twin Engineer", "IoT Solutions Engineer", "Simulation Analyst"],
        curriculumSubtitle: "From system modeling to real-time telemetry and optimization loops.",
        portfolioSubtitle: "A complete twin workflow that demonstrates technical and operational value.",
        runSubtitle: "Build, connect, validate, and present with mentor checkpoints each week.",
      }}
      curriculum={[
        { title: "Twin Fundamentals", points: ["System representation methods", "Digital/physical mapping", "State modeling basics"], icon: Boxes },
        { title: "IoT Data Integration", points: ["Telemetry ingestion", "Signal quality handling", "Device-to-cloud pipelines"], icon: Cloud },
        { title: "Simulation & Analytics", points: ["Scenario testing", "Predictive analysis", "Performance benchmarking"], icon: Database },
        { title: "Optimization & Monitoring", points: ["Feedback loops", "Operational KPIs", "Continuous tuning"], icon: Gauge },
      ]}
      buildList={[
        { title: "Twin prototype", desc: "Build a functioning digital twin for a real process or asset.", icon: Rocket },
        { title: "Connected data layer", desc: "Integrate live or historical signals into the model lifecycle.", icon: GitBranch },
        { title: "Validation report", desc: "Document model accuracy, constraints, and optimization impact.", icon: ShieldCheck },
      ]}
      runDetails={[
        { title: "Weekly iteration cycle", desc: "Model, test, evaluate, and improve through review loops." },
        { title: "Engineering validation", desc: "Measure simulation behavior against expected system outcomes." },
        { title: "Presentation readiness", desc: "Prepare executive-grade summaries and visual demonstrations." },
      ]}
      runBadges={["Simulation", "Telemetry", "Optimization"]}
      faqs={[
        { q: "Do I need prior IoT experience?", a: "Basic programming and data concepts are enough to start; IoT workflows are taught in-program." },
        { q: "Is this only theory?", a: "No, you build a working prototype and validate it with measurable outputs." },
        { q: "What can I show employers?", a: "A complete digital twin portfolio piece with architecture, data flow, and optimization results." },
      ]}
      ctaTitle="Ready to build a real digital twin system?"
      ctaText="Apply to join the next cohort and deliver a validated twin prototype with end-to-end technical documentation."
    />
  );
}
