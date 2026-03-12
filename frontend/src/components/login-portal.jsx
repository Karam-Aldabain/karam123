import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import apiClient from "../api/api";

const COLORS = {
  accent: "#C51F5D",
  primary: "#243447",
  deep: "#141D26",
  paper: "#E2E2D2",
  error: "#EF4444"
};

/** ---------------- FIELD-LEVEL ERROR ---------------- */
function FieldError({ error }) {
  if (!error) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mt-1.5 flex items-center gap-1.5 px-2 text-xs font-semibold"
      style={{ color: COLORS.error }}
    >
      <div className="h-1 w-1 rounded-full bg-current" />
      {error}
    </motion.div>
  );
}

export default function LoginPortalPage() {
  void motion;
  const reduce = useReducedMotion();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [mode, setMode] = useState(searchParams.get("mode") === "register" ? "register" : "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(searchParams.get("role") || "student");

  // Fetch roles from API
  useEffect(() => {
    async function fetchRoles() {
      try {
        const response = await apiClient.get("/roles");
        setRoles(response.data.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    }
    fetchRoles();
  }, []);

  // Update mode or selectedRole if URL parameters change
  useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam === "register" || modeParam === "login") {
      setMode(modeParam);
    }
    const roleParam = searchParams.get("role");
    if (roleParam) {
      setSelectedRole(roleParam);
    }
  }, [searchParams]);

  async function onLoginSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage("");
    setFieldErrors({});

    try {
      const response = await apiClient.post("/login", {
        email,
        password,
      });

      if (response.data.user) {
        // Store only the user object, the token is in the HttpOnly cookie
        localStorage.setItem("app_auth", JSON.stringify({
          user: response.data.user,
        }));
        setStatusMessage("Login successful! Redirecting...");

        const redirect = searchParams.get("redirect");
        setTimeout(() => navigate(redirect || "/"), 1000);
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.status === 422 && error.response.data.errors) {
        setFieldErrors(error.response.data.errors);
        setStatusMessage("Please check the errors below.");
      } else {
        setStatusMessage(error.response?.data?.message || "Login failed. Please check your credentials.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function onRegisterSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage("");
    setFieldErrors({});

    if (registerPassword !== confirmPassword) {
      setStatusMessage("Passwords do not match.");
      setSubmitting(false);
      return;
    }

    // Split full name into first and last name
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || firstName; // Fallback if only one name provided

    try {
      const response = await apiClient.post("/register", {
        first_name: firstName,
        last_name: lastName,
        email: registerEmail,
        password: registerPassword,
        password_confirmation: confirmPassword,
        phone: phoneNumber,
        role: selectedRole,
      });

      if (response.data.user) {
        // Store only the user object, the token is in the HttpOnly cookie
        localStorage.setItem("app_auth", JSON.stringify({
          user: response.data.user,
        }));
        setStatusMessage("Registration successful! Redirecting...");

        const redirect = searchParams.get("redirect");
        setTimeout(() => navigate(redirect || "/"), 1000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errors = error.response?.data?.errors;
      if (errors) {
        setFieldErrors(errors);
        setStatusMessage("Please check the validation errors below.");
      } else {
        setStatusMessage(error.response?.data?.message || "Registration failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-170px)] overflow-hidden bg-[#E2E2D2]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px circle at 10% 15%, rgba(197,31,93,0.12), transparent 50%), radial-gradient(1000px circle at 90% 70%, rgba(36,52,71,0.12), transparent 55%)",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "rgba(197,31,93,0.22)" }}
        animate={reduce ? undefined : { x: [0, 28, 0], y: [0, 14, 0] }}
        transition={reduce ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-16 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "rgba(36,52,71,0.20)" }}
        animate={reduce ? undefined : { x: [0, -22, 0], y: [0, -16, 0] }}
        transition={reduce ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-5 py-14 lg:grid-cols-2 lg:py-20">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="inline-flex rounded-full border border-[#243447]/20 bg-white/60 px-4 py-2 text-xs font-semibold tracking-widest text-[#243447]/80">
            PRAKTIX PORTAL
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#141D26] sm:text-5xl">
            {mode === "login" ? "Login to your" : "Create your"}
            <span style={{ color: COLORS.accent }}>
              {mode === "login" ? " learning dashboard" : " portal account"}
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#243447]/80 sm:text-base">
            Access your cohorts, projects, sessions, and progress in one place.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.98, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="rounded-[34px] border border-[#243447]/12 bg-white/70 p-7 shadow-[0_24px_80px_rgba(20,29,38,0.14)] backdrop-blur"
        >
          {mode === "login" ? (
            <>
              <form onSubmit={onLoginSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#141D26]">Email address</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#243447]/55" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      className={`w-full rounded-2xl border bg-white/80 py-3 pl-11 pr-4 text-sm text-[#141D26] outline-none transition focus:ring-2 focus:ring-[#C51F5D]/20 ${fieldErrors.email ? "border-[#EF4444]" : "border-[#243447]/14 focus:border-[#C51F5D]/40"
                        }`}
                    />
                  </div>
                  <FieldError error={fieldErrors.email?.[0]} />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#141D26]">Password</label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#243447]/55" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className={`w-full rounded-2xl border bg-white/80 py-3 pl-11 pr-4 text-sm text-[#141D26] outline-none transition focus:ring-2 focus:ring-[#C51F5D]/20 ${fieldErrors.password ? "border-[#EF4444]" : "border-[#243447]/14 focus:border-[#C51F5D]/40"
                        }`}
                    />
                  </div>
                  <FieldError error={fieldErrors.password?.[0]} />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="inline-flex items-center gap-2 text-sm text-[#243447]/80">
                    <input type="checkbox" className="h-4 w-4 rounded border-[#243447]/30 accent-[#C51F5D]" />
                    Remember me
                  </label>
                  <a href="#" className="text-sm font-semibold text-[#C51F5D] hover:opacity-80">
                    Forgot password?
                  </a>
                </div>

                <motion.button
                  whileHover={reduce ? undefined : { y: -1 }}
                  whileTap={reduce ? undefined : { scale: 0.99 }}
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #C51F5D 0%, #A5164E 100%)",
                    boxShadow: "0 14px 36px rgba(197,31,93,0.32)",
                  }}
                >
                  {submitting ? "Submitting..." : "Login to Portal"} <ArrowRight className="h-4 w-4" />
                </motion.button>
              </form>

              <div className="mt-6 border-t border-[#243447]/10 pt-5 text-center text-sm text-[#243447]/80">
                Don&apos;t have an account?{" "}
                <button type="button" onClick={() => setMode("register")} className="font-semibold text-[#C51F5D] hover:opacity-80">
                  Register
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center text-sm font-semibold text-[#141D26]">Register</div>
              <form onSubmit={onRegisterSubmit} className="mt-4 space-y-3">
                <div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full name"
                    className={`w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm text-[#141D26] outline-none transition focus:ring-2 focus:ring-[#C51F5D]/20 ${fieldErrors.first_name || fieldErrors.last_name ? "border-[#EF4444]" : "border-[#243447]/14 focus:border-[#C51F5D]/40"
                      }`}
                  />
                  <FieldError error={fieldErrors.first_name?.[0] || fieldErrors.last_name?.[0]} />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="Email address"
                    className={`w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm text-[#141D26] outline-none transition focus:ring-2 focus:ring-[#C51F5D]/20 ${fieldErrors.email ? "border-[#EF4444]" : "border-[#243447]/14 focus:border-[#C51F5D]/40"
                      }`}
                  />
                  <FieldError error={fieldErrors.email?.[0]} />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone number"
                    className={`w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm text-[#141D26] outline-none transition focus:ring-2 focus:ring-[#C51F5D]/20 ${fieldErrors.phone ? "border-[#EF4444]" : "border-[#243447]/14 focus:border-[#C51F5D]/40"
                      }`}
                  />
                  <FieldError error={fieldErrors.phone?.[0]} />
                </div>
                <div>
                  <input
                    type="password"
                    required
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Password"
                    className={`w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm text-[#141D26] outline-none transition focus:ring-2 focus:ring-[#C51F5D]/20 ${fieldErrors.password ? "border-[#EF4444]" : "border-[#243447]/14 focus:border-[#C51F5D]/40"
                      }`}
                  />
                  <FieldError error={fieldErrors.password?.[0]} />
                </div>
                <div>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className={`w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm text-[#141D26] outline-none transition focus:ring-2 focus:ring-[#C51F5D]/20 ${fieldErrors.password_confirmation ? "border-[#EF4444]" : "border-[#243447]/14 focus:border-[#C51F5D]/40"
                      }`}
                  />
                  <FieldError error={fieldErrors.password_confirmation?.[0]} />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#141D26]/60 ml-2">Select your role</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className={`w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm text-[#141D26] outline-none transition focus:ring-2 focus:ring-[#C51F5D]/20 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%23243447%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px_20px] bg-[right_1rem_center] bg-no-repeat ${fieldErrors.role ? "border-[#EF4444]" : "border-[#243447]/14 focus:border-[#C51F5D]/40"
                      }`}
                  >
                    {roles.map((r) => (
                      <option key={r.id} value={r.name}>
                        {r.name.charAt(0).toUpperCase() + r.name.slice(1)}
                      </option>
                    ))}
                    {roles.length === 0 && (
                      <option value="student">Student</option>
                    )}
                  </select>
                  <FieldError error={fieldErrors.role?.[0]} />
                </div>
                <motion.button
                  whileHover={reduce ? undefined : { y: -1 }}
                  whileTap={reduce ? undefined : { scale: 0.99 }}
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #243447 0%, #141D26 100%)",
                  }}
                >
                  {submitting ? "Submitting..." : "Register"} <ArrowRight className="h-4 w-4" />
                </motion.button>
              </form>

              <div className="mt-5 text-center text-sm text-[#243447]/80">
                Already have an account?{" "}
                <button type="button" onClick={() => setMode("login")} className="font-semibold text-[#C51F5D] hover:opacity-80">
                  Login
                </button>
              </div>
            </>
          )}
          {statusMessage ? (
            <div className="mt-4 text-center text-sm font-semibold text-[#243447]/85">{statusMessage}</div>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}
