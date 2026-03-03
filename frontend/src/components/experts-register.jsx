import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Coins,
  CheckCircle2,
  CircleDollarSign,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileSpreadsheet,
  Globe2,
  Link as LinkIcon,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  Upload,
  UserRound,
} from "lucide-react";

const THEME = {
  deep: "#0B1220",
  sand: "#E9E7DF",
  pink: "#C91D67",
};

const STEPS = [
  { key: "basic", label: "Basic Info" },
  { key: "expert", label: "Expert Profile" },
  { key: "pricing", label: "Pricing & Monetization" },
  { key: "alignment", label: "Alignment & Compliance" },
  { key: "review", label: "Review & Submit" },
];

const CURRENCIES = ["EUR", "USD", "GBP", "AED", "EGP", "SAR", "Custom currency (manual approval)"];
const PRICING_MODELS = [
  "Fixed price per program",
  "Price per participant",
  "Hourly rate",
  "Price per cohort",
  "Corporate flat rate",
  "Revenue share model (for institutional partnerships)",
];
const DELIVERY_TYPES = ["Live", "Hybrid", "Recorded"];

const EXPERTISE_OPTIONS = [
  "Software Development",
  "AI & Machine Learning",
  "Data Science",
  "Cloud & DevOps",
  "Cybersecurity",
  "Digital Transformation",
  "Product Management",
  "UX/UI",
  "Business & Consulting",
  "Finance & FinTech",
  "Healthcare & Digital Health",
  "Marketing & Growth",
  "Entrepreneurship",
  "Supply Chain",
  "Project Management",
  "Other (Specify)",
];

