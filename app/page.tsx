"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Errors = { name?: string; email?: string; form?: string };

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function validate(): Errors {
    const e: Errors = {};
    if (!name.trim()) e.name = "Please enter your name.";
    if (!email.trim()) e.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email address, like name@example.com.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }
    setStatus("loading");
    setMessage("");
    setErrors({});
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (data.alreadySubscribed) {
        setStatus("error");
        setErrors({ form: "already_subscribed" });
      } else if (!res.ok) {
        setStatus("error");
        setErrors({ form: data.error ?? "Something went wrong. Please try again." });
      } else {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("You're in. We'll alert you before projects go to public launch.");
      }
    } catch {
      setStatus("error");
      setErrors({ form: "Something went wrong. Please try again." });
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,#EFF5FF,#F7F9FF_55%,white)] px-6 py-16">

      {/* Screen reader live region */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {status === "error" && errors.form}
        {status === "success" && message}
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col items-center justify-center w-full max-w-2xl text-center">

        {/* Headline */}
        <h1 className="mb-4 text-[2.75rem] font-extrabold leading-[1.15] tracking-tight text-[#005FC6] sm:text-5xl">
          Discover Your Next Precon Opportunity with Us
        </h1>

        {/* Divider */}
        <div className="mx-auto my-6 h-1 w-16 rounded-full bg-[#005FC6] opacity-60" />

        {/* Subtext */}
        <p className="mb-10 text-lg leading-relaxed text-gray-600 max-w-lg mx-auto">
          Access precon intel with pricing, payment plans, and floorplans. Join our partner list to get notified when we go live.
        </p>

        {/* Form card */}
        <div className="w-full max-w-lg mx-auto rounded-2xl border border-[#005FC6]/10 bg-white px-5 py-5 shadow-[0_4px_32px_rgba(0,95,198,0.08)]">

          {status === "success" ? (
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              className="animate-fade-slide-up flex flex-col items-center gap-3 text-center focus:outline-none"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#005FC6]">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-base font-semibold text-[#005FC6]">You&apos;re on the list!</p>
              <p className="text-sm text-gray-500">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">

              {/* Form-level API error */}
              {errors.form && (
                <p
                  role="alert"
                  className={`rounded-lg border px-4 py-3 text-sm ${
                    errors.form === "already_subscribed"
                      ? "border-[#005FC6]/20 bg-[#EFF5FF] text-[#005FC6]"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {errors.form === "already_subscribed"
                    ? "You're already on the list!"
                    : errors.form}
                </p>
              )}

              {/* Fields */}
              <div className="flex flex-col gap-3 sm:flex-row">

                {/* Name */}
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <label htmlFor="waitlist-name" className="sr-only">Full name</label>
                  <input
                    id="waitlist-name"
                    type="text"
                    required
                    autoComplete="name"
                    autoCapitalize="words"
                    spellCheck={false}
                    placeholder="Your name"
                    value={name}
                    aria-required="true"
                    aria-invalid={errors.name ? "true" : undefined}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    onBlur={() => {
                      if (!name.trim()) setErrors((prev) => ({ ...prev, name: "Please enter your name." }));
                    }}
                    disabled={status === "loading"}
                    className={inputClass(errors.name)}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="text-xs text-red-600 mt-0.5 text-left">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <label htmlFor="waitlist-email" className="sr-only">Email address</label>
                  <input
                    id="waitlist-email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    placeholder="your@email.com"
                    value={email}
                    aria-required="true"
                    aria-invalid={errors.email ? "true" : undefined}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    onBlur={() => {
                      if (!email.trim()) setErrors((prev) => ({ ...prev, email: "Please enter your email address." }));
                      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                        setErrors((prev) => ({ ...prev, email: "Enter a valid email address, like name@example.com." }));
                    }}
                    disabled={status === "loading"}
                    className={inputClass(errors.email)}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="text-xs text-red-600 mt-0.5 text-left">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* CTA */}
              <button
                type="submit"
                disabled={status === "loading"}
                aria-disabled={status === "loading"}
                className="mt-1 w-full rounded-xl bg-[#005FC6] px-6 py-3 text-sm font-semibold text-white
                           transition-all duration-200
                           hover:bg-[#004fa8] hover:shadow-[0_4px_16px_rgba(0,95,198,0.35)]
                           active:scale-[0.99]
                           disabled:cursor-not-allowed disabled:opacity-60
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005FC6] focus-visible:ring-offset-2
                           rounded-lg"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Joining...
                  </span>
                ) : (
                  "Get Early Access"
                )}
              </button>

            </form>
          )}
        </div>

        {/* Book a Demo card */}
        <div className="mt-4 w-full max-w-lg mx-auto rounded-2xl border border-[#005FC6]/10 bg-white/60 px-6 py-4 shadow-[0_2px_16px_rgba(0,95,198,0.05)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold text-gray-800">Are you an agent or brokerage?</p>
            <p className="text-sm text-gray-500 mt-0.5">See how Precon Finder works for your team.</p>
          </div>
          <a
            href="/demo"
            className="shrink-0 rounded-lg border border-[#005FC6] px-5 py-2.5 text-sm font-semibold text-[#005FC6]
                       transition-all duration-200
                       hover:bg-[#005FC6] hover:text-white hover:shadow-[0_4px_16px_rgba(0,95,198,0.25)]
                       active:scale-[0.98]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005FC6] focus-visible:ring-offset-2"
          >
            Book a Demo
          </a>
        </div>

      </div>

      {/* Footer */}
      <footer className="mt-16 flex flex-col items-center gap-4">
        <Image
          src="/logo-colour.png"
          alt="Precon Finder"
          width={140}
          height={35}
          className="h-auto w-full max-w-[140px]"
        />
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Precon Finder. All rights reserved. &middot; Toronto &middot; Vancouver &middot; Calgary
        </p>
      </footer>

    </main>
  );
}
