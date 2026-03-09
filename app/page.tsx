import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-16">
      <div className="w-full max-w-lg text-center">

        {/* Logo */}
        <Image
          src="/logo-colour.png"
          alt="Precon Finder"
          width={340}
          height={60}
          priority
          className="mx-auto mb-10 h-auto w-full max-w-[340px]"
        />

        {/* Headline */}
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Something exciting is{" "}
          <span className="text-[#0057C8]">coming soon.</span>
        </h1>

        {/* Divider */}
        <div className="mx-auto my-6 h-1 w-12 rounded-full bg-[#0057C8]" />

        {/* Subtext */}
        <p className="mb-10 text-lg leading-relaxed text-gray-500">
          We&apos;re building the easiest way to discover preconstruction real
          estate opportunities. Be the first to know when we launch.
        </p>

        {/* ════════════════════════════════════════════════
            TODO: Replace this entire block with your
            Flodesk newsletter signup embed code.
            ════════════════════════════════════════════════ */}
        <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-8">
          <span className="mb-3 inline-block rounded bg-blue-50 px-2 py-1 text-xs font-bold uppercase tracking-widest text-[#0057C8]">
            Flodesk embed goes here
          </span>
          <p className="text-sm text-gray-400">
            Paste your Flodesk newsletter signup embed code in place of this
            block.
          </p>
        </div>
        {/* ════════════════════════════════════════════════ */}

        {/* Footer */}
        <p className="mt-12 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Precon Finder. All rights reserved.
        </p>

      </div>
    </main>
  );
}