const ENGAGEMENT_OPTIONS = [
  "Internship Supervision",
  "1-to-1 Mentorship",
  "Workshops & Masterclasses",
  "AI Training Programs",
  "Curriculum Co-Design",
  "Advisory Board",
  "Research Supervision",
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function isBlank(value) {
  if (typeof value === "string") return !value.trim();
  if (Array.isArray(value)) return value.length === 0;
  return !value;
}

export default function ExpertsRegisterPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showStepError, setShowStepError] = useState(false);

  const [basic, setBasic] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    orgName: "",
    position: "",
    linkedin: "",
    website: "",
  });

  const [expert, setExpert] = useState({
    expertise: [],
    expertiseOther: "",
    years: "",
    roleType: "",
    roleTypeOther: "",
    availability: "",
    engagement: [],
    delivery: "",
    hasMaterial: "",
    projectsDesc: "",
    portfolio: "",
    collaborationModel: "",
  });

  const [alignment, setAlignment] = useState({
    why: "",
    impact: "",
    confirm: false,
    contact: false,
    consent: false,
  });

  const [uploads, setUploads] = useState({
    photo: null,
    cv: null,
  });

  const [pricing, setPricing] = useState({
    defaultCurrency: "",
    customCurrency: "",
    pricingModels: [],

    durationWeeks: "",
    totalHours: "",
    hoursPerSession: "",
    numberOfSessions: "",
    deliveryType: "",

    earlyBirdDiscount: false,
    installmentEnabled: false,
    separateCorporatePricing: false,
    certificationFeeSeparate: false,
    groupDiscountEnabled: false,

    vatMode: "",
    vatNumber: "",
    taxRegistrationCountry: "",
  });

  const canContinue = useMemo(() => {
    if (step === 0) {
      return Boolean(
        basic.fullName &&
          basic.email &&
          basic.phone &&
          basic.country &&
          basic.orgName &&
          basic.position &&
          basic.linkedin
      );
    }
    if (step === 1) {
      const expertiseOtherValid = !expert.expertise.includes("Other (Specify)") || Boolean(expert.expertiseOther.trim());
      const roleTypeOtherValid = expert.roleType !== "Other" || Boolean(expert.roleTypeOther.trim());
      return Boolean(
        expert.expertise.length &&
          expertiseOtherValid &&
          expert.years &&
          expert.roleType &&
          roleTypeOtherValid &&
          expert.availability &&
          expert.engagement.length &&
          expert.delivery &&
          expert.hasMaterial &&
          expert.projectsDesc &&
          expert.portfolio &&
          expert.collaborationModel &&
          uploads.photo
      );
    }
    if (step === 2) {
      const currencyValid =
        pricing.defaultCurrency &&
        (pricing.defaultCurrency !== "Custom currency (manual approval)" || pricing.customCurrency.trim().length > 0);
      return Boolean(
        currencyValid &&
          pricing.pricingModels.length > 0 &&
          pricing.durationWeeks &&
          pricing.totalHours &&
          pricing.hoursPerSession &&
          pricing.numberOfSessions &&
          pricing.deliveryType &&
          pricing.vatMode &&
          pricing.taxRegistrationCountry
      );
    }
    if (step === 3) {
      return Boolean(alignment.confirm && alignment.contact && alignment.consent);
    }
    return true;
  }, [step, basic, expert, pricing, alignment, uploads]);

  const fieldErrors = useMemo(() => {
    if (!showStepError) return {};
    const errors = {};

    if (step === 0) {
      errors.fullName = isBlank(basic.fullName);
      errors.email = isBlank(basic.email);
      errors.phone = isBlank(basic.phone);
      errors.country = isBlank(basic.country);
      errors.orgName = isBlank(basic.orgName);
      errors.position = isBlank(basic.position);
      errors.linkedin = isBlank(basic.linkedin);
    }

    if (step === 1) {
      errors.expertise = isBlank(expert.expertise);
      errors.expertiseOther = expert.expertise.includes("Other (Specify)") && isBlank(expert.expertiseOther);
      errors.years = isBlank(expert.years);
      errors.roleType = isBlank(expert.roleType);
      errors.roleTypeOther = expert.roleType === "Other" && isBlank(expert.roleTypeOther);
      errors.availability = isBlank(expert.availability);
      errors.engagement = isBlank(expert.engagement);
      errors.delivery = isBlank(expert.delivery);
      errors.hasMaterial = isBlank(expert.hasMaterial);
      errors.projectsDesc = isBlank(expert.projectsDesc);
      errors.portfolio = isBlank(expert.portfolio);
      errors.collaborationModel = isBlank(expert.collaborationModel);
      errors.photo = !uploads.photo;
    }

    if (step === 2) {
      if (pricing.defaultCurrency === "Custom currency (manual approval)") {
        errors.customCurrency = isBlank(pricing.customCurrency);
      }
      errors.pricingModels = isBlank(pricing.pricingModels);
      errors.durationWeeks = isBlank(pricing.durationWeeks);
      errors.totalHours = isBlank(pricing.totalHours);
      errors.hoursPerSession = isBlank(pricing.hoursPerSession);
      errors.numberOfSessions = isBlank(pricing.numberOfSessions);
      errors.deliveryType = isBlank(pricing.deliveryType);
      errors.taxRegistrationCountry = isBlank(pricing.taxRegistrationCountry);
    }

    if (step === 3) {
      errors.confirm = !alignment.confirm;
      errors.contact = !alignment.contact;
      errors.consent = !alignment.consent;
    }

    return errors;
  }, [showStepError, step, basic, expert, pricing, alignment, uploads]);

  function next() {
    if (!canContinue) {
      setShowStepError(true);
      return;
    }
    setShowStepError(false);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setShowStepError(false);
    setStep((s) => Math.max(s - 1, 0));
  }

  function submit() {
    if (!canContinue) {
      setShowStepError(true);
      return;
    }
    setShowStepError(false);
    setSubmitted(true);
  }

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 8000);
    return () => clearTimeout(timer);
  }, [submitted]);

  return (
    <div className="expert-register-page min-h-screen px-4 py-8 sm:px-6" style={{ background: THEME.sand }}>
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[36px] bg-[#F3F3F1] p-6 ring-1 ring-black/5 sm:p-8">
          <h1 className="text-3xl font-semibold text-[#0B1220] sm:text-4xl">Expert Account Registration</h1>
          <p className="mt-2 text-sm text-[#0B1220]/65">
            Industry Expert / University Professor application form.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {STEPS.map((s, idx) => {
              const active = idx === step;
              const done = idx < step;
              const locked = idx > step;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => {
                    if (locked) {
                      setShowStepError(true);
                      return;
                    }
                    setShowStepError(false);
                    setStep(idx);
                  }}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 transition disabled:cursor-not-allowed"
                  disabled={locked}
                  aria-disabled={locked}
                  style={{
                    background: active
                      ? "linear-gradient(135deg, #C91D67 0%, #D84F92 100%)"
                      : done
                      ? "rgba(52,211,153,0.12)"
                      : "rgba(11,18,32,0.03)",
                    color: active ? "white" : done ? "#24B67A" : "rgba(11,18,32,0.55)",
                    borderColor: active ? "rgba(141,180,255,0.9)" : "rgba(141,180,255,0.9)",
                    opacity: locked ? 0.6 : 1,
                  }}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {s.label}
                </button>
              );
            })}
          </div>

          <div className="mt-7">
            {step === 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full Name" required error={fieldErrors.fullName}>
                  <Input error={fieldErrors.fullName} icon={UserRound} iconColor="#A78BFA" placeholder="Example: John Doe" value={basic.fullName} onChange={(e) => setBasic({ ...basic, fullName: e.target.value })} />
                </Field>
                <Field label="Email Address" required error={fieldErrors.email}>
                  <Input error={fieldErrors.email} type="email" spellCheck={false} icon={Mail} iconColor="#22D3EE" placeholder="Example: john.doe@email.com" value={basic.email} onChange={(e) => setBasic({ ...basic, email: e.target.value })} />
                </Field>
                <Field label="Phone Number" required error={fieldErrors.phone}>
                  <Input error={fieldErrors.phone} icon={Phone} iconColor="#34D399" placeholder="Example: +49 151 23456789" value={basic.phone} onChange={(e) => setBasic({ ...basic, phone: e.target.value })} />
                </Field>
                <Field label="Country of Residence" required error={fieldErrors.country}>
                  <Input error={fieldErrors.country} icon={MapPin} iconColor="#F59E0B" placeholder="Example: Germany" value={basic.country} onChange={(e) => setBasic({ ...basic, country: e.target.value })} />
                </Field>
                <Field label="Organization Name" required error={fieldErrors.orgName}>
                  <Input error={fieldErrors.orgName} icon={Building2} iconColor="#22D3EE" placeholder="Example: Berlin Tech University" value={basic.orgName} onChange={(e) => setBasic({ ...basic, orgName: e.target.value })} />
                </Field>
                <Field label="Current Position / Title" required error={fieldErrors.position}>
                  <Input error={fieldErrors.position} icon={Briefcase} iconColor="#34D399" placeholder="Example: Senior Data Scientist" value={basic.position} onChange={(e) => setBasic({ ...basic, position: e.target.value })} />
                </Field>
                <Field label="LinkedIn Profile URL" required error={fieldErrors.linkedin}>
                  <Input error={fieldErrors.linkedin} type="url" spellCheck={false} icon={LinkIcon} iconColor="#A78BFA" placeholder="Example: https://linkedin.com/in/johndoe" value={basic.linkedin} onChange={(e) => setBasic({ ...basic, linkedin: e.target.value })} />
                </Field>
                <Field label="Company / University Website">
                  <Input type="url" spellCheck={false} icon={Globe2} iconColor="#F59E0B" placeholder="Example: https://example.org" value={basic.website} onChange={(e) => setBasic({ ...basic, website: e.target.value })} />
                </Field>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Primary area of expertise" required hint="Multi-select" className="sm:col-span-2" error={fieldErrors.expertise}>
                  <MultiSelect
                    error={fieldErrors.expertise}
                    options={EXPERTISE_OPTIONS}
                    selected={expert.expertise}
                    onToggle={(value) =>
                      setExpert((prev) => ({
                        ...prev,
                        expertise: prev.expertise.includes(value)
                          ? prev.expertise.filter((x) => x !== value)
                          : [...prev.expertise, value],
                      }))
                    }
                  />
                </Field>
                {expert.expertise.includes("Other (Specify)") ? (
                  <Field label="Other expertise (please specify)" required className="sm:col-span-2" error={fieldErrors.expertiseOther}>
                    <Input
                      error={fieldErrors.expertiseOther}
                      icon={Briefcase}
                      iconColor="#A78BFA"
                      placeholder="Example: Quantum Computing"
                      value={expert.expertiseOther}
                      onChange={(e) => setExpert({ ...expert, expertiseOther: e.target.value })}
                    />
                  </Field>
                ) : null}

                <Field label="Years of professional experience" required error={fieldErrors.years}>
                  <Select error={fieldErrors.years} value={expert.years} onChange={(e) => setExpert({ ...expert, years: e.target.value })} options={["", "3-5", "5-10", "10-15", "15+"]} />
                </Field>
                <Field label="Role type" required error={fieldErrors.roleType}>
                  <Select error={fieldErrors.roleType} value={expert.roleType} onChange={(e) => setExpert({ ...expert, roleType: e.target.value })} options={["", "Industry Professional", "University Professor", "Consultant", "Executive", "Founder", "Other"]} />
                </Field>
                {expert.roleType === "Other" ? (
                  <Field label="Other role type (please specify)" required error={fieldErrors.roleTypeOther}>
                    <Input
                      error={fieldErrors.roleTypeOther}
                      icon={Briefcase}
                      iconColor="#A78BFA"
                      placeholder="Example: Research Architect"
                      value={expert.roleTypeOther}
                      onChange={(e) => setExpert({ ...expert, roleTypeOther: e.target.value })}
                    />
                  </Field>
                ) : null}
                <Field label="Weekly availability (hours)" required error={fieldErrors.availability}>
                  <Select error={fieldErrors.availability} value={expert.availability} onChange={(e) => setExpert({ ...expert, availability: e.target.value })} options={["", "2-4 Hours", "4-8 Hours", "8-12 Hours", "12+ Hours"]} />
                </Field>
                <Field label="Preferred engagement type" required hint="Multi-select" className="sm:col-span-2" error={fieldErrors.engagement}>
                  <MultiSelect
                    error={fieldErrors.engagement}
                    options={ENGAGEMENT_OPTIONS}
                    selected={expert.engagement}
                    onToggle={(value) =>
                      setExpert((prev) => ({
                        ...prev,
                        engagement: prev.engagement.includes(value)
                          ? prev.engagement.filter((x) => x !== value)
                          : [...prev.engagement, value],
                      }))
                    }
                  />
                </Field>
                <Field label="Delivery preference" required error={fieldErrors.delivery}>
                  <Select error={fieldErrors.delivery} value={expert.delivery} onChange={(e) => setExpert({ ...expert, delivery: e.target.value })} options={["", "Online", "Hybrid", "Onsite (Europe)", "Onsite (MENA)"]} />
                </Field>
                <Field label="Do you have existing training material?" required error={fieldErrors.hasMaterial}>
                  <Select error={fieldErrors.hasMaterial} value={expert.hasMaterial} onChange={(e) => setExpert({ ...expert, hasMaterial: e.target.value })} options={["", "Yes", "No", "Partially"]} />
                </Field>
                <Field label="Key projects (short description)" required className="sm:col-span-2" error={fieldErrors.projectsDesc}>
                  <textarea
                    rows={4}
                    value={expert.projectsDesc}
                    onChange={(e) => {
                      const input = e.target.value;
                      const limited = input.length > 300 ? input.slice(0, 300) : input;
                      setExpert({ ...expert, projectsDesc: limited });
                    }}
                    maxLength={300}
                    placeholder="Short description of key projects"
                    className={cn(textareaClass, fieldErrors.projectsDesc ? "expert-field-error" : "")}
                  />
                  <p className="mt-1 text-xs text-[#0B1220]/60">
                    {expert.projectsDesc.length} / 300 characters
                  </p>
                </Field>
                <Field label="Portfolio / personal website URL" required error={fieldErrors.portfolio}>
                  <Input error={fieldErrors.portfolio} type="url" spellCheck={false} icon={Globe2} iconColor="#34D399" placeholder="https://..." value={expert.portfolio} onChange={(e) => setExpert({ ...expert, portfolio: e.target.value })} />
                </Field>
                <Field label="Preferred collaboration model" required error={fieldErrors.collaborationModel}>
                  <Select error={fieldErrors.collaborationModel} value={expert.collaborationModel} onChange={(e) => setExpert({ ...expert, collaborationModel: e.target.value })} options={["", "Per Program", "Per Hour"]} />
                </Field>
                <Field label="Uploads" required className="sm:col-span-2" error={fieldErrors.photo} errorMessage="Professional photo is required.">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <FileBox
                      error={fieldErrors.photo}
                      label="Upload Professional Photo"
                      note="Required - Max 5MB"
                      fileName={uploads.photo?.name}
                      onChange={(file) => setUploads({ ...uploads, photo: file })}
                    />
                    <FileBox
                      label="Upload CV (PDF)"
                      note="Optional - Max 10MB"
                      fileName={uploads.cv?.name}
                      onChange={(file) => setUploads({ ...uploads, cv: file })}
                    />
                  </div>
                </Field>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-5">
                <div className="rounded-3xl bg-white/60 p-4 ring-1 ring-black/10">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0B1220]">
                    <CircleDollarSign className="h-4 w-4 text-[#22D3EE]" />
                    3.1 Default Currency
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Currency" required>
                      <Select
                        value={pricing.defaultCurrency}
                        onChange={(e) => setPricing({ ...pricing, defaultCurrency: e.target.value })}
                        options={["", ...CURRENCIES]}
                      />
                    </Field>
                    {pricing.defaultCurrency === "Custom currency (manual approval)" ? (
                      <Field label="Custom Currency Code" required error={fieldErrors.customCurrency}>
                        <Input
                          error={fieldErrors.customCurrency}
                          icon={Coins}
                          iconColor="#A78BFA"
                          placeholder="Example: JOD"
                          value={pricing.customCurrency}
                          onChange={(e) => setPricing({ ...pricing, customCurrency: e.target.value })}
                        />
                      </Field>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>

                <div className="rounded-3xl bg-white/60 p-4 ring-1 ring-black/10">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0B1220]">
                    <FileSpreadsheet className="h-4 w-4 text-[#F59E0B]" />
                    3.2 Pricing Model Options
                  </div>
                  <MultiSelect
                    error={fieldErrors.pricingModels}
                    options={PRICING_MODELS}
                    selected={pricing.pricingModels}
                    onToggle={(value) =>
                      setPricing((prev) => ({
                        ...prev,
                        pricingModels: prev.pricingModels.includes(value)
                          ? prev.pricingModels.filter((x) => x !== value)
                          : [...prev.pricingModels, value],
                      }))
                    }
                  />
                </div>

                <div className="rounded-3xl bg-white/60 p-4 ring-1 ring-black/10">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0B1220]">
                    <Clock3 className="h-4 w-4 text-[#34D399]" />
                    3.3 Duration Definition
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <Field label="Program duration (weeks)" required error={fieldErrors.durationWeeks}>
                      <Input
                        error={fieldErrors.durationWeeks}
                        icon={Clock3}
                        iconColor="#34D399"
                        placeholder="e.g. 8"
                        value={pricing.durationWeeks}
                        onChange={(e) => setPricing({ ...pricing, durationWeeks: e.target.value })}
                      />
                    </Field>
                    <Field label="Total hours" required error={fieldErrors.totalHours}>
                      <Input
                        error={fieldErrors.totalHours}
                        icon={Clock3}
                        iconColor="#34D399"
                        placeholder="e.g. 40"
                        value={pricing.totalHours}
                        onChange={(e) => setPricing({ ...pricing, totalHours: e.target.value })}
                      />
                    </Field>
                    <Field label="Hours per session" required error={fieldErrors.hoursPerSession}>
                      <Input
                        error={fieldErrors.hoursPerSession}
                        icon={Clock3}
                        iconColor="#34D399"
                        placeholder="e.g. 2"
                        value={pricing.hoursPerSession}
                        onChange={(e) => setPricing({ ...pricing, hoursPerSession: e.target.value })}
                      />
                    </Field>
                    <Field label="Number of sessions" required error={fieldErrors.numberOfSessions}>
                      <Input
                        error={fieldErrors.numberOfSessions}
                        icon={Clock3}
                        iconColor="#34D399"
                        placeholder="e.g. 20"
                        value={pricing.numberOfSessions}
                        onChange={(e) => setPricing({ ...pricing, numberOfSessions: e.target.value })}
                      />
                    </Field>
                    <Field label="Delivery type" required error={fieldErrors.deliveryType}>
                      <Select
                        error={fieldErrors.deliveryType}
                        value={pricing.deliveryType}
                        onChange={(e) => setPricing({ ...pricing, deliveryType: e.target.value })}
                        options={["", ...DELIVERY_TYPES]}
                      />
                    </Field>
                  </div>
                </div>

                <div className="rounded-3xl bg-white/60 p-4 ring-1 ring-black/10">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0B1220]">
                    <Briefcase className="h-4 w-4 text-[#A78BFA]" />
                    3.4 Advanced Pricing Options
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <CheckRow checked={pricing.earlyBirdDiscount} onChange={(v) => setPricing({ ...pricing, earlyBirdDiscount: v })} label="Early bird discount" />
                    <CheckRow checked={pricing.installmentEnabled} onChange={(v) => setPricing({ ...pricing, installmentEnabled: v })} label="Installment payment enabled" />
                    <CheckRow checked={pricing.separateCorporatePricing} onChange={(v) => setPricing({ ...pricing, separateCorporatePricing: v })} label="Corporate pricing separate from public pricing" />
                    <CheckRow checked={pricing.certificationFeeSeparate} onChange={(v) => setPricing({ ...pricing, certificationFeeSeparate: v })} label="Certification fee included or separate" />
                    <CheckRow checked={pricing.groupDiscountEnabled} onChange={(v) => setPricing({ ...pricing, groupDiscountEnabled: v })} label="Group discount enabled" />
                  </div>
                </div>

                <div className="rounded-3xl bg-white/60 p-4 ring-1 ring-black/10">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0B1220]">
                    <ReceiptText className="h-4 w-4 text-[#22D3EE]" />
                    3.5 Tax Handling
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="VAT handling" required>
                      <Select
                        value={pricing.vatMode}
                        onChange={(e) => setPricing({ ...pricing, vatMode: e.target.value })}
                        options={["", "VAT included in price", "VAT excluded"]}
                      />
                    </Field>
                    <Field label="VAT number (optional)">
                      <Input
                        icon={ReceiptText}
                        iconColor="#22D3EE"
                        placeholder="Optional VAT number"
                        value={pricing.vatNumber}
                        onChange={(e) => setPricing({ ...pricing, vatNumber: e.target.value })}
                      />
                    </Field>
                    <Field label="Country of tax registration" required error={fieldErrors.taxRegistrationCountry}>
                      <Input
                        error={fieldErrors.taxRegistrationCountry}
                        icon={MapPin}
                        iconColor="#F59E0B"
                        placeholder="Country"
                        value={pricing.taxRegistrationCountry}
                        onChange={(e) => setPricing({ ...pricing, taxRegistrationCountry: e.target.value })}
                      />
                    </Field>
                  </div>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4">
                <Field label="Why do you want to collaborate with Praktix?" error={fieldErrors.why}>
                  <textarea
                    rows={4}
                    value={alignment.why}
                    onChange={(e) => setAlignment({ ...alignment, why: e.target.value })}
                    placeholder="Explain motivation and collaboration goals."
                    className={cn(textareaClass, fieldErrors.why ? "expert-field-error" : "")}
                  />
                </Field>
                <Field label="What impact do you want to create?" error={fieldErrors.impact}>
                  <textarea
                    rows={4}
                    value={alignment.impact}
                    onChange={(e) => setAlignment({ ...alignment, impact: e.target.value })}
                    placeholder="Describe the impact you want to achieve (outcomes)."
                    className={cn(textareaClass, fieldErrors.impact ? "expert-field-error" : "")}
                  />
                </Field>
                <div className={cn("rounded-3xl bg-white/60 p-4 ring-1", fieldErrors.confirm || fieldErrors.contact || fieldErrors.consent ? "ring-[#C91D67]/50" : "ring-black/10")}>
                  <CheckRow error={fieldErrors.confirm} checked={alignment.confirm} onChange={(v) => setAlignment({ ...alignment, confirm: v })} label="I confirm the information provided is accurate." />
                  <CheckRow error={fieldErrors.contact} checked={alignment.contact} onChange={(v) => setAlignment({ ...alignment, contact: v })} label="I agree to be contacted regarding partnership opportunities." />
                  <CheckRow error={fieldErrors.consent} checked={alignment.consent} onChange={(v) => setAlignment({ ...alignment, consent: v })} label="I consent to data processing in accordance with the privacy policy." />
                </div>
              </div>
            ) : null}

            {step === 4 ? (
              <div className="rounded-3xl bg-white/60 p-6 ring-1 ring-black/10">
                {submitted ? (
                  <div className="rounded-2xl bg-emerald-500/10 p-4 ring-1 ring-emerald-400/30">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-semibold">Submitted successfully.</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm text-[#0B1220]/80">
                    <p><strong>Name:</strong> {basic.fullName || "--"}</p>
                    <p><strong>Email:</strong> {basic.email || "--"}</p>
                    <p><strong>Expertise:</strong> {expert.expertise.join(", ") || "--"}</p>
                    <p><strong>Engagement:</strong> {expert.engagement.join(", ") || "--"}</p>
                    <p><strong>Currency:</strong> {pricing.defaultCurrency}</p>
                    <p><strong>Pricing Models:</strong> {pricing.pricingModels.join(", ") || "--"}</p>
                    <p><strong>Duration:</strong> {pricing.durationWeeks || "--"} weeks / {pricing.totalHours || "--"} hours</p>
                    <p><strong>Tax:</strong> {pricing.vatMode} ({pricing.taxRegistrationCountry || "--"})</p>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <a href="/experts/value-proposition" className="text-sm font-semibold text-[#0B1220]/70 hover:text-[#0B1220]">
              Back to value proposition
            </a>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ring-1 disabled:opacity-40"
                style={{ borderColor: "rgba(141,180,255,0.9)", color: "rgba(11,18,32,0.75)" }}
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #C91D67 0%, #D84F92 100%)" }}
                >
                  Continue
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitted}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white disabled:opacity-45"
                  style={{ background: "linear-gradient(135deg, #C91D67 0%, #D84F92 100%)" }}
                >
                  Submit
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

        </div>

        <style>{`
          .expert-register-page input:not([type="file"]):not([type="checkbox"]),
          .expert-register-page textarea,
          .expert-register-page select {
            color: #000000 !important;
            -webkit-text-fill-color: #000000 !important;
            opacity: 1 !important;
            caret-color: #000000 !important;
          }
          .expert-register-page input:not([type="file"]):not([type="checkbox"]) {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
            border: 2px solid #ccc;
            border-radius: 6px;
            font-size: 14px;
            background-color: #fdfdfd;
            transition: all 0.3s ease;
          }
          .expert-register-page input.pl-11 {
            padding-left: 44px !important;
          }
          .expert-register-page input::placeholder,
          .expert-register-page textarea::placeholder {
            color: #b8c0cc !important;
            font-style: normal;
            opacity: 1 !important;
          }
          .expert-register-page input:not([type="file"]):not([type="checkbox"]):focus {
            border-color: #4a90e2;
            background-color: #eef6ff;
            outline: none;
            box-shadow: 0 0 6px rgba(74, 144, 226, 0.4);
          }
          .expert-register-page input[type="email"] {
            border-color: #6abf4b;
          }
          .expert-register-page input[type="password"] {
            border-color: #e26a6a;
          }
          .expert-register-page input[type="text"] {
            border-color: #4a90e2;
          }
          .expert-register-page .expert-field-error {
            border-color: #c91d67 !important;
            box-shadow: 0 0 0 1px rgba(201, 29, 103, 0.2) !important;
          }
          .expert-register-page .expert-field-error:focus {
            border-color: #c91d67 !important;
            background-color: #fff7fb !important;
            box-shadow: 0 0 0 3px rgba(201, 29, 103, 0.18) !important;
          }
          .expert-register-page input:-webkit-autofill,
          .expert-register-page input:-webkit-autofill:hover,
          .expert-register-page input:-webkit-autofill:focus {
            -webkit-text-fill-color: #000000 !important;
            box-shadow: 0 0 0px 1000px #ffffff inset !important;
            transition: background-color 5000s ease-in-out 0s;
          }
        `}</style>
      </div>
    </div>
  );
}

function Field({ label, required, hint, children, className = "", error = false, errorMessage = "This field is required." }) {
  return (
    <label className={cn("block", className)}>
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-semibold" style={{ color: "#111827", opacity: 1 }}>
          {label} {required ? <span style={{ color: THEME.pink, opacity: 1 }}>*</span> : null}
        </div>
        {hint ? <div className="text-xs" style={{ color: "rgba(17,24,39,0.7)", opacity: 1 }}>{hint}</div> : null}
      </div>
      {children}
      {error ? <p className="mt-1 text-xs font-medium text-[#C91D67]">{errorMessage}</p> : null}
    </label>
  );
}

function Input({ icon: Icon, iconColor = "#22D3EE", error = false, ...props }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
        <Icon className="h-4 w-4" style={{ color: iconColor }} />
      </span>
      <input {...props} className={cn(inputClass, "pl-11", error && "expert-field-error")} />
    </div>
  );
}

