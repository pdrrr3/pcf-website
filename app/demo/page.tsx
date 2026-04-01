"use client";

import { useState } from "react";
import Image from "next/image";

const roles = ["Agent", "Brokerage", "Builder", "Other"] as const;

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  preferredTime: string;
  message: string;
};

export default function DemoPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    preferredTime: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.company.trim()) e.company = "Company name is required.";
    if (!form.role) e.role = "Please select a role.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");

    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  const inputClass = (hasError?: string) =>
    [
      "w-full rounded-lg border px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 bg-white",
      "transition-all duration-150",
      "focus:outline-none focus:border-[#005FC6]",
      "focus-visible:ring-2 focus-visible:ring-[#005FC6] focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      hasError ? "border-red-500" : "border-gray-200",
    ].join(" ");

  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";
  const errorClass = "text-xs text-red-600 mt-1";

  if (status === "success") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,#EFF5FF,#F7F9FF_55%,white)] px-6">
        <div className="max-w-md w-full text-center animate-fade-slide-up">
          <div className="bg-white rounded-2xl p-10 shadow-[0_4px_32px_rgba(0,95,198,0.08)] border border-[#005FC6]/10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#005FC6] mx-auto mb-5">
              <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Thanks for your interest!</h2>
            <p className="mt-3 text-gray-500 leading-relaxed">
              We&apos;ve received your demo request. A member of our team will reach out within 24
              hours to schedule a walkthrough.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,#EFF5FF,#F7F9FF_55%,white)] px-6 py-16">
      <div className="max-w-lg w-full">
        <div className="flex justify-center mb-8">
          <a href="/">
            <Image
              src="/logo-colour.png"
              alt="Precon Finder"
              width={140}
              height={35}
              className="h-auto w-full max-w-[140px]"
            />
          </a>
        </div>
        <div className="text-center mb-10">
          <h1 className="text-[2.75rem] font-extrabold leading-[1.15] tracking-tight text-[#005FC6] sm:text-5xl">
            Book a Demo
          </h1>
          <div className="mx-auto my-6 h-1 w-16 rounded-full bg-[#005FC6] opacity-60" />
          <p className="text-lg leading-relaxed text-gray-600 max-w-md mx-auto">
            See how Precon Finder helps brokerages and agents manage pre-construction deals.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_32px_rgba(0,95,198,0.08)] border border-[#005FC6]/10 space-y-5"
        >
          {/* Full Name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Jane Smith"
              autoComplete="name"
              className={inputClass(errors.name)}
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              disabled={status === "loading"}
            />
            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="jane@brokerage.com"
              autoComplete="email"
              className={inputClass(errors.email)}
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              disabled={status === "loading"}
            />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="(416) 555-0123"
              autoComplete="tel"
              className={inputClass()}
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              disabled={status === "loading"}
            />
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className={labelClass}>
              Company / Brokerage <span className="text-red-400">*</span>
            </label>
            <input
              id="company"
              type="text"
              placeholder="Acme Realty Inc."
              autoComplete="organization"
              className={inputClass(errors.company)}
              value={form.company}
              onChange={(e) => updateField("company", e.target.value)}
              disabled={status === "loading"}
            />
            {errors.company && <p className={errorClass}>{errors.company}</p>}
          </div>

          {/* Role */}
          <div>
            <label className={labelClass}>
              Role <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              {roles.map((role) => {
                const selected = form.role === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => updateField("role", role)}
                    className={[
                      "flex items-center justify-center px-3 py-3 rounded-xl border text-sm font-medium transition-all duration-150 cursor-pointer",
                      selected
                        ? "bg-[#005FC6] text-white border-[#005FC6] shadow-sm"
                        : "bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-100",
                    ].join(" ")}
                  >
                    {role}
                  </button>
                );
              })}
            </div>
            {errors.role && <p className={errorClass}>{errors.role}</p>}
          </div>

          {/* Preferred Time */}
          <div>
            <label htmlFor="preferredTime" className={labelClass}>
              Preferred Demo Time
            </label>
            <input
              id="preferredTime"
              type="text"
              placeholder="e.g. Weekday afternoons, Tuesday at 2pm EST"
              className={inputClass()}
              value={form.preferredTime}
              onChange={(e) => updateField("preferredTime", e.target.value)}
              disabled={status === "loading"}
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className={labelClass}>
              Message / Notes
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Tell us about your brokerage or what you're looking for..."
              className={`${inputClass()} resize-none`}
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
              disabled={status === "loading"}
            />
          </div>

          {submitError && (
            <p role="alert" className="rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-xl bg-[#005FC6] px-6 py-3.5 text-sm font-semibold text-white
                       transition-all duration-200
                       hover:bg-[#004fa8] hover:shadow-[0_4px_16px_rgba(0,95,198,0.35)]
                       active:scale-[0.99]
                       disabled:cursor-not-allowed disabled:opacity-60
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005FC6] focus-visible:ring-offset-2"
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Submitting...
              </span>
            ) : (
              "Request a Demo"
            )}
          </button>

          <p className="text-xs text-gray-400 text-center">
            We&apos;ll get back to you within one business day.
          </p>
        </form>
      </div>
    </main>
  );
}
