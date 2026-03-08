import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Coins,
  CheckCircle2,
  Chrome,
  CircleDollarSign,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Facebook,
  FileSpreadsheet,
  Globe2,
  Link as LinkIcon,
  Linkedin,
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
  { key: "auth", label: "Account Access" },
  { key: "basic", label: "Basic Info" },
  { key: "expert", label: "Expert Profile" },
  { key: "pricing", label: "Pricing & Monetization" },
  { key: "alignment", label: "Alignment & Compliance" },
  { key: "review", label: "Review & Submit" },
];
const VISIBLE_STEP_ORDER = [0, 1, 2, 4, 5];

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
const SOCIAL_AUTH_START_URLS = {
  google: import.meta.env.VITE_GOOGLE_AUTH_START_URL || "",
  facebook: import.meta.env.VITE_FACEBOOK_AUTH_START_URL || "",
  linkedin: import.meta.env.VITE_LINKEDIN_AUTH_START_URL || "",
};

const SOCIAL_AUTH_FALLBACK_URLS = {
  google: "https://accounts.google.com/AccountChooser",
  facebook: "https://www.facebook.com/login.php",
  linkedin: "https://www.linkedin.com/login",
};

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

const FALLBACK_COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina",
  "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
  "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana",
  "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
  "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
  "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark",
  "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
  "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
  "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
  "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
  "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
  "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
  "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
  "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
  "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka",
  "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand",
  "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
  "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe",
];

const COUNTRIES = (() => {
  try {
    if (!Intl.DisplayNames || typeof Intl.supportedValuesOf !== "function") {
      return FALLBACK_COUNTRIES;
    }

    const display = new Intl.DisplayNames(["en"], { type: "region" });
    return Intl.supportedValuesOf("region")
      .filter((code) => code.length === 2)
      .map((code) => display.of(code))
      .filter((name) => name && !/unknown region/i.test(name))
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return FALLBACK_COUNTRIES;
  }
})();

const COUNTRY_PHONE_CODES = {
  Afghanistan: "+93",
  Albania: "+355",
  Algeria: "+213",
  Andorra: "+376",
  Angola: "+244",
  "Antigua and Barbuda": "+1",
  Argentina: "+54",
  Armenia: "+374",
  Australia: "+61",
  Austria: "+43",
  Azerbaijan: "+994",
  Bahamas: "+1",
  Bahrain: "+973",
  Bangladesh: "+880",
  Barbados: "+1",
  Belarus: "+375",
  Belgium: "+32",
  Belize: "+501",
  Benin: "+229",
  Bhutan: "+975",
  Bolivia: "+591",
  "Bosnia and Herzegovina": "+387",
  Botswana: "+267",
  Brazil: "+55",
  Brunei: "+673",
  Bulgaria: "+359",
  "Burkina Faso": "+226",
  Burundi: "+257",
  "Cabo Verde": "+238",
  Cambodia: "+855",
  Cameroon: "+237",
  Canada: "+1",
  "Central African Republic": "+236",
  Chad: "+235",
  Chile: "+56",
  China: "+86",
  Colombia: "+57",
  Comoros: "+269",
  "Congo (Congo-Brazzaville)": "+242",
  "Costa Rica": "+506",
  Croatia: "+385",
  Cuba: "+53",
  Cyprus: "+357",
  Czechia: "+420",
  Denmark: "+45",
  Djibouti: "+253",
  Dominica: "+1",
  "Dominican Republic": "+1",
  Ecuador: "+593",
  Egypt: "+20",
  "El Salvador": "+503",
  "Equatorial Guinea": "+240",
  Eritrea: "+291",
  Estonia: "+372",
  Eswatini: "+268",
  Ethiopia: "+251",
  Fiji: "+679",
  Finland: "+358",
  France: "+33",
  Gabon: "+241",
  Gambia: "+220",
  Georgia: "+995",
  Germany: "+49",
  Ghana: "+233",
  Greece: "+30",
  Grenada: "+1",
  Guatemala: "+502",
  Guinea: "+224",
  "Guinea-Bissau": "+245",
  Guyana: "+592",
  Haiti: "+509",
  Honduras: "+504",
  Hungary: "+36",
  Iceland: "+354",
  India: "+91",
  Indonesia: "+62",
  Iran: "+98",
  Iraq: "+964",
  Ireland: "+353",
  Israel: "+972",
  Italy: "+39",
  Jamaica: "+1",
  Japan: "+81",
  Jordan: "+962",
  Kazakhstan: "+7",
  Kenya: "+254",
  Kiribati: "+686",
  Kuwait: "+965",
  Kyrgyzstan: "+996",
  Laos: "+856",
  Latvia: "+371",
  Lebanon: "+961",
  Lesotho: "+266",
  Liberia: "+231",
  Libya: "+218",
  Liechtenstein: "+423",
  Lithuania: "+370",
  Luxembourg: "+352",
  Madagascar: "+261",
  Malawi: "+265",
  Malaysia: "+60",
  Maldives: "+960",
  Mali: "+223",
  Malta: "+356",
  "Marshall Islands": "+692",
  Mauritania: "+222",
  Mauritius: "+230",
  Mexico: "+52",
  Micronesia: "+691",
  Moldova: "+373",
  Monaco: "+377",
  Mongolia: "+976",
  Montenegro: "+382",
  Morocco: "+212",
  Mozambique: "+258",
  Myanmar: "+95",
  Namibia: "+264",
  Nauru: "+674",
  Nepal: "+977",
  Netherlands: "+31",
  "New Zealand": "+64",
  Nicaragua: "+505",
  Niger: "+227",
  Nigeria: "+234",
  "North Korea": "+850",
  "North Macedonia": "+389",
  Norway: "+47",
  Oman: "+968",
  Pakistan: "+92",
  Palau: "+680",
  Palestine: "+970",
  Panama: "+507",
  "Papua New Guinea": "+675",
  Paraguay: "+595",
  Peru: "+51",
  Philippines: "+63",
  Poland: "+48",
  Portugal: "+351",
  Qatar: "+974",
  Romania: "+40",
  Russia: "+7",
  Rwanda: "+250",
  "Saint Kitts and Nevis": "+1",
  "Saint Lucia": "+1",
  "Saint Vincent and the Grenadines": "+1",
  Samoa: "+685",
  "San Marino": "+378",
  "Sao Tome and Principe": "+239",
  "Saudi Arabia": "+966",
  Senegal: "+221",
  Serbia: "+381",
  Seychelles: "+248",
  "Sierra Leone": "+232",
  Singapore: "+65",
  Slovakia: "+421",
  Slovenia: "+386",
  "Solomon Islands": "+677",
  Somalia: "+252",
  "South Africa": "+27",
  "South Korea": "+82",
  "South Sudan": "+211",
  Spain: "+34",
  "Sri Lanka": "+94",
  Sudan: "+249",
  Suriname: "+597",
  Sweden: "+46",
  Switzerland: "+41",
  Syria: "+963",
  Tajikistan: "+992",
  Tanzania: "+255",
  Thailand: "+66",
  "Timor-Leste": "+670",
  Togo: "+228",
  Tonga: "+676",
  "Trinidad and Tobago": "+1",
  Tunisia: "+216",
  Turkey: "+90",
  Turkmenistan: "+993",
  Tuvalu: "+688",
  Uganda: "+256",
  Ukraine: "+380",
  "United Arab Emirates": "+971",
  "United Kingdom": "+44",
  "United States": "+1",
  Uruguay: "+598",
  Uzbekistan: "+998",
  Vanuatu: "+678",
  "Vatican City": "+379",
  Venezuela: "+58",
  Vietnam: "+84",
  Yemen: "+967",
  Zambia: "+260",
  Zimbabwe: "+263",
};

