import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Banknote, 
  ExternalLink 
} from "lucide-react";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency-helper";

export default async function SubscriptionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) redirect("/");

  const { id } = await params;

  const sub = await prisma.subscription.findUnique({
    where: { id },
    include: { vendor: true }
  });

  if (!sub || sub.userId !== session.user.id) notFound();

  const cost = sub.splitCost && Number(sub.splitCost) > 0 
    ? Number(sub.splitCost) 
    : Number(sub.cost);

  const now = dayjs();
  const start = dayjs(sub.startDate);
  
  const monthsActive = now.diff(start, 'month') + 1; 
  const lifetimeSpend = monthsActive * cost;

  // Helper for status badge colors
  const isTrial = sub.isTrial;
  const isActive = sub.status === "ACTIVE";
  
  // Dynamic Badge Styles based on Light/Dark mode
  let statusBadgeClass = "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"; // Default/Cancelled
  if (isActive) statusBadgeClass = "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
  if (isTrial) statusBadgeClass = "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800";

  return (
    <div className="container mx-auto max-w-5xl py-10 px-4 sm:px-6">
       {/* Header Navigation */}
       <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2 pl-0 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
       </div>

       {/* Title Section */}
       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {sub.vendor.name}
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">
              {sub.category}
            </p>
          </div>
          <Badge 
            variant="outline" 
            className={`px-4 py-1.5 text-sm font-semibold border ${statusBadgeClass}`}
          >
            {isTrial ? "Trial Active" : sub.status}
          </Badge>
       </div>

       {/* Stats Grid */}
       <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-10">
          {/* 1. Monthly Cost */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Monthly Cost
              </CardTitle>
              <div className="rounded-md bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400">
                <Banknote className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {formatCurrency(cost, sub.currency)}
              </div>
              {Number(sub.splitCost) > 0 && (
                <Badge variant="secondary" className="mt-2 text-xs font-normal text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300">
                  Split Cost Active
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* 2. Lifetime Spend */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Lifetime Spend
              </CardTitle>
              <div className="rounded-md bg-violet-500/10 p-2 text-violet-600 dark:text-violet-400">
                <Clock className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {formatCurrency(lifetimeSpend, sub.currency)}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Over {monthsActive} months
              </p>
            </CardContent>
          </Card>

          {/* 3. Next Payment */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Next Payment
              </CardTitle>
              <div className="rounded-md bg-orange-500/10 p-2 text-orange-600 dark:text-orange-400">
                <Calendar className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {dayjs(sub.nextRenewalDate).format("MMM D")}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {dayjs(sub.nextRenewalDate).format("dddd")}
              </p>
            </CardContent>
          </Card>
       </div>

       {/* Details Section */}
       <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">Subscription Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
               <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Start Date</span>
                  <span className="text-lg font-medium text-foreground">
                    {dayjs(sub.startDate).format("MMMM D, YYYY")}
                  </span>
               </div>

               <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Website</span>
                  {sub.vendor.website ? (
                     <a 
                        href={sub.vendor.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-lg font-medium text-primary hover:underline"
                     >
                        Visit Site <ExternalLink className="h-4 w-4" />
                     </a>
                  ) : (
                     <span className="text-lg font-medium text-muted-foreground">—</span>
                  )}
               </div>

               <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Billing Cycle</span>
                  <span className="text-lg font-medium text-foreground capitalize">
                    {sub.frequency.toLowerCase()}
                  </span>
               </div>

               <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-muted-foreground">Plan Type</span>
                  <span className="text-lg font-medium text-foreground">
                    {sub.isTrial ? "Free Trial" : "Standard Subscription"}
                  </span>
               </div>
            </div>
          </CardContent>
       </Card>
    </div>
  );
}