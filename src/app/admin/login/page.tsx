"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { AnimatedLogo } from "@/components/brand/animated-logo";

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/admin";
  const [requires2fa, setRequires2fa] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setPending(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: fd.get("email"),
          password: fd.get("password"),
          totp: fd.get("totp") || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.requires2fa) setRequires2fa(true);
        throw new Error(data.error ?? "Login failed");
      }
      toast.success("Signed in");
      router.replace(next);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-[var(--srn-canvas-muted)] px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md border border-[var(--srn-rule)] bg-[var(--srn-canvas)] p-8 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <AnimatedLogo size="sm" animated={false} label="" />
          <div>
            <p className="font-display text-2xl">SRN Trade Desk</p>
            <p className="text-xs text-[var(--srn-ink-soft)]">Operations console</p>
          </div>
        </div>
        <label className="mt-8 block text-sm">
          <span className="text-[var(--srn-ink-soft)]">Email</span>
          <input
            name="email"
            type="email"
            required
            defaultValue="admin@srnglobal.in"
            className="mt-1 w-full border border-[var(--srn-rule)] px-3 py-2"
          />
        </label>
        <label className="mt-4 block text-sm">
          <span className="text-[var(--srn-ink-soft)]">Password</span>
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full border border-[var(--srn-rule)] px-3 py-2"
          />
        </label>
        {requires2fa && (
          <label className="mt-4 block text-sm">
            <span className="text-[var(--srn-ink-soft)]">Authenticator code</span>
            <input
              name="totp"
              inputMode="numeric"
              autoComplete="one-time-code"
              className="mt-1 w-full border border-[var(--srn-rule)] px-3 py-2 font-mono"
            />
          </label>
        )}
        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full bg-[var(--srn-navy)] py-2.5 text-sm font-medium text-[var(--srn-canvas)]"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
