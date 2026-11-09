"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  contact,
  enquiryTypes,
  incoterms,
  originGateways,
  productCategories,
} from "../../../content/copy";
import { useRfq } from "@/components/rfq/rfq-store";

const inputClass =
  "w-full rounded-md border border-[var(--srn-line-strong)] bg-white px-3.5 py-2.5 text-sm text-[var(--srn-ink)] outline-none placeholder:text-[var(--srn-ink-muted)] focus:border-[var(--srn-accent)]";

export function EnquiryForm() {
  const search = useSearchParams();
  const { lines, clear } = useRfq();
  const preCategory = search.get("category") ?? "";
  const enquiryTypeDefault =
    search.get("type") === "supply" ? "Supply Partner" : "Buying";

  const initialCategories = useMemo(() => {
    const fromRfq = lines.map((l) => l.slug);
    if (preCategory && !fromRfq.includes(preCategory)) fromRfq.push(preCategory);
    return fromRfq;
  }, [lines, preCategory]);

  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>(initialCategories);

  function toggleCategory(slug: string) {
    setCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (!categories.length) {
      toast.error("Select at least one product category.");
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fd.get("fullName"),
          companyName: fd.get("companyName"),
          businessEmail: fd.get("businessEmail"),
          phoneWhatsApp: fd.get("phoneWhatsApp") || undefined,
          country: fd.get("country"),
          enquiryType: fd.get("enquiryType"),
          productCategories: categories,
          lineItems: lines,
          specifications: fd.get("specifications"),
          estimatedQuantity: fd.get("estimatedQuantity") || undefined,
          requiredPackaging: fd.get("requiredPackaging") || undefined,
          incoterm: fd.get("incoterm") || undefined,
          destinationPort: fd.get("destinationPort") || undefined,
          originGateway: fd.get("originGateway") || undefined,
          timeline: fd.get("timeline") || undefined,
          additionalNotes: fd.get("additionalNotes") || undefined,
          consentGiven: fd.get("consentGiven") === "on",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Submission failed");
      setReference(data.referenceNumber);
      clear();
      form.reset();
      toast.success("Enquiry received");
      void fetch("/api/outbox/process", { method: "POST" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send enquiry");
    } finally {
      setPending(false);
    }
  }

  if (reference) {
    return (
      <div
        className="rounded-xl border border-[var(--srn-accent)] bg-[var(--srn-accent-soft)] p-8"
        role="status"
        aria-live="polite"
      >
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--srn-accent)]">
          Confirmed
        </p>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-[var(--srn-ink)]">Thank you</p>
        <p className="mt-4 text-[var(--srn-ink-muted)]">{contact.success}</p>
        <p className="mt-6 font-mono text-sm">
          Reference · <strong>{reference}</strong>
        </p>
        <button
          type="button"
          className="mt-8 text-sm font-medium text-[var(--srn-accent)]"
          onClick={() => setReference(null)}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-xl border border-[var(--srn-line)] bg-[var(--srn-paper)] p-6 md:p-8"
    >
      {!!lines.length && (
        <div className="rounded-lg border border-[var(--srn-line)] bg-[var(--srn-canvas-muted)] p-4 text-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--srn-accent)]">
            From RFQ matrix
          </p>
          <ul className="mt-2 space-y-1 text-[var(--srn-ink-muted)]">
            {lines.map((l, i) => (
              <li key={l.slug}>
                <span className="font-mono text-[10px] text-[var(--srn-ink)]/30">
                  {String(i + 1).padStart(2, "0")}
                </span>{" "}
                {l.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full name *" name="fullName" required />
        <Field label="Company *" name="companyName" required />
        <Field label="Business email *" name="businessEmail" type="email" required />
        <Field label="Phone / WhatsApp" name="phoneWhatsApp" />
        <Field label="Country *" name="country" required />
        <label className="block text-sm">
          <span className="mb-1.5 block text-xs font-medium text-[var(--srn-ink-muted)]">
            Enquiry type *
          </span>
          <select
            name="enquiryType"
            required
            defaultValue={enquiryTypeDefault}
            className={inputClass}
          >
            {enquiryTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset>
        <legend className="text-xs font-medium text-[var(--srn-ink-muted)]">
          Product categories *
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {productCategories.map((c) => {
            const on = categories.includes(c.slug);
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => toggleCategory(c.slug)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                  on
                    ? "border-[var(--srn-accent)] bg-[var(--srn-accent)] text-white"
                    : "border-[var(--srn-line-strong)] text-[var(--srn-ink-muted)] hover:border-[var(--srn-accent)]"
                }`}
                aria-pressed={on}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="block text-sm">
        <span className="mb-1.5 block text-xs font-medium text-[var(--srn-ink-muted)]">
          Specifications / requirements *
        </span>
        <textarea
          name="specifications"
          required
          rows={5}
          className={inputClass}
          placeholder="Grade, pack, volume, destination rules…"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Estimated quantity" name="estimatedQuantity" />
        <Field label="Required packaging" name="requiredPackaging" />
        <label className="block text-sm">
          <span className="mb-1.5 block text-xs font-medium text-[var(--srn-ink-muted)]">
            Incoterm
          </span>
          <select name="incoterm" className={inputClass}>
            <option value="">Select…</option>
            {incoterms.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-xs font-medium text-[var(--srn-ink-muted)]">
            Indian export gateway
          </span>
          <select name="originGateway" className={inputClass}>
            <option value="">Select…</option>
            {originGateways.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
        <Field label="Destination port / place" name="destinationPort" />
        <Field label="Timeline" name="timeline" placeholder="e.g. Q2 2027" />
      </div>

      <label className="block text-sm">
        <span className="mb-1.5 block text-xs font-medium text-[var(--srn-ink-muted)]">
          Additional notes
        </span>
        <textarea name="additionalNotes" rows={3} className={inputClass} />
      </label>

      <label className="flex items-start gap-3 text-sm text-[var(--srn-ink-muted)]">
        <input type="checkbox" name="consentGiven" required className="mt-1 accent-[var(--srn-navy)]" />
        <span>{contact.consent}</span>
      </label>

      <button
        type="submit"
        disabled={pending}
        className="btn-shine inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#C5A059] via-[#E2C37B] to-[#C5A059] px-8 py-3.5 text-sm font-semibold text-stone-950 shadow-[0_12px_32px_-10px_rgba(197,160,89,0.5)] hover:shadow-[0_16px_40px_-8px_rgba(197,160,89,0.7)] hover:brightness-105 active:scale-[0.98] disabled:opacity-60 transition"
      >
        {pending ? "Submitting Trade Tender…" : "Submit Formal Trade RFQ →"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-xs font-medium text-[var(--srn-ink-muted)]">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
    </label>
  );
}
