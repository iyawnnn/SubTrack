"use client";

import React from "react";
import dayjs from "dayjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, CheckCircle2 } from "lucide-react";
import { formatCurrency, convertTo } from "@/lib/currency-helper";

interface UpcomingBillsProps {
  data: any[];
  rates: any;
  currency: string;
}

export function UpcomingBills({ data, rates, currency }: UpcomingBillsProps) {
  const upcoming = React.useMemo(() => {
    return data
      .map((sub) => {
        const now = dayjs().startOf("day");
        const renewal = dayjs(sub.nextRenewalDate).startOf("day");
        const diff = renewal.diff(now, "day");
        return { ...sub, daysLeft: diff };
      })
      // Filter for future bills or bills due today
      .filter((sub) => sub.daysLeft >= 0)
      // Sort by CLOSEST due date first (ascending)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      // 👇 FIX: Increased limit from 3 to 4
      .slice(0, 4);
  }, [data]);

  return (
    <Card className="h-full border-border bg-card shadow-sm flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-bold">
           <CalendarClock className="h-4 w-4 text-primary" />
           Upcoming Bills
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        {upcoming.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center text-muted-foreground min-h-[120px]">
             <div className="rounded-full bg-primary/10 p-3 text-primary">
               <CheckCircle2 className="h-6 w-6" />
             </div>
             <p className="text-sm font-medium">All caught up!</p>
             <p className="text-xs text-muted-foreground/70">No active subscriptions due.</p>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            {upcoming.map((sub) => {
              // Handle "My Share" logic for display if applicable, or just standard cost
              const rawCost = Number(sub.splitCost) > 0 ? Number(sub.splitCost) : Number(sub.cost);
              const cost = convertTo(rawCost, sub.currency, currency, rates);
              
              return (
                <div
                  key={sub.id}
                  className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg border border-border bg-background text-xs font-bold leading-none">
                       <span className="text-[10px] text-muted-foreground uppercase">{dayjs(sub.nextRenewalDate).format("MMM")}</span>
                       <span className="text-sm">{dayjs(sub.nextRenewalDate).format("D")}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm line-clamp-1">{sub.vendor.name}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {sub.daysLeft === 0 ? (
                           <span className="text-primary font-bold">Due Today</span>
                        ) : sub.daysLeft === 1 ? (
                           <span className="text-primary font-medium">Tomorrow</span>
                        ) : (
                           `in ${sub.daysLeft} days`
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{formatCurrency(cost, currency)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}