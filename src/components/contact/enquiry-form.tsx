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
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-[var(--srn-line-strong)] bg-[var(--srn-canvas)] px-3.5 py-3 text-sm text-[var(--srn-ink)] outline-none transition placeholder:text-[var(--srn-ink-muted)] focus:border-[var(--srn-accent)] focus:bg-white focus:ring-4 focus:ring-[var(--srn-accent)]/15";

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
        className="rounded-2xl border border-[var(--srn-accent)]/40 bg-[var(--srn-accent-soft)] p-8"
        role="status"
        aria-live="polite"
      >
        <p className="font-mono text-xs uppercase tracking-wider text-[var(--srn-accent-deep)]">
          Confirmed
        </p>
        <p className="font-display mt-3 text-3xl tracking-tight text-[var(--srn-ink)]">
          Thank you
        </p>
        <p className="mt-4 text-[var(--srn-ink-muted)]">{contact.success}</p>
        <p className="mt-6 font-mono text-sm">
          Reference · <strong>{reference}</strong>
        </p>
        <button
          type="button"
          className="mt-8 text-sm font-semibold text-[var(--srn-accent-deep)]"
          onClick={() => setReference(null)}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {!!lines.length && (
        <div className="rounded-2xl border border-[var(--srn-accent)]/30 bg-[var(--srn-accent-soft)] p-4 text-sm">
          <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--srn-accent-deep)]">
            From RFQ matrix
          </p>
          <ul className="mt-2 space-y-1 text-[var(--srn-ink-muted)]">
            {lines.map((l, i) => (
              <li key={l.slug}>
                <span className="font-mono text-[10px] text-[var(--srn-accent-deep)]">
                  {String(i + 1).padStart(2, "0")}
                </span>{" "}
                {l.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <section>
        <SectionLabel n="01" title="Buyer details" />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
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
      </section>

      <section>
        <SectionLabel n="02" title="Product lines" />
        <fieldset className="mt-4">
          <legend className="sr-only">Product categories</legend>
          <div className="flex flex-wrap gap-2">
            {productCategories.map((c) => {
              const on = categories.includes(c.slug);
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => toggleCategory(c.slug)}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-xs font-semibold transition",
                    on
                      ? "border-[var(--srn-accent)] bg-[linear-gradient(135deg,var(--srn-accent),var(--srn-champagne))] text-[#1a140c] shadow-[0_8px_20px_-12px_var(--srn-accent-glow)]"
                      : "border-[var(--srn-line-strong)] text-[var(--srn-ink-muted)] hover:border-[var(--srn-accent)] hover:text-[var(--srn-accent-deep)]",
                  )}
                  aria-pressed={on}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </fieldset>

        <label className="mt-5 block text-sm">
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
      </section>

      <section>
        <SectionLabel n="03" title="Commercial path" />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
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

        <label className="mt-4 block text-sm">
          <span className="mb-1.5 block text-xs font-medium text-[var(--srn-ink-muted)]">
            Additional notes
          </span>
          <textarea name="additionalNotes" rows={3} className={inputClass} />
        </label>
      </section>

      <label className="flex items-start gap-3 text-sm text-[var(--srn-ink-muted)]">
        <input
          type="checkbox"
          name="consentGiven"
          required
          className="mt-1 accent-[var(--srn-accent)]"
        />
        <span>{contact.consent}</span>
      </label>

      <button
        type="submit"
        disabled={pending}
        className="btn-shine inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(105deg,#8f6d35_0%,#e8d5a8_45%,#c9a56a_70%,#8f6d35_100%)] bg-[length:180%_100%] px-8 py-3.5 text-sm font-semibold text-[#1a140c] shadow-[0_14px_36px_-12px_rgba(201,165,106,0.55)] transition hover:brightness-105 active:scale-[0.99] disabled:opacity-60 md:w-auto"
      >
        <span>{pending ? "Submitting…" : "Submit trade RFQ"}</span>
      </button>
    </form>
  );
}

function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-[var(--srn-line)] pb-2">
      <span className="font-mono text-[11px] text-[var(--srn-accent-deep)]">{n}</span>
      <h3 className="font-display text-lg tracking-tight">{title}</h3>
    </div>
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
