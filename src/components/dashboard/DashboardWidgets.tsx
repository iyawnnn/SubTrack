"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Zap, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/currency-helper";

interface StatCardProps {
  title: string;
  value: string;
  trend?: string; // e.g. "+12% from last month"
  icon: React.ReactNode;
  colorClass: string;
}

export function StatCard({ title, value, icon, colorClass }: StatCardProps) {
  return (
    <Card className="border-border bg-card shadow-sm transition-all hover:shadow-md h-full">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-foreground tracking-tight">{value}</h3>
        </div>
        <div className={`rounded-xl p-3 ${colorClass}`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsGrid({
  monthlyBurn,
  annualProjection,
  activeTrials,
  totalSaved,
  currency,
}: any) {
  return (
    <>
      <StatCard 
        title="Monthly Burn" 
        value={formatCurrency(monthlyBurn, currency)} 
        icon={<TrendingDown className="h-5 w-5" />} 
        colorClass="bg-red-500/10 text-red-500 dark:bg-red-500/20"
      />
      <StatCard 
        title="Annual Forecast" 
        value={formatCurrency(annualProjection, currency)} 
        icon={<TrendingUp className="h-5 w-5" />} 
        colorClass="bg-blue-500/10 text-blue-500 dark:bg-blue-500/20"
      />
      <StatCard 
        title="Active Trials" 
        value={activeTrials.toString()} 
        icon={<Zap className="h-5 w-5" />} 
        colorClass="bg-amber-500/10 text-amber-500 dark:bg-amber-500/20"
      />
      <StatCard 
        title="Total Saved" 
        value={formatCurrency(totalSaved, currency)} 
        icon={<Wallet className="h-5 w-5" />} 
        colorClass="bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20"
      />
    </>
  );
}