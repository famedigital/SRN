"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function EnquiryActions({
  id,
  status,
  specs,
}: {
  id: string;
  status: string;
  specs: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function setStatus(next: string) {
    const res = await fetch("/api/admin/enquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: next }),
    });
    if (!res.ok) {
      toast.error("Update failed");
      return;
    }
    toast.success(`Marked ${next}`);
    router.refresh();
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        className="text-xs underline"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Hide" : "View"}
      </button>
      {open && (
        <pre className="max-w-xs whitespace-pre-wrap rounded bg-black/[0.03] p-2 text-[11px] text-black/70">
          {specs}
        </pre>
      )}
      <select
        className="block w-full border border-black/10 bg-white px-1 py-1 text-xs"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {["NEW", "UNDER_REVIEW", "SPECS_CLARIFIED", "QUOTED", "ARCHIVED"].map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
