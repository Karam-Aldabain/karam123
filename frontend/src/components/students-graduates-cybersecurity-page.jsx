import React from "react";
import { Database, Gauge, GitBranch, Rocket, Shield, ShieldCheck, Skull } from "lucide-react";
import StudentsGraduatesEngineeringTemplate from "./students-graduates-engineering-template";

export default function StudentsGraduatesCybersecurityPage() {
  return (
    <StudentsGraduatesEngineeringTemplate
      programSlug="eng-cybersecurity"
      tags={["Advanced", "Cybersecurity", "System Defense"]}
      heroGlow="rgba(167,139,250,0.24)"
      snapshot={{
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        rating: 4.9,
        deliverable: "Security assessment report and hardened architecture baseline",
        deliverableBadges: ["Threat modeling", "Security audit", "Hardening plan"],
        deliverableLabel: "Security readiness",
        includes: ["Security Audit", "Hardened System Framework"],
        careerPaths: ["Cybersecurity Analyst", "Security Engineer", "SOC Associate"],
        curriculumSubtitle: "A practical path from foundational defense controls to full security review workflows.",
        portfolioSubtitle: "Security artifacts that show you can identify risks and implement concrete mitigations.",
        runSubtitle: "Weekly security checkpoints, risk reviews, and controlled testing cycles.",
      }}
      curriculum={[
        { title: "Core Security Principles", points: ["Threat landscape basics", "CIA triad in practice", "Secure design principles"], icon: Shield },
        { title: "Application Security", points: ["Auth and session hardening", "Input validation patterns", "Common vulnerability classes"], icon: Database },
        { title: "Assessment Workflows", points: ["Risk identification methods", "Structured audit process", "Prioritization and remediation"], icon: Skull },
        { title: "Security Operations", points: ["Monitoring and alerts", "Incident response basics", "Post-incident documentation"], icon: Gauge },
      ]}
      buildList={[
        { title: "Security baseline", desc: "Define and implement a hardened baseline for a target system.", icon: ShieldCheck },
        { title: "Audit package", desc: "Produce findings, severity rankings, and action-ready recommendations.", icon: GitBranch },
        { title: "Remediation roadmap", desc: "Plan practical fixes with timelines and ownership clarity.", icon: Rocket },
      ]}
      runDetails={[
        { title: "Weekly review rhythm", desc: "Assess vulnerabilities, implement controls, and review outcomes with mentors." },
        { title: "Evidence-driven decisions", desc: "Document every finding with risk impact and mitigation rationale." },
        { title: "Operational mindset", desc: "Train for reliability and response, not only detection." },
      ]}
      runBadges={["Security audit", "Hardening", "Risk control"]}
      faqs={[
        { q: "Is offensive testing included?", a: "You learn baseline penetration workflows focused on responsible and controlled assessment." },
        { q: "Do I need advanced networking first?", a: "No, essential networking and security context are built into the program flow." },
        { q: "What portfolio output will I have?", a: "A structured security report, hardening plan, and implementation evidence." },
      ]}
      ctaTitle="Ready to secure real systems with measurable outcomes?"
      ctaText="Apply to join the next cybersecurity cohort and deliver a complete audit and hardening package."
    />
  );
}
