import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminDashboardClient } from "@/app/components/admin/AdminDashboardClient";
import { AdminLogoutButton } from "@/app/components/admin/AdminLogoutButton";
import { verifySessionToken, getAdminCookieName } from "@/app/lib/admin-auth";
import { getLeadStoreSnapshot } from "@/app/lib/lead-store";
import { getStorageMode } from "@/app/lib/storage-mode";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAdminCookieName())?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    redirect("/admin/login");
  }

  const store = await getLeadStoreSnapshot();
  const storageMode = getStorageMode();

  return (
    <main className="premium-main">
      <div className="site-max site-px" style={{ paddingTop: "1.5rem" }}>
        <div className="premium-glass-card" style={{ padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p className="premium-section__lede">
            Signed in as {session.email} · Storage mode: {storageMode}
          </p>
          <AdminLogoutButton />
        </div>
      </div>
      <AdminDashboardClient
        appointments={store.appointments}
        inquiries={store.inquiries}
        subscribersCount={store.subscribers.length}
      />
    </main>
  );
}
