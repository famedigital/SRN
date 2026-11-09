"use client";

import { toast } from "sonner";

export function RevalidateButton({
  path,
  label = "Revalidate",
}: {
  path: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      className="border border-black/15 px-3 py-1.5 text-xs hover:bg-black/5"
      onClick={async () => {
        const res = await fetch("/api/admin/revalidate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path }),
        });
        if (!res.ok) toast.error("Revalidate failed");
        else toast.success(`Revalidated ${path}`);
      }}
    >
      {label}
    </button>
  );
}
