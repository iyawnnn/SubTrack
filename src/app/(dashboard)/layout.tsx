import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { GlobalSpotlight } from "@/components/GlobalSpotlight";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation"; // Optional: Safety check

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Safety: If no session, they shouldn't see the dashboard anyway
  if (!session?.user) {
    // redirect("/auth/login"); // Uncomment this if you want strict protection
    return null; 
  }
  
  // Fetch simple list for search
  const subs = session?.user?.id ? await prisma.subscription.findMany({
    where: { userId: session.user.id },
    select: { id: true, vendor: { select: { name: true } } }
  }) : [];

  const searchData = subs.map(s => ({ id: s.id, vendorName: s.vendor.name }));

  return (
    <>
      <GlobalSpotlight subscriptions={searchData} />
      {/* 👇 FIX: Pass the user object here */}
      <DashboardShell user={session.user}>
        {children}
      </DashboardShell>
    </>
  );
}