"use client";

import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();

  const onLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button type="button" className="premium-button premium-button--ghost" onClick={onLogout}>
      Sign out
    </button>
  );
}
