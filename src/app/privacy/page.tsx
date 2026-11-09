import type { Metadata } from "next";
import { legal } from "../../../content/copy";

export const metadata: Metadata = {
  title: legal.privacy.seoTitle,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <h1 className="font-display text-4xl">{legal.privacy.heading}</h1>
      <p className="mt-6 leading-relaxed text-[var(--srn-ink-soft)]">{legal.privacy.body}</p>
    </div>
  );
}
