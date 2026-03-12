import React, { useState, useMemo, useEffect } from "react";
import {
  ArrowRight,
  Users,
  ShieldCheck,
  BarChart3,
  Rocket,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Mail,
  Phone,
  MapPin,
  Building2,
  Briefcase,
  LinkIcon,
  Globe2,
  Compass,
  Calendar,
  Zap,
  Upload,
  Star,
  Handshake,
  CheckCircle
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import apiClient from "../api/api";

const THEME = {
  deep: "#0B1220",
  sand: "#E9E7DF",
  pink: "#C91D67",
  accent: "#C51F5D",
  accent2: "#356BB0",
  accent3: "#0D9488",
  accent4: "#7C3AED",
  star: "#F59E0B",
  error: "#EF4444"
};

const DARK_SECTION_BG = "rgba(11,18,32,1)";

const iconStrongProps = { strokeWidth: 2.2 };

const accent = (opacity = 1) => `rgba(197,31,93,${opacity})`;

// --- UTILS ---
function cx(...args) {
  return args.filter(Boolean).join(" ");
}

function clampStyle(lines = 2) {
  return {
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };
}

/** ---------------- SUBCOMPONENTS ---------------- */
function IconBadge({ children, color, className }) {
  return (
    <div
      className={cx("flex h-11 w-11 items-center justify-center rounded-2xl ring-1", className)}
      style={{
        background: `linear-gradient(135deg, ${color} 0%, rgba(255,255,255,0.05) 150%)`,
        borderColor: "rgba(255,255,255,0.12)",
        boxShadow: `0 8px 20px -6px ${color}80`,
        color: "white",
      }}
    >
      {children}
    </div>
  );
}

function FieldError({ error }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mt-1.5 flex items-center gap-1.5 px-2 text-xs font-semibold"
      style={{ color: THEME.error }}
    >
      <div className="h-1 w-1 rounded-full bg-current" />
      {error}
    </motion.div>
  );
}

function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="bg-white/50 backdrop-blur rounded-[32px] p-8 ring-1 ring-black/5 hover:ring-[#C91D67]/20 transition-all group">
      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm mb-4 mx-auto group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6" style={{ color: THEME.pink }} />
      </div>
      <h3 className="text-lg font-bold text-[#0B1220] mb-2">{title}</h3>
      <p className="text-sm text-[#0B1220]/60 leading-relaxed">{desc}</p>
    </div>
  );
}

function FormCard({ title, icon, tone = "light", children }) {
  const isDark = tone === "dark";
  const isGrad = tone === "gradient";

  return (
    <div
      className={cx("relative overflow-hidden rounded-[36px] p-7 ring-1")}
      style={{
        background: isGrad
          ? `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.55)} 100%)`
          : isDark
            ? "linear-gradient(135deg, #061A3B 0%, #0A2A4F 100%)"
            : "rgba(255,255,255,0.55)",
        borderColor: isGrad || isDark ? "rgba(255,255,255,0.12)" : "rgba(11,18,32,0.10)",
      }}
    >
      <div className="relative">
        <div className="flex items-center gap-3">
          <div
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{
              background: isGrad || isDark ? "rgba(255,255,255,0.12)" : "rgba(11,18,32,0.05)",
              border: isGrad || isDark ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(11,18,32,0.10)",
              color: isGrad || isDark ? "rgba(255,255,255,0.95)" : THEME.accent,
            }}
          >
            {icon}
          </div>
          <div>
            <div className={cx("text-xs font-semibold tracking-widest", isGrad || isDark ? "text-white/70" : "text-[#0B1220]/55")}>
              SECTION
            </div>
            <div className={cx("mt-1 text-lg font-semibold", isGrad || isDark ? "text-white" : "text-[#0B1220]")}>
              {title}
            </div>
          </div>
        </div>
        <div className={cx("mt-6", isGrad || isDark ? "text-white" : "text-[#0B1220]")}>{children}</div>
      </div>
    </div>
  );
}

