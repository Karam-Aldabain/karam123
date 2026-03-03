import React from "react";
import { Brain, Database, Flame, Gauge, GitBranch, Rocket, Sparkles } from "lucide-react";
import StudentsGraduatesEngineeringTemplate from "./students-graduates-engineering-template";

export default function StudentsGraduatesAiMachineLearningPage() {
  return (
    <StudentsGraduatesEngineeringTemplate
      programSlug="eng-ai-and-machine-learning-internship"
      tags={["Advanced", "AI & ML", "Applied Models"]}
      heroGlow="rgba(167,139,250,0.24)"
      snapshot={{
        duration: "3-4 Months",
        intakes: "4 Intakes / Year",
        rating: 4.9,
        deliverable: "AI-powered application with model performance report",
        deliverableBadges: ["Model pipeline", "Inference optimization", "Performance report"],
        deliverableLabel: "AI deployment quality",
        includes: ["AI-Powered Application", "Model Performance Report"],
        careerPaths: ["AI Engineer", "ML Engineer", "Data Scientist"],
        curriculumSubtitle: "Move from model fundamentals to deployable ML systems with measurable performance.",
        portfolioSubtitle: "Show practical AI execution with deployment artifacts and model evaluation evidence.",
        runSubtitle: "Weekly model and product delivery cycles with mentor feedback and metric reviews.",
      }}
      curriculum={[
        { title: "ML Foundations", points: ["Problem framing for ML", "Feature and dataset thinking", "Evaluation metrics"], icon: Brain },
        { title: "Model Development", points: ["Training workflows", "Experiment tracking", "Model selection and tuning"], icon: Sparkles },
        { title: "Deployment & Inference", points: ["Model serving patterns", "Latency and throughput tuning", "Production integration"], icon: Flame },
        { title: "Monitoring & Iteration", points: ["Performance drift checks", "Error analysis", "Improvement roadmap"], icon: Gauge },
      ]}
      buildList={[
        { title: "AI application", desc: "Deliver an applied AI product that solves a realistic use case.", icon: Rocket },
        { title: "Model pipeline", desc: "Build end-to-end training and inference workflow with clear reproducibility.", icon: GitBranch },
        { title: "Performance report", desc: "Document model behavior, tradeoffs, and optimization outcomes.", icon: Database },
      ]}
      runDetails={[
        { title: "Weekly model checkpoints", desc: "Review experiments, evaluation metrics, and deployment readiness." },
        { title: "Practical engineering focus", desc: "Prioritize systems that can run reliably in product contexts." },
        { title: "Portfolio alignment", desc: "Package artifacts for technical interviews and hiring assessments." },
      ]}
      runBadges={["Modeling", "Deployment", "Evaluation"]}
      faqs={[
        { q: "Is this mostly research or practical build?", a: "It is practical-first: you train, deploy, and optimize applied AI solutions." },
        { q: "Do I need deep math background?", a: "Basic statistics and programming are enough to begin; the workflow is guided step-by-step." },
        { q: "What final proof will I have?", a: "An AI-powered application plus a clear performance and evaluation report." },
      ]}
      ctaTitle="Ready to ship an AI solution with measurable performance?"
      ctaText="Apply to the next AI & ML cohort and build a deployable model workflow with portfolio-ready evidence."
    />
  );
}
