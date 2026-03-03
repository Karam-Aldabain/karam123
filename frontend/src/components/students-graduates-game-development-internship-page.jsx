import React from "react";
import { Boxes, Gauge, Gamepad2, GitBranch, Rocket, Sparkles, TestTube2 } from "lucide-react";
import StudentsGraduatesEngineeringTemplate from "./students-graduates-engineering-template";

export default function StudentsGraduatesGameDevelopmentInternshipPage() {
  return (
    <StudentsGraduatesEngineeringTemplate
      programSlug="eng-game-development-internship"
      tags={["Professional", "Game Development", "Interactive Systems"]}
      heroGlow="rgba(245,158,11,0.24)"
      snapshot={{
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        rating: 4.7,
        deliverable: "Playable game prototype with optimized mechanics",
        deliverableBadges: ["Gameplay systems", "Performance tuning", "Demo build"],
        deliverableLabel: "Playable quality",
        includes: ["Playable Demo", "Game Prototype"],
        careerPaths: ["Game Developer", "Gameplay Programmer", "Technical Designer"],
        curriculumSubtitle: "Build interactive gameplay experiences with production-focused iteration and testing.",
        portfolioSubtitle: "A playable, review-ready game artifact with technical and design rationale.",
        runSubtitle: "Weekly development loops focused on mechanics, optimization, and playtest feedback.",
      }}
      curriculum={[
        { title: "Game Systems Basics", points: ["Core gameplay loops", "Input and control logic", "State management"], icon: Gamepad2 },
        { title: "Mechanics & Interaction", points: ["Physics and collisions", "Level interaction design", "Player feedback systems"], icon: Boxes },
        { title: "Optimization & Stability", points: ["Frame-time analysis", "Memory/performance tuning", "Debugging workflows"], icon: Gauge },
        { title: "Testing & Iteration", points: ["Playtesting process", "Issue prioritization", "Balancing and polish"], icon: TestTube2 },
      ]}
      buildList={[
        { title: "Playable prototype", desc: "Develop a complete game slice with core mechanics and objective flow.", icon: Rocket },
        { title: "Performance pass", desc: "Optimize gameplay and runtime stability under realistic constraints.", icon: Sparkles },
        { title: "Technical review package", desc: "Document design and implementation tradeoffs for portfolio value.", icon: GitBranch },
      ]}
      runDetails={[
        { title: "Sprint-based production", desc: "Ship playable increments each week with defined goals and review criteria." },
        { title: "Mentor quality feedback", desc: "Get practical guidance on mechanics, architecture, and optimization." },
        { title: "Demo readiness focus", desc: "Prepare deliverables for technical and non-technical stakeholders." },
      ]}
      runBadges={["Gameplay", "Optimization", "Playtesting"]}
      faqs={[
        { q: "Do I need advanced game engine knowledge first?", a: "Basic coding helps; core game development workflows are taught during the internship." },
        { q: "Will I make a full game?", a: "You build a polished playable prototype with strong engineering and design fundamentals." },
        { q: "What is the final output?", a: "A demonstrable game prototype, performance notes, and technical documentation." },
      ]}
      ctaTitle="Ready to build a playable game prototype with production quality?"
      ctaText="Apply now and deliver an interactive game experience with optimization and portfolio-ready documentation."
    />
  );
}
