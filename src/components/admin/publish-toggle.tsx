"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function PublishToggle({
  id,
  slug,
  published,
}: {
  id: string;
  slug: string;
  published: boolean;
}) {
  const router = useRouter();

  async function toggle() {
    const res = await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, slug, isPublished: !published }),
    });
    if (!res.ok) {
      toast.error("Publish update failed");
      return;
    }
    toast.success(published ? "Unpublished" : "Published + revalidated");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`px-3 py-1.5 text-xs font-medium ${
        published ? "bg-emerald-700 text-white" : "bg-black/10 text-black/70"
      }`}
    >
      {published ? "Published" : "Draft"}
    </button>
  );
}
