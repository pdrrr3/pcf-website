"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
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
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      } else {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("You're on the list! We'll be in touch soon.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white px-6 py-16">

      {/* Main content */}
      <div className="flex flex-1 flex-col items-center justify-center w-full max-w-xl text-center">

        {/* Headline */}
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[#005FC6] sm:text-5xl">
          Discover Your Next Precon Opportunity with Us
        </h1>

        {/* Divider */}
        <div className="mx-auto my-6 h-1 w-12 rounded-full bg-[#005FC6]" />

        {/* Subtext */}
        <p className="mb-10 text-xl leading-relaxed text-gray-500">
          Access precon intel with pricing, payment plans, and floorplans. Join our partner list to get notified when we go live.
        </p>

        {/* Signup form */}
        {status === "success" ? (
          <div className="rounded-xl bg-green-50 px-6 py-6 text-green-700 font-medium">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
            <div className="flex gap-3">
              <input
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === "loading"}
                className="flex-1 min-w-0 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#005FC6] focus:outline-none focus:ring-2 focus:ring-[#005FC6]/20 disabled:opacity-50"
              />
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className="flex-1 min-w-0 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#005FC6] focus:outline-none focus:ring-2 focus:ring-[#005FC6]/20 disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full whitespace-nowrap rounded-lg bg-[#005FC6] px-6 py-3 font-semibold text-white transition hover:bg-[#004fa8] disabled:opacity-50 sm:w-auto sm:self-center"
            >
              {status === "loading" ? "Joining..." : "Join Partner List"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-2 text-sm text-red-500">{message}</p>
        )}
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