function Field({ label, required, hint, children, className, error }) {
  return (
    <div className={cx("group block", className)}>
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-semibold text-[#0B1220]">
          {label} {required ? <span style={{ color: THEME.pink }}>*</span> : null}
        </div>
        {hint ? <div className="text-xs text-[#0B1220]/55">{hint}</div> : null}
      </div>
      <div className="relative">
        {children}
        <AnimatePresence>
          {error && <FieldError error={error} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Input({ icon: Icon, iconColor = THEME.accent, className, error, ...props }) {
  const hasIcon = !!Icon;
  return (
    <div className="relative">
      {hasIcon ? (
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
          <Icon className="h-4 w-4" style={{ color: error ? THEME.error : iconColor }} {...iconStrongProps} />
        </div>
      ) : null}
      <input
        {...props}
        className={cx(
          "w-full rounded-2xl px-4 py-3 text-sm outline-none ring-1 transition",
          "bg-white/60 text-[#0B1220] placeholder:text-[#0B1220]/40",
          error
            ? "ring-red-300 hover:ring-red-400 focus:ring-2 focus:ring-red-400 bg-red-50/30"
            : "ring-[#0B1220]/10 hover:ring-[#0B1220]/20 focus:ring-2 focus:ring-[rgba(34,211,238,0.35)]",
          hasIcon ? "pl-11" : "",
          className
        )}
      />
    </div>
  );
}

function Textarea({ error, ...props }) {
  return (
    <textarea
      {...props}
      className={cx(
        "w-full rounded-2xl px-4 py-3 text-sm outline-none ring-1 transition",
        "bg-white/60 text-[#0B1220] placeholder:text-[#0B1220]/40",
        error
          ? "ring-red-300 hover:ring-red-400 focus:ring-2 focus:ring-red-400 bg-red-50/30"
          : "ring-[#0B1220]/10 hover:ring-[#0B1220]/20 focus:ring-2 focus:ring-[rgba(34,211,238,0.35)]"
      )}
      rows={4}
    />
  );
}

function Select({ value, onChange, onBlur, options, icon: Icon, iconColor = THEME.accent, placeholder = "Select", error }) {
  const hasIcon = !!Icon;
  return (
    <div className="relative">
      {hasIcon ? (
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
          <Icon className="h-4 w-4" style={{ color: error ? THEME.error : iconColor }} {...iconStrongProps} />
        </div>
      ) : null}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={cx(
          "w-full appearance-none rounded-2xl px-4 py-3 pr-10 text-sm outline-none ring-1 transition",
          "bg-white/60 text-[#0B1220]",
          error
            ? "ring-red-300 hover:ring-red-400 focus:ring-2 focus:ring-red-400 bg-red-50/30"
            : "ring-[#0B1220]/10 hover:ring-[#0B1220]/20 focus:ring-2 focus:ring-[rgba(34,211,238,0.35)]",
          hasIcon ? "pl-11" : ""
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0B1220]/55">
        <ChevronRight className="h-4 w-4 rotate-90" {...iconStrongProps} />
      </div>
    </div>
  );
}

function Checkbox({ checked, onChange, label, onBlur, error }) {
  return (
    <label
      className="flex cursor-pointer items-start gap-3 rounded-3xl p-4 ring-1 transition"
      style={{
        background: error ? "rgba(239,68,68,0.04)" : "rgba(255,255,255,0.60)",
        borderColor: error ? "rgba(239,68,68,0.30)" : "rgba(11,18,32,0.10)",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        onBlur={onBlur}
        className="mt-1 h-4 w-4 accent-[#C91D67]"
      />
      <div className={cx("text-sm", error ? "text-red-600" : "text-[#0B1220]/75")}>{label}</div>
    </label>
  );
}

function MultiSelect({
  value,
  onChange,
  options,
  otherValue = "",
  onOtherValueChange = () => null,
  otherOptionLabel = "Other (Specify)",
  onBlur,
  error,
}) {
  const showOtherInput = value.includes(otherOptionLabel);
  return (
    <div
      className="rounded-3xl p-4 ring-1 transition"
      style={{
        background: error ? "rgba(239,68,68,0.04)" : "rgba(255,255,255,0.60)",
        borderColor: error ? "rgba(239,68,68,0.30)" : "rgba(11,18,32,0.10)",
      }}
    >
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value.includes(o);
          return (
            <button
              key={o}
              type="button"
              onClick={() => {
                onChange(active ? value.filter((x) => x !== o) : [...value, o]);
                if (onBlur) onBlur();
              }}
              className="rounded-full px-3 py-2 text-xs font-semibold ring-1 transition"
              style={{
                background: active
                  ? `linear-gradient(135deg, ${THEME.pink} 0%, ${accent(0.35)} 100%)`
                  : "rgba(11,18,32,0.06)",
                borderColor: active ? "rgba(11,18,32,0.10)" : "rgba(11,18,32,0.12)",
                color: active ? "white" : "rgba(11,18,32,0.72)",
              }}
            >
              {o}
            </button>
          );
        })}
      </div>
      {showOtherInput ? (
        <div className="mt-3">
          <input
            type="text"
            value={otherValue}
            onChange={(e) => onOtherValueChange(e.target.value)}
            placeholder="Please specify"
            className="w-full rounded-xl px-3 py-2 text-xs outline-none ring-1 transition bg-white/70 text-[#0B1220] placeholder:text-[#0B1220]/40 ring-[#0B1220]/10 hover:ring-[#0B1220]/20 focus:ring-2 focus:ring-[rgba(34,211,238,0.35)]"
          />
        </div>
      ) : null}
    </div>
  );
}

function FilePicker({ label, id, fileName, onChange, accept, maxSize, required, error }) {
  return (
    <div className="relative">
      <input
        id={id}
        type="file"
        className="hidden"
        onChange={onChange}
        accept={accept}
      />
      <label
        htmlFor={id}
        className="group relative flex min-h-[132px] cursor-pointer flex-col items-start justify-between rounded-2xl px-4 py-4 ring-1 transition"
        style={{
          background: error ? "rgba(239,68,68,0.04)" : "rgba(255,255,255,0.60)",
          borderColor: error ? "rgba(239,68,68,0.30)" : "rgba(11,18,32,0.10)",
        }}
      >
        <div className="flex items-start gap-3 w-full">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl ring-1 shrink-0"
            style={{
              background: "rgba(11,18,32,0.05)",
              borderColor: "rgba(11,18,32,0.10)",
            }}
          >
            <Upload className="h-4 w-4" style={{ color: error ? THEME.error : THEME.accent3 }} {...iconStrongProps} />
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-[#0B1220]">
              {label} {required && <span style={{ color: THEME.pink }}>*</span>}
            </div>
            <div className="text-xs text-[#0B1220]/55">
              {fileName ? (
                <span className="truncate block" title={fileName}>
                  Selected: {fileName}
                </span>
              ) : (
                `${required ? "Required" : "Optional"} — Max ${maxSize}`
              )}
            </div>
          </div>
        </div>
        <span
          className="self-end rounded-full px-3 py-1 text-xs font-semibold ring-1 mt-2"
          style={{
            background: "rgba(11,18,32,0.06)",
            borderColor: "rgba(11,18,32,0.10)",
            color: "rgba(11,18,32,0.70)",
          }}
        >
          {fileName ? 'Change' : 'Choose'}
        </span>
      </label>
    </div>
  );
}

function FileRow({ onProfileImageChange, onCvFileChange, profileImageError }) {
  const [profileImageName, setProfileImageName] = useState('');
  const [cvFileName, setCvFileName] = useState('');

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageName(file.name);
      onProfileImageChange(file);
    }
  };

  const handleCvFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvFileName(file.name);
      onCvFileChange(file);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div>
        <FilePicker
          label="Professional Photo"
          id="profile_image_upload"
          fileName={profileImageName}
          onChange={handleProfileImageChange}
          accept="image/jpeg,image/png,image/jpg"
          maxSize="5MB"
          required
          error={!!profileImageError}
        />
      </div>
      <FilePicker
        label="CV (PDF)"
        id="cv_file_upload"
        fileName={cvFileName}
        onChange={handleCvFileChange}
        accept=".pdf,.doc,.docx"
        maxSize="10MB"
        required
      />
    </div>
  );
}

function MiniKV({ k, v }) {
  return (
    <div className="rounded-3xl bg-white/60 p-4 ring-1 ring-[#0B1220]/10">
      <div className="text-xs font-semibold tracking-widest text-[#0B1220]/55">{k}</div>
      <div className="mt-1 text-sm font-semibold text-[#0B1220]/80" style={clampStyle(2)}>
        {v}
      </div>
    </div>
  );
}

/** ---------------- FORM WIZARD ---------------- */
function FormWizard({ authUser }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [applicationId, setApplicationId] = useState(null);

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);

  const [basic, setBasic] = useState({
    fullName: authUser?.name || "",
    email: authUser?.email || "",
    phone: authUser?.phone || "",
    country: "",
    orgName: authUser?.company || "",
    position: "",
    linkedin: "",
    website: "",
  });

  const [expert, setExpert] = useState({
    expertise: [],
    expertiseOther: "",
    years: "",
    roleType: "",
    availability: "",
    engagement: [],
    delivery: "",
    travel: false,
    hasMaterial: "",
    contentTypes: [],
    coDesign: false,
    ledProjects: false,
    projectsDesc: "",
    references: false,
    portfolio: "",
    scholar: "",
    compensation: "",
    longTerm: false,
  });

  const [alignment, setAlignment] = useState({
    why: "",
    impact: "",
    confirm: false,
    contact: false,
    consent: false,
  });

  const steps = useMemo(() => [
    { key: "basic", label: "Basic Info" },
    { key: "expertise", label: "Expertise" },
    { key: "engagement", label: "Engagement" },
    { key: "projects", label: "Projects" },
    { key: "alignment", label: "Alignment" },
    { key: "files", label: "Documentation" },
    { key: "review", label: "Review" },
  ], []);

  const pct = Math.round(((step + 1) / steps.length) * 100);

  const validateStep = (key) => {
    const errs = {};
    if (key === "basic") {
      if (!basic.fullName?.trim()) errs.fullName = "Full name is required";
      if (!basic.email?.trim()) errs.email = "Email is required";
      if (!basic.phone?.trim()) errs.phone = "Phone is required";
      if (!basic.country?.trim()) errs.country = "Country is required";
      if (!basic.linkedin?.trim()) errs.linkedin = "LinkedIn is required";
    } else if (key === "expertise") {
      if (!expert.expertise.length) errs.expertise = "Select at least one area";
      if (!expert.years) errs.years = "Required";
      if (!expert.roleType) errs.roleType = "Required";
    } else if (key === "engagement") {
      if (!expert.availability) errs.availability = "Required";
      if (!expert.engagement.length) errs.engagement = "Select engagement type";
      if (!expert.delivery) errs.delivery = "Required";
    } else if (key === "alignment") {
      if (!alignment.confirm) errs.confirm = "Required";
      if (!alignment.contact) errs.contact = "Required";
      if (!alignment.consent) errs.consent = "Required";
    }
    return errs;
  };

  function next() {
    const errs = validateStep(steps[step].key);
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    setStep(s => Math.min(steps.length - 1, s + 1));
  }

  function back() {
    setStep(s => Math.max(0, s - 1));
    setFieldErrors({});
  }

  async function submit() {
    setLoading(true);
    const formData = new FormData();
    formData.append("applicantType", "Industry Expert / University Professor");

    // Basic
    Object.keys(basic).forEach(k => formData.append(`basic[${k}]`, basic[k]));

    // Expert
    Object.keys(expert).forEach(k => {
      if (Array.isArray(expert[k])) {
        expert[k].forEach((v, i) => formData.append(`expert[${k}][${i}]`, v));
      } else {
        formData.append(`expert[${k}]`, expert[k]);
      }
    });

    // Alignment
    Object.keys(alignment).forEach(k => formData.append(`alignment[${k}]`, alignment[k] ? "1" : "0"));
    formData.append("alignment[why]", alignment.why);
    formData.append("alignment[impact]", alignment.impact);

    if (profileImageFile) formData.append("profile_image", profileImageFile);
    if (cvFile) formData.append("cv_file", cvFile);

    try {
      const response = await apiClient.post("/experts/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (response.status === 201) {
        setSubmitted(true);
        setApplicationId(response.data.application_id);
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data?.errors) setFieldErrors(error.response.data.errors);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="py-20 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-[#0B1220] mb-4">Application Received!</h2>
        <p className="text-[#0B1220]/70 mb-8 max-w-md mx-auto">
          Thank you for applying to the Praktix Expert Network. Your application ID is <span className="font-bold">#{applicationId}</span>.
          Our team will review your profile and get back to you within 3-5 business days.
        </p>
        <Link to="/experts/dashboard" className="font-bold text-[#C91D67] hover:underline">Go to Expert Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="relative overflow-hidden rounded-[42px] p-[1px]" style={{ background: "#FFFFFF", boxShadow: "0 26px 90px rgba(0,0,0,0.12)" }}>
        <div className="relative rounded-[40px] bg-white/55 p-6 sm:p-8 ring-1 ring-[#0B1220]/10 backdrop-blur">
          {/* Progress */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8">
            <div>
              <div className="mt-1 text-2xl font-semibold text-[#0B1220]">Expert Registration</div>
              <p className="mt-1 text-sm text-[#0B1220]/60">Share your expertise with the next generation.</p>
            </div>
            <div className="w-full sm:w-[240px]">
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#0B1220]/10">
                <motion.div className="h-full bg-[#C91D67]" animate={{ width: `${pct}%` }} />
              </div>
              <div className="mt-2 text-xs text-[#0B1220]/60 text-right">Step {step + 1} of {steps.length}</div>
            </div>
          </div>

          {/* Form Content */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {steps[step].key === "basic" && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Full Name" required error={fieldErrors.fullName}><Input value={basic.fullName} onChange={e => setBasic({ ...basic, fullName: e.target.value })} icon={Users} /></Field>
                  <Field label="Email Address" required error={fieldErrors.email}><Input value={basic.email} onChange={e => setBasic({ ...basic, email: e.target.value })} icon={Mail} /></Field>
                  <Field label="Phone" required error={fieldErrors.phone}><Input value={basic.phone} onChange={e => setBasic({ ...basic, phone: e.target.value })} icon={Phone} /></Field>
                  <Field label="Country" required error={fieldErrors.country}><Input value={basic.country} onChange={e => setBasic({ ...basic, country: e.target.value })} icon={MapPin} /></Field>
                  <Field label="Organization" error={fieldErrors.orgName}><Input value={basic.orgName} onChange={e => setBasic({ ...basic, orgName: e.target.value })} icon={Building2} /></Field>
                  <Field label="Position" error={fieldErrors.position}><Input value={basic.position} onChange={e => setBasic({ ...basic, position: e.target.value })} icon={Briefcase} /></Field>
                  <Field label="LinkedIn" required error={fieldErrors.linkedin}><Input value={basic.linkedin} onChange={e => setBasic({ ...basic, linkedin: e.target.value })} icon={LinkIcon} /></Field>
                  <Field label="Website" error={fieldErrors.website}><Input value={basic.website} onChange={e => setBasic({ ...basic, website: e.target.value })} icon={Globe2} /></Field>
                </motion.div>
              )}

              {steps[step].key === "expertise" && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                  <Field label="Areas of Expertise" required error={fieldErrors.expertise}>
                    <MultiSelect
                      value={expert.expertise}
                      options={["AI/ML", "Software Dev", "Data Science", "Marketing", "Business Strategy", "Design", "Fintech", "Cybersecurity", "Other (Specify)"]}
                      onChange={v => setExpert({ ...expert, expertise: v })}
                      otherValue={expert.expertiseOther}
                      onOtherValueChange={v => setExpert({ ...expert, expertiseOther: v })}
                    />
                  </Field>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Years of Experience" required error={fieldErrors.years}>
                      <Select value={expert.years} onChange={v => setExpert({ ...expert, years: v })} options={["1-3", "4-7", "8-12", "12+"]} />
                    </Field>
                    <Field label="Role Type" required error={fieldErrors.roleType}>
                      <Select value={expert.roleType} onChange={v => setExpert({ ...expert, roleType: v })} options={["Industry Professional", "Academic / Professor", "Researcher", "Founder", "Consultant"]} />
                    </Field>
                  </div>
                </motion.div>
              )}

              {steps[step].key === "engagement" && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                  <Field label="Engagement Type" required error={fieldErrors.engagement}>
                    <MultiSelect value={expert.engagement} onChange={v => setExpert({ ...expert, engagement: v })} options={["Mentorship", "Guest Lectures", "Project Review", "Program Design", "Industry Workshops"]} />
                  </Field>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Availability (Hours/Week)" required error={fieldErrors.availability}><Select value={expert.availability} onChange={v => setExpert({ ...expert, availability: v })} options={["1-2 hours", "3-5 hours", "5-10 hours", "Over 10 hours"]} /></Field>
                    <Field label="Delivery Preference" required error={fieldErrors.delivery}><Select value={expert.delivery} onChange={v => setExpert({ ...expert, delivery: v })} options={["Remote", "On-site", "Hybrid"]} /></Field>
                  </div>
                  <Checkbox checked={expert.travel} onChange={v => setExpert({ ...expert, travel: v })} label="Willing to travel for engagements" />
                </motion.div>
              )}

              {steps[step].key === "projects" && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                  <Checkbox checked={expert.ledProjects} onChange={v => setExpert({ ...expert, ledProjects: v })} label="Have you led industrial or research projects before?" />
                  <AnimatePresence>
                    {expert.ledProjects && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                        <Field label="Briefly describe key projects led"><Textarea value={expert.projectsDesc} onChange={e => setExpert({ ...expert, projectsDesc: e.target.value })} /></Field>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <Checkbox checked={expert.coDesign} onChange={v => setExpert({ ...expert, coDesign: v })} label="Willing to co-design learning materials?" />
                </motion.div>
              )}

              {steps[step].key === "alignment" && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                  <Field label="Why join Praktix?"><Textarea value={alignment.why} onChange={e => setAlignment({ ...alignment, why: e.target.value })} /></Field>
                  <div className="space-y-2">
                    <Checkbox checked={alignment.confirm} onChange={v => setAlignment({ ...alignment, confirm: v })} label="I confirm the info is accurate" error={!!fieldErrors.confirm} />
                    <Checkbox checked={alignment.contact} onChange={v => setAlignment({ ...alignment, contact: v })} label="I agree to be contacted" error={!!fieldErrors.contact} />
                    <Checkbox checked={alignment.consent} onChange={v => setAlignment({ ...alignment, consent: v })} label="I consent to data processing" error={!!fieldErrors.consent} />
                  </div>
                </motion.div>
              )}

              {steps[step].key === "files" && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                  <FormCard title="Documentation" icon={<Upload className="w-5 h-5" />}>
                    <FileRow onProfileImageChange={setProfileImageFile} onCvFileChange={setCvFile} profileImageError={fieldErrors.profile_image} />
                  </FormCard>
                </motion.div>
              )}

              {steps[step].key === "review" && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <MiniKV k="Name" v={basic.fullName} />
                    <MiniKV k="Expertise" v={expert.expertise.join(", ")} />
                    <MiniKV k="Role" v={expert.roleType} />
                    <MiniKV k="Exp" v={expert.years + " years"} />
                  </div>
                  <div className="rounded-3xl bg-[#0B1220]/5 p-5 text-sm">
                    <div className="font-bold mb-2">Almost there!</div>
                    Please review all your details. By submitting, you become part of our active expert candidate pool.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-10 flex justify-between">
            <button onClick={back} disabled={step === 0 || loading} className="flex items-center gap-2 px-6 py-3 rounded-full bg-black/5 font-bold disabled:opacity-30"><ChevronLeft className="w-4 h-4" /> Back</button>
            <button onClick={step === steps.length - 1 ? submit : next} disabled={loading} className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#C91D67] text-white font-bold hover:brightness-110">
              {loading ? "Processing..." : step === steps.length - 1 ? "Submit Application" : "Continue"} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExpertsRegisterPage() {
  const auth = JSON.parse(localStorage.getItem("app_auth") || "null");
  const isLoggedIn = !!auth?.user;
  const userRole = auth?.user?.role || auth?.user?.roles?.[0]?.name;
  const isExpert = userRole === "expert";
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && !isExpert) {
      // If logged in but not an expert, redirect to student portal/dashboard
      navigate("/portal");
    }
  }, [isLoggedIn, isExpert, navigate]);

  return (
    <div className="min-h-screen relative overflow-hidden px-4 py-20 sm:px-6" style={{ background: THEME.sand }}>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: THEME.pink }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: '#356BB0' }} />
      </div>

      <div className="relative mx-auto max-w-4xl">
        {!isLoggedIn ? (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/40 px-4 py-2 text-sm font-bold tracking-wide text-[#0B1220]/80 ring-1 ring-black/5 backdrop-blur mb-8">
              <Rocket className="w-4 h-4 text-[#C91D67]" />
              EXPERT NETWORK
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-[#0B1220] tracking-tight mb-6">
              Ready to share your <span style={{ color: THEME.pink }}>expertise?</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#0B1220]/75 leading-relaxed max-w-2xl mx-auto mb-12">
              To maintain the high quality of our network, all experts are required to have a verified portal account.
              Join our ecosystem to track your impact and manage your engagements.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
              <FeatureCard icon={Users} title="Manage Cohorts" desc="Easily track student groups and project progress." />
              <FeatureCard icon={ShieldCheck} title="Secure Platform" desc="Your Documentation and IP are protected." />
              <FeatureCard icon={BarChart3} title="Impact Analytics" desc="Track your mentorship results in real-time." />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/portal?mode=register&redirect=/experts/register&role=expert" className="inline-flex h-[60px] w-full items-center justify-center gap-2 rounded-xl bg-[#C51F5D] px-10 text-lg font-bold text-white shadow-xl hover:brightness-110 sm:w-auto">
                Register as Expert <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/portal?mode=login&redirect=/experts/register" className="px-8 py-4 font-bold text-[#0B1220]/70 hover:text-[#0B1220]">
                Sign in to existing account
              </Link>
            </div>
          </div>
        ) : (
          <FormWizard authUser={auth.user} />
        )}
      </div>
    </div>
  );
}
