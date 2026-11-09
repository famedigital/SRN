import { createBrowserClient } from "@supabase/ssr";

/** Optional browser client — only when NEXT_PUBLIC_SUPABASE_* are set. */
export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase URL/key not configured");
  }
  return createBrowserClient(url, key);
}
