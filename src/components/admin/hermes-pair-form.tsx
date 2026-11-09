"use client";

import { useState } from "react";
import { toast } from "sonner";

export function HermesPairForm({ botUsername }: { botUsername?: string }) {
  const [link, setLink] = useState<string | null>(null);

  async function createToken() {
    const res = await fetch("/api/admin/hermes/pair", { method: "POST" });
    const data = await res.json();
    if (!res.ok) {
      toast.error(data.error ?? "Failed");
      return;
    }
    setLink(data.deepLink);
    toast.success("Pair token created (30 min)");
  }

  return (
    <div className="mt-4 space-y-2">
      <button
        type="button"
        onClick={createToken}
        className="bg-[var(--srn-navy)] px-3 py-2 text-xs font-medium text-white"
      >
        Create pair link
      </button>
      {link && (
        <p className="break-all font-mono text-xs text-black/70">
          {link}
          {!botUsername && (
            <span className="mt-1 block text-amber-700">
              Set TELEGRAM_BOT_USERNAME for a t.me deep link.
            </span>
          )}
        </p>
      )}
    </div>
  );
}