const LINKEDIN_PARTIAL_PREFIXES = [
  "",
  "h",
  "ht",
  "htt",
  "http",
  "https",
  "http:",
  "https:",
  "http:/",
  "https:/",
  "http://",
  "https://",
  "http://w",
  "https://w",
  "http://ww",
  "https://ww",
  "http://www",
  "https://www",
  "http://www.",
  "https://www.",
  "http://l",
  "https://l",
  "http://li",
  "https://li",
  "http://lin",
  "https://lin",
  "http://link",
  "https://link",
  "http://linkedin",
  "https://linkedin",
  "http://linkedin.",
  "https://linkedin.",
  "http://linkedin.c",
  "https://linkedin.c",
  "http://linkedin.co",
  "https://linkedin.co",
  "http://linkedin.com",
  "https://linkedin.com",
  "http://linkedin.com/",
  "https://linkedin.com/",
  "http://www.linkedin.com",
  "https://www.linkedin.com",
  "http://www.linkedin.com/",
  "https://www.linkedin.com/",
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function isBlank(value) {
  if (typeof value === "string") return !value.trim();
  if (Array.isArray(value)) return value.length === 0;
  return !value;
}

function sanitizePhoneInput(value) {
  const cleaned = value.replace(/[^\d+\s()-]/g, "");
  const plusStripped = cleaned.replace(/\+/g, "");
  return cleaned.startsWith("+") ? `+${plusStripped}` : plusStripped;
}

function sanitizeDigits(value) {
  return value.replace(/\D/g, "");
}

function isOnlyCountryCode(phone, country) {
  const code = COUNTRY_PHONE_CODES[country];
  if (!code) return !phone.trim();
  const normalized = phone.trim();
  return normalized === code || normalized === `${code}`.trim();
}

function isAllowedLinkedInInput(value) {
  const normalized = value.trim().toLowerCase();
  if (LINKEDIN_PARTIAL_PREFIXES.includes(normalized)) return true;
  if ("linkedin.com".startsWith(normalized)) return true;
  if ("www.linkedin.com".startsWith(normalized)) return true;
  return /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/i.test(value.trim());
}

function isValidLinkedInUrl(value) {
  return /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/i.test(value.trim());
}

export default function ExpertsRegisterPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showStepError, setShowStepError] = useState(false);
  const formTopRef = useRef(null);
  const [authMode, setAuthMode] = useState("login");

  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });

  const [createForm, setCreateForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    delivery: [],
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
      if (authMode === "create") {
        return Boolean(
          createForm.fullName.trim() &&
            createForm.email.trim() &&
            createForm.password &&
            createForm.confirmPassword &&
            createForm.password === createForm.confirmPassword
        );
      }
      return Boolean(auth.email.trim() && auth.password);
    }
    if (step === 1) {
      const linkedInValid = isValidLinkedInUrl(basic.linkedin);
      return Boolean(
        basic.fullName &&
          basic.email &&
          basic.phone &&
          basic.country &&
          basic.orgName &&
          basic.position &&
          basic.linkedin &&
          linkedInValid
      );
    }
    if (step === 2) {
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
          expert.delivery.length &&
          expert.hasMaterial &&
          expert.projectsDesc &&
          expert.collaborationModel &&
          uploads.photo
      );
    }
    if (step === 3) {
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
    if (step === 4) {
      return Boolean(alignment.confirm && alignment.contact && alignment.consent);
    }
    return true;
  }, [step, authMode, auth, createForm, basic, expert, pricing, alignment, uploads]);

  const currentVisibleStepIndex = VISIBLE_STEP_ORDER.indexOf(step);

  const fieldErrors = useMemo(() => {
    if (!showStepError) return {};
    const errors = {};

    if (step === 0) {
      if (authMode === "create") {
        errors.createFullName = isBlank(createForm.fullName);
        errors.createEmail = isBlank(createForm.email);
        errors.createPassword = isBlank(createForm.password);
        errors.createConfirmPassword =
          isBlank(createForm.confirmPassword) || createForm.password !== createForm.confirmPassword;
      } else {
        errors.loginEmail = isBlank(auth.email);
        errors.loginPassword = isBlank(auth.password);
      }
    }

    if (step === 1) {
      errors.fullName = isBlank(basic.fullName);
      errors.email = isBlank(basic.email);
      errors.phone = isBlank(basic.phone);
      errors.country = isBlank(basic.country);
      errors.orgName = isBlank(basic.orgName);
      errors.position = isBlank(basic.position);
      errors.linkedin = isBlank(basic.linkedin) || !isValidLinkedInUrl(basic.linkedin);
    }

    if (step === 2) {
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
      errors.collaborationModel = isBlank(expert.collaborationModel);
      errors.photo = !uploads.photo;
    }

    if (step === 3) {
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

    if (step === 4) {
      errors.confirm = !alignment.confirm;
      errors.contact = !alignment.contact;
      errors.consent = !alignment.consent;
    }

    return errors;
  }, [showStepError, step, authMode, auth, createForm, basic, expert, pricing, alignment, uploads]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentUrl = new URL(window.location.href);
    const authStatus = currentUrl.searchParams.get("auth");
    const provider = currentUrl.searchParams.get("provider");
    const email = currentUrl.searchParams.get("email");
    const nextStep = currentUrl.searchParams.get("step");

    if (authStatus !== "success") {
      if (nextStep === "2") {
        setStep(1);
      }
      return;
    }

    setAuthMode("login");
    if (email) {
      setAuth((prev) => ({
        ...prev,
        email,
        password: prev.password || "social-auth",
      }));
    } else if (provider) {
      const fallbackEmail = `${provider}@praktix.com`;
      setAuth((prev) => ({
        ...prev,
        email: prev.email || fallbackEmail,
        password: prev.password || "social-auth",
      }));
    }

    setStep(1);
    setShowStepError(false);

    currentUrl.searchParams.delete("auth");
    currentUrl.searchParams.delete("provider");
    currentUrl.searchParams.delete("email");
    currentUrl.searchParams.delete("step");
    window.history.replaceState({}, "", `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`);
  }, []);

  function openSocialAuth(provider) {
    setAuthMode("login");
    setShowStepError(false);
    if (typeof window === "undefined") return;

    const returnUrl = new URL(`${window.location.origin}/experts/register`);
    returnUrl.searchParams.set("auth", "success");
    returnUrl.searchParams.set("provider", provider);
    returnUrl.searchParams.set("step", "2");

    const configuredStartUrl = SOCIAL_AUTH_START_URLS[provider];
    if (configuredStartUrl) {
      const authUrl = new URL(configuredStartUrl);
      authUrl.searchParams.set("returnTo", returnUrl.toString());
      window.location.href = authUrl.toString();
      return;
    }

    const fallbackUrl = SOCIAL_AUTH_FALLBACK_URLS[provider];
    if (!fallbackUrl) return;
    window.location.href = fallbackUrl;
  }

  function next() {
    if (!canContinue) {
      setShowStepError(true);
      return;
    }
    if (step === 0) {
      if (authMode === "create") {
        setBasic((prev) => ({
          ...prev,
          fullName: prev.fullName || createForm.fullName,
        }));
      }
    }
    setShowStepError(false);
    setStep((s) => {
      const visibleIndex = VISIBLE_STEP_ORDER.indexOf(s);
      if (visibleIndex === -1) return s;
      return VISIBLE_STEP_ORDER[Math.min(visibleIndex + 1, VISIBLE_STEP_ORDER.length - 1)];
    });
  }

  function back() {
    setShowStepError(false);
    setStep((s) => {
      const visibleIndex = VISIBLE_STEP_ORDER.indexOf(s);
      if (visibleIndex === -1) return s;
      return VISIBLE_STEP_ORDER[Math.max(visibleIndex - 1, 0)];
    });
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
    }, 3000);
    return () => clearTimeout(timer);
  }, [submitted]);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 640) return;
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  return (
    <div className="expert-register-page min-h-screen px-4 py-8 sm:px-6" style={{ background: THEME.sand }}>
      <div className="mx-auto max-w-7xl">
        <div ref={formTopRef} className="rounded-[36px] bg-[#F3F3F1] p-6 ring-1 ring-black/5 sm:p-8">
          <h1 className="text-3xl font-semibold text-[#0B1220] sm:text-4xl">Expert Account Registration</h1>
          <p className="mt-2 text-sm text-[#0B1220]/65">
            Industry Expert / University Professor application form.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {VISIBLE_STEP_ORDER.map((stepIndex, idx) => {
              const s = STEPS[stepIndex];
              const active = idx === currentVisibleStepIndex;
              const done = idx < currentVisibleStepIndex;
              const locked = idx > currentVisibleStepIndex;
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
                    setStep(stepIndex);
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
              <div className="mx-auto max-w-[600px] rounded-[24px] bg-[#E5E7EB] px-4 py-4 shadow-[0_18px_40px_rgba(11,18,32,0.08)] sm:px-6 sm:py-5">
                <div className="text-center text-[24px] font-semibold leading-tight text-[#0B1220] sm:text-[32px]">
                  Applying as an Expert?
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("create");
                    setShowStepError(false);
                  }}
                  className="mt-4 h-14 w-full bg-[#F0B323] px-6 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-95 sm:h-[60px] sm:text-base"
                >
                  Create Account
                </button>

                {authMode === "login" ? (
                  <>
                    <div className="flex items-center gap-4 py-4">
                      <div className="h-px flex-1 bg-[#0B1220]/20" />
                      <div className="text-base font-semibold text-[#0B1220]/85">OR</div>
                      <div className="h-px flex-1 bg-[#0B1220]/20" />
                    </div>

                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => openSocialAuth("facebook")}
                        className="flex h-14 w-full items-center justify-between bg-[#2D73DA] px-6 text-left text-[18px] font-bold uppercase text-white transition hover:brightness-95 sm:h-[60px] sm:text-[20px]"
                      >
                        <Facebook className="h-6 w-6 shrink-0" />
                        <span className="flex-1 text-center">Log In with Facebook</span>
                        <span className="w-6 shrink-0" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={() => openSocialAuth("google")}
                        className="flex h-14 w-full items-center justify-between border-2 border-[#8B8B8B] bg-white px-6 text-left text-[18px] font-bold uppercase text-[#5C6470] transition hover:bg-[#FAFAFA] sm:h-[60px] sm:text-[20px]"
                      >
                        <Chrome className="h-6 w-6 shrink-0" />
                        <span className="flex-1 text-center">Log In with Google</span>
                        <span className="w-6 shrink-0" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={() => openSocialAuth("linkedin")}
                        className="flex h-14 w-full items-center justify-between bg-[#356BB0] px-6 text-left text-[18px] font-bold uppercase text-white transition hover:brightness-95 sm:h-[60px] sm:text-[20px]"
                      >
                        <Linkedin className="h-6 w-6 shrink-0" />
                        <span className="flex-1 text-center">Log In with LinkedIn</span>
                        <span className="w-6 shrink-0" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="space-y-3 pt-4">
                      <input
                        type="email"
                        value={auth.email}
                        onChange={(e) => setAuth((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="Email"
                        className="h-14 w-full rounded-[10px] border border-[#D0D0D0] bg-white px-4 text-[18px] text-[#0B1220] placeholder:text-[#8B929D] outline-none sm:h-[60px] sm:text-[20px]"
                      />
                      {fieldErrors.loginEmail ? <p className="text-xs text-rose-600">Email is required.</p> : null}
                      <input
                        type="password"
                        value={auth.password}
                        onChange={(e) => setAuth((prev) => ({ ...prev, password: e.target.value }))}
                        placeholder="Password"
                        className="h-14 w-full rounded-[10px] border border-[#D0D0D0] bg-white px-4 text-[18px] text-[#0B1220] placeholder:text-[#8B929D] outline-none sm:h-[60px] sm:text-[20px]"
                      />
                      {fieldErrors.loginPassword ? <p className="text-xs text-rose-600">Password is required.</p> : null}
                    </div>

                    <button type="button" className="mt-4 block w-full text-center text-[20px] font-medium text-[#B00020] sm:text-[22px]">
                      I forgot my password
                    </button>
                  </>
                ) : (
                  <div className="space-y-3 pt-4">
                    <input
                      type="text"
                      value={createForm.fullName}
                      onChange={(e) => setCreateForm((prev) => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Full Name"
                      className="h-14 w-full rounded-[10px] border border-[#D0D0D0] bg-white px-4 text-[18px] text-[#0B1220] placeholder:text-[#8B929D] outline-none sm:h-[60px] sm:text-[20px]"
                    />
                    {fieldErrors.createFullName ? <p className="text-xs text-rose-600">Full name is required.</p> : null}
                    <input
                      type="email"
                      value={createForm.email}
                      onChange={(e) => setCreateForm((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="Email"
                      className="h-14 w-full rounded-[10px] border border-[#D0D0D0] bg-white px-4 text-[18px] text-[#0B1220] placeholder:text-[#8B929D] outline-none sm:h-[60px] sm:text-[20px]"
                    />
                    {fieldErrors.createEmail ? <p className="text-xs text-rose-600">Email is required.</p> : null}
                    <input
                      type="password"
                      value={createForm.password}
                      onChange={(e) => setCreateForm((prev) => ({ ...prev, password: e.target.value }))}
                      placeholder="Password"
                      className="h-14 w-full rounded-[10px] border border-[#D0D0D0] bg-white px-4 text-[18px] text-[#0B1220] placeholder:text-[#8B929D] outline-none sm:h-[60px] sm:text-[20px]"
                    />
                    {fieldErrors.createPassword ? <p className="text-xs text-rose-600">Password is required.</p> : null}
                    <input
                      type="password"
                      value={createForm.confirmPassword}
                      onChange={(e) => setCreateForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Confirm Password"
                      className="h-14 w-full rounded-[10px] border border-[#D0D0D0] bg-white px-4 text-[18px] text-[#0B1220] placeholder:text-[#8B929D] outline-none sm:h-[60px] sm:text-[20px]"
                    />
                    {fieldErrors.createConfirmPassword ? <p className="text-xs text-rose-600">Passwords must match.</p> : null}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("login");
                        setShowStepError(false);
                      }}
                      className="block w-full pt-2 text-center text-[16px] font-medium text-[#356BB0] hover:underline"
                    >
                      Already have an account? Log In
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={next}
                  className="mt-4 h-14 w-full bg-[#F0B323] px-6 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-95 sm:h-[60px] sm:text-base"
                >
                  {authMode === "create" ? "Create Account & Continue" : "Log In"}
                </button>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full Name" required error={fieldErrors.fullName}>
                  <Input error={fieldErrors.fullName} icon={UserRound} iconColor="#A78BFA" placeholder="ex: John Doe" value={basic.fullName} onChange={(e) => setBasic({ ...basic, fullName: e.target.value })} />
                </Field>
                <Field label="Email Address" required error={fieldErrors.email}>
                  <Input error={fieldErrors.email} type="email" spellCheck={false} icon={Mail} iconColor="#22D3EE" placeholder="ex: john.doe@email.com" value={basic.email} onChange={(e) => setBasic({ ...basic, email: e.target.value })} />
                </Field>
                <Field label="Phone Number" required error={fieldErrors.phone}>
                  <Input
                    error={fieldErrors.phone}
                    type="tel"
                    inputMode="tel"
                    icon={Phone}
                    iconColor="#34D399"
                    placeholder="ex: +49 151 23456789"
                    value={basic.phone}
                    onChange={(e) => setBasic({ ...basic, phone: sanitizePhoneInput(e.target.value) })}
                  />
                </Field>
                <Field label="Country of Residence" required error={fieldErrors.country}>
                  <CountrySelect
                    error={fieldErrors.country}
                    icon={MapPin}
                    iconColor="#F59E0B"
                    value={basic.country}
                    onChange={(e) => {
                      const country = e.target.value;
                      const phoneCode = COUNTRY_PHONE_CODES[country];
                      setBasic((prev) => ({
                        ...prev,
                        country,
                        phone:
                          !prev.phone.trim() || isOnlyCountryCode(prev.phone, prev.country)
                            ? (phoneCode ? `${phoneCode} ` : "")
                            : prev.phone,
                      }));
                    }}
                    options={COUNTRIES}
                  />
                </Field>
                <Field label="Organization Name" required error={fieldErrors.orgName}>
                  <Input error={fieldErrors.orgName} icon={Building2} iconColor="#22D3EE" placeholder="ex: Berlin Tech University" value={basic.orgName} onChange={(e) => setBasic({ ...basic, orgName: e.target.value })} />
                </Field>
                <Field label="Current Position / Title" required error={fieldErrors.position}>
                  <Input error={fieldErrors.position} icon={Briefcase} iconColor="#34D399" placeholder="ex: Senior Data Scientist" value={basic.position} onChange={(e) => setBasic({ ...basic, position: e.target.value })} />
                </Field>
                <Field label="LinkedIn Profile URL" required error={fieldErrors.linkedin} errorMessage="Enter a valid LinkedIn URL.">
                  <Input
                    error={fieldErrors.linkedin}
                    type="url"
                    spellCheck={false}
                    icon={LinkIcon}
                    iconColor="#A78BFA"
                    placeholder="ex: https://linkedin.com/in/johndoe"
                    value={basic.linkedin}
                    onChange={(e) => {
                      const nextValue = e.target.value;
                      if (!isAllowedLinkedInInput(nextValue)) return;
                      setBasic({ ...basic, linkedin: nextValue });
                    }}
                  />
                </Field>
                <Field label="Company / University Website">
                  <Input type="url" spellCheck={false} icon={Globe2} iconColor="#F59E0B" placeholder="ex: https://example.org" value={basic.website} onChange={(e) => setBasic({ ...basic, website: e.target.value })} />
                </Field>
              </div>
            ) : null}

            {step === 2 ? (
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
                      placeholder="ex: Quantum Computing"
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
                      placeholder="ex: Research Architect"
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
                <Field label="Delivery preference" required hint="Multi-select" className="sm:col-span-2" error={fieldErrors.delivery}>
                  <MultiSelect
                    error={fieldErrors.delivery}
                    options={["Online", "Hybrid", "Onsite (Europe)", "Onsite (MENA)"]}
                    selected={expert.delivery}
                    onToggle={(value) =>
                      setExpert((prev) => ({
                        ...prev,
                        delivery: prev.delivery.includes(value)
                          ? prev.delivery.filter((x) => x !== value)
                          : [...prev.delivery, value],
                      }))
                    }
                  />
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
                <Field label="Portfolio / personal website URL">
                  <Input type="url" spellCheck={false} icon={Globe2} iconColor="#34D399" placeholder="https://..." value={expert.portfolio} onChange={(e) => setExpert({ ...expert, portfolio: e.target.value })} />
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

            {step === 3 ? (
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
                          placeholder="ex: JOD"
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
                        inputMode="numeric"
                        icon={Clock3}
                        iconColor="#34D399"
                        placeholder="e.g. 8"
                        value={pricing.durationWeeks}
                        onChange={(e) => setPricing({ ...pricing, durationWeeks: sanitizeDigits(e.target.value) })}
                      />
                    </Field>
                    <Field label="Total hours" required error={fieldErrors.totalHours}>
                      <Input
                        error={fieldErrors.totalHours}
                        inputMode="numeric"
                        icon={Clock3}
                        iconColor="#34D399"
                        placeholder="e.g. 40"
                        value={pricing.totalHours}
                        onChange={(e) => setPricing({ ...pricing, totalHours: sanitizeDigits(e.target.value) })}
                      />
                    </Field>
                    <Field label="Hours per session" required error={fieldErrors.hoursPerSession}>
                      <Input
                        error={fieldErrors.hoursPerSession}
                        inputMode="numeric"
                        icon={Clock3}
                        iconColor="#34D399"
                        placeholder="e.g. 2"
                        value={pricing.hoursPerSession}
                        onChange={(e) => setPricing({ ...pricing, hoursPerSession: sanitizeDigits(e.target.value) })}
                      />
                    </Field>
                    <Field label="Number of sessions" required error={fieldErrors.numberOfSessions}>
                      <Input
                        error={fieldErrors.numberOfSessions}
                        inputMode="numeric"
                        icon={Clock3}
                        iconColor="#34D399"
                        placeholder="e.g. 20"
                        value={pricing.numberOfSessions}
                        onChange={(e) => setPricing({ ...pricing, numberOfSessions: sanitizeDigits(e.target.value) })}
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

            {step === 4 ? (
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
                  <CheckRow error={fieldErrors.confirm} checked={alignment.confirm} onChange={(v) => setAlignment({ ...alignment, confirm: v })} label="I confirm the information provided is accurate. *" />
                  <CheckRow error={fieldErrors.contact} checked={alignment.contact} onChange={(v) => setAlignment({ ...alignment, contact: v })} label="I agree to be contacted regarding partnership opportunities. *" />
                  <CheckRow error={fieldErrors.consent} checked={alignment.consent} onChange={(v) => setAlignment({ ...alignment, consent: v })} label="I consent to data processing in accordance with the privacy policy. *" />
                </div>
              </div>
            ) : null}

            {step === 5 ? (
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
                    <p><strong>Delivery Preference:</strong> {expert.delivery.join(", ") || "--"}</p>
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
              {step === 0 ? null : currentVisibleStepIndex < VISIBLE_STEP_ORDER.length - 1 ? (
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

function CountrySelect({ options, value, icon: Icon, iconColor = "#F59E0B", error = false, ...props }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
        <Icon className="h-4 w-4" style={{ color: iconColor }} />
      </span>
      <select
        {...props}
        value={value}
        className={cn(inputClass, "pl-11 pr-9", error && "expert-field-error")}
        style={{ color: value ? "#000000" : "#9CA3AF", fontWeight: 500 }}
      >
        <option value="">Select country</option>
        {options.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}

function MultiSelect({ options, selected, onToggle, error = false }) {
  return (
    <div className="rounded-[32px] bg-white/40 p-5 ring-1" style={{ borderColor: error ? "rgba(201,29,103,0.55)" : "rgba(141,180,255,0.9)" }}>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = selected.includes(o);
          return (
            <button
              key={o}
              type="button"
              onClick={() => onToggle(o)}
              className="rounded-full px-4 py-2 text-left text-[16px] font-semibold ring-1 transition"
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 ring-1 ring-[#8DB4FF]">
            <Upload className="h-5 w-5 text-[#34D399]" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold text-[#1A2230]">{label}</p>
            <p className="break-words text-sm text-[#0B1220]/55">{fileName || note}</p>
          </div>
        </div>
        <span className="inline-flex self-start rounded-full bg-white/60 px-4 py-1.5 text-sm font-semibold text-[#0B1220]/70 ring-1 ring-[#8DB4FF] sm:shrink-0">
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
