"use client";

import { useState } from "react";
import { toast } from "sonner";

export function TwoFactorSetup() {
  const [uri, setUri] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);

  async function begin() {
    const res = await fetch("/api/admin/auth", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "begin2fa" }),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(data.error ?? "Failed");
      return;
    }
    setUri(data.uri);
    setSecret(data.secret);
  }

  async function confirm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const totp = new FormData(e.currentTarget).get("totp");
    const res = await fetch("/api/admin/auth", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "confirm2fa", totp }),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(data.error ?? "Invalid code");
      return;
    }
    toast.success("2FA enabled");
    window.location.reload();
  }

  return (
    <div className="mt-4 space-y-3">
      <button
        type="button"
        onClick={begin}
        className="border border-black/15 px-3 py-2 text-xs"
      >
        Begin 2FA setup
      </button>
      {secret && (
        <div className="text-xs">
          <p className="font-mono break-all">Secret: {secret}</p>
          {uri && <p className="mt-1 break-all text-black/55">{uri}</p>}
          <form onSubmit={confirm} className="mt-3 flex gap-2">
            <input
              name="totp"
              placeholder="6-digit code"
              className="border border-black/15 px-2 py-1 font-mono"
            />
            <button type="submit" className="bg-[var(--srn-navy)] px-3 py-1 text-white">
              Confirm
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
