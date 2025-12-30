import { Suspense } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { SearchWrapper } from "@/components/dashboard/SearchWrapper";
import { auth } from "@/auth";
import { redirect } from "next/navigation"; // 👈 Import redirect

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // 👇 FIX: Redirect instead of returning null
  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <>
      <Suspense fallback={null}>
        <SearchWrapper />
      </Suspense>

      <DashboardShell user={session.user}>
        {children}
      </DashboardShell>
    </>
  );
}