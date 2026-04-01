import Image from "next/image";

export const metadata = {
  title: "Privacy Policy — Precon Finder",
};

export default function PrivacyPage() {
  const sectionClass = "space-y-3";
  const headingClass = "text-lg font-semibold text-gray-900";
  const bodyClass = "text-sm leading-relaxed text-gray-600";

  return (
    <main className="flex min-h-screen flex-col items-center bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,#EFF5FF,#F7F9FF_55%,white)] px-6 py-16">
      <div className="max-w-2xl w-full">
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
            Privacy Policy
          </h1>
          <div className="mx-auto my-6 h-1 w-16 rounded-full bg-[#005FC6] opacity-60" />
          <p className="text-sm text-gray-400">Last updated: April 1, 2026</p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-[0_4px_32px_rgba(0,95,198,0.08)] border border-[#005FC6]/10 space-y-8">
          <section className={sectionClass}>
            <h2 className={headingClass}>1. Introduction</h2>
            <p className={bodyClass}>
              Precon Finder (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website preconfinder.com and related services. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>2. Information We Collect</h2>
            <p className={bodyClass}>We collect the following types of information:</p>
            <ul className={`${bodyClass} list-disc pl-5 space-y-1.5`}>
              <li><strong>Contact information</strong> you provide through our forms, including your name, email address, phone number, company name, and role.</li>
              <li><strong>Communications</strong> such as messages and notes you submit through our demo request form.</li>
              <li><strong>Usage data</strong> collected automatically, including pages visited, time spent, browser type, and device information.</li>
            </ul>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>3. How We Use Your Information</h2>
            <p className={bodyClass}>We use your information to:</p>
            <ul className={`${bodyClass} list-disc pl-5 space-y-1.5`}>
              <li>Respond to demo requests and inquiries.</li>
              <li>Send you updates about our product launch and services you have opted into.</li>
              <li>Improve our website and services.</li>
              <li>Communicate with you about your account or our services.</li>
            </ul>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>4. Third-Party Services</h2>
            <p className={bodyClass}>
              We use third-party services to operate our platform, including email delivery and analytics providers. These services may process your data on our behalf in accordance with their own privacy policies. We do not sell your personal information to third parties.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>5. Data Retention</h2>
            <p className={bodyClass}>
              We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. You may request deletion of your data at any time by contacting us.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>6. Your Rights</h2>
            <p className={bodyClass}>You have the right to:</p>
            <ul className={`${bodyClass} list-disc pl-5 space-y-1.5`}>
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data.</li>
              <li>Unsubscribe from marketing communications at any time.</li>
            </ul>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>7. Security</h2>
            <p className={bodyClass}>
              We implement reasonable technical and organizational measures to protect your personal information. However, no method of transmission over the internet is completely secure.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>8. Changes to This Policy</h2>
            <p className={bodyClass}>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on this page with a revised date.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>9. Contact Us</h2>
            <p className={bodyClass}>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a
                href="mailto:hello@preconfinder.com"
                className="text-[#005FC6] underline-offset-2 hover:underline"
              >
                hello@preconfinder.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