function Select({ options, value, error = false, ...props }) {
  return (
    <select
      {...props}
      value={value}
      className={cn(inputClass, error && "expert-field-error")}
      style={{ color: value ? "#000000" : "#9CA3AF", fontWeight: 500 }}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o || "Select"}
        </option>
      ))}
    </select>
  );
}

function MultiSelect({ options, selected, onToggle, error = false }) {
  return (
    <div className="rounded-3xl bg-white/40 p-4 ring-1" style={{ borderColor: error ? "rgba(201,29,103,0.55)" : "rgba(141,180,255,0.9)" }}>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = selected.includes(o);
          return (
            <button
              key={o}
              type="button"
              onClick={() => onToggle(o)}
              className="rounded-full px-4 py-2 text-sm font-semibold ring-1 transition"
              style={{
                background: active ? "rgba(201,29,103,0.14)" : "rgba(11,18,32,0.03)",
                color: active ? "#A52666" : "rgba(11,18,32,0.70)",
                borderColor: "rgba(141,180,255,0.9)",
              }}
            >
              {o}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-[#0B1220]/55">Select one or more.</p>
      {error ? <p className="mt-1 text-xs font-medium text-[#C91D67]">This field is required.</p> : null}
    </div>
  );
}

function FileBox({ label, note, fileName, onChange, error = false }) {
  return (
    <label className="rounded-3xl bg-white/40 p-4 ring-1" style={{ borderColor: error ? "rgba(201,29,103,0.55)" : "rgba(141,180,255,0.9)" }}>
      <input type="file" className="hidden" onChange={(e) => onChange(e.target.files?.[0] || null)} />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 ring-1 ring-[#8DB4FF]">
            <Upload className="h-5 w-5 text-[#34D399]" />
          </span>
          <div>
            <p className="text-base font-semibold text-[#1A2230]">{label}</p>
            <p className="text-sm text-[#0B1220]/55">{fileName || note}</p>
          </div>
        </div>
        <span className="rounded-full bg-white/60 px-4 py-1.5 text-sm font-semibold text-[#0B1220]/70 ring-1 ring-[#8DB4FF]">
          Choose
        </span>
      </div>
    </label>
  );
}

function CheckRow({ checked, onChange, label, error = false }) {
  return (
    <label className={cn("mb-3 flex items-center gap-3 rounded-2xl bg-white/55 px-4 py-3 ring-1", error ? "ring-[#C91D67]/55" : "ring-[#8DB4FF]")}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[#C91D67]" />
      <span className="text-sm text-[#1A2230]/80">{label}</span>
    </label>
  );
}

const inputClass =
  "w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition placeholder:text-[#9CA3AF] placeholder:italic focus:border-black/10 focus:ring-0";

const textareaClass =
  "w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition placeholder:text-[#9CA3AF] placeholder:italic focus:border-black/10 focus:ring-0";
