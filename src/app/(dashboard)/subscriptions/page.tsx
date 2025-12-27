import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SubscriptionTable } from "@/components/dashboard/SubscriptionTable";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"; 
import { getLiveRates } from "@/lib/exchange-rates";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "My Subscriptions | SubTrack",
};

async function getData() {
  const session = await auth();
  if (!session?.user?.id) return { subs: [], user: null, rates: {} };

  const rawSubs = await prisma.subscription.findMany({
    where: { 
      userId: session.user.id,
      // 👇 FIX: Exclude Cancelled (Archived) items from this view
      status: {
        not: "CANCELLED"
      }
    }, 
    include: { vendor: true },
    orderBy: { nextRenewalDate: "asc" },
  });

  // Serialize Decimals for Client Components
  const subs = rawSubs.map(sub => ({
    ...sub,
    cost: Number(sub.cost),
    splitCost: sub.splitCost ? Number(sub.splitCost) : 0,
  }));

  const rates = await getLiveRates();
  return { subs, user: session.user, rates };
}

export default async function SubscriptionsPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const { subs, user, rates } = await getData();
  const baseCurrency = user?.preferredCurrency || "USD";

  return (
    <div className="mx-auto max-w-[1600px] space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* Reusing header for the "Add" button functionality */}
      <DashboardHeader />

      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="border-b border-border">
          <CardTitle>Active & Paused Subscriptions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <SubscriptionTable 
            data={subs} 
            rates={rates} 
            baseCurrency={baseCurrency} 
          />
        </CardContent>
      </Card>
    </div>
  );
}