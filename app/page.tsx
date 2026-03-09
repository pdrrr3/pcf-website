"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      } else {
        setStatus("success");
        setEmail("");
        setMessage("You're on the list! We'll be in touch soon.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-16">
      <div className="w-full max-w-lg text-center">

        {/* Logo */}
        <Image
          src="/logo-colour.png"
          alt="Precon Finder"
          width={240}
          height={60}
          priority
          className="mx-auto mb-10 h-auto w-full max-w-[240px]"
        />

        {/* Arabic subtitle */}
        <p className="mb-3 text-lg text-gray-500 font-[var(--font-arabic)]" dir="rtl" lang="ar">
          اكتشف فرصتك القادمة في عقارات دبي قيد الإنشاء
        </p>

        {/* Headline */}
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Discover precon opportunities in{" "}
          <span className="text-[#0057C8]">Dubai.</span>
        </h1>

        {/* Divider */}
        <div className="mx-auto my-6 h-1 w-12 rounded-full bg-[#0057C8]" />

        {/* Subtext */}
        <p className="mb-10 text-lg leading-relaxed text-gray-500">
          Dubai launch intel, structured — pricing, payment plans, floorplans. Join the PCF Partner List for early access.
        </p>

        {/* Signup form */}
        {status === "success" ? (
          <div className="rounded-xl bg-green-50 px-6 py-6 text-green-700 font-medium">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#0057C8] focus:outline-none focus:ring-2 focus:ring-[#0057C8]/20 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-lg bg-[#0057C8] px-6 py-3 font-semibold text-white transition hover:bg-[#0046a8] disabled:opacity-50"
            >
              {status === "loading" ? "Joining..." : "Notify Me"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-2 text-sm text-red-500">{message}</p>
        )}

        {/* Footer */}
        <p className="mt-12 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Precon Finder. All rights reserved.
        </p>

      </div>
    </main>
  );
}
