"use client";

import React, { useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { toast } from "sonner";
import { MoreHorizontal, Pencil, Archive, Info } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { SubscriptionModal } from "./SubscriptionModal";
import { formatCurrency, convertTo } from "@/lib/currency-helper";
import { archiveSubscription } from "@/actions/subscription-actions";

export function SubscriptionTable({
  data,
  rates,
  baseCurrency
}: {
  data: any[],
  rates: any,
  baseCurrency: string
}) {
  const [editingSub, setEditingSub] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleArchive = async (id: string) => {
    try {
      const result = await archiveSubscription(id);
      if (result.success) {
        toast.success("Subscription archived");
      } else {
        toast.error("Failed to archive");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (sub: any) => {
    setEditingSub(sub);
    setModalOpen(true);
  };

  if (data.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground">
        No subscriptions found
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead>Vendor</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Next Renewal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((sub) => {
              const isDifferentCurrency = sub.currency !== baseCurrency;
              const convertedCost = isDifferentCurrency
                ? convertTo(sub.cost, sub.currency, baseCurrency, rates)
                : null;

              const badgeVariant = sub.isTrial ? "secondary" : "outline";

              return (
                <TableRow
                  key={sub.id}
                  // 👇 FIX: Use hover:bg-muted/50 instead of white/5
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <TableCell>
                    {/* 👇 FIX: Use text-foreground instead of text-white */}
                    <Link href={`/subscriptions/${sub.id}`} className="font-medium text-foreground hover:underline">
                      {sub.vendor.name}
                    </Link>
                    <div className="text-xs text-muted-foreground">{sub.category}</div>
                  </TableCell>
                  
                  <TableCell>
                     <div className="flex flex-col">
                       <span className="font-medium text-foreground">
                         {formatCurrency(sub.cost, sub.currency)}
                         <span className="text-xs text-muted-foreground ml-1 font-normal">/ {sub.frequency === "MONTHLY" ? "mo" : "yr"}</span>
                       </span>
                       
                       {isDifferentCurrency && convertedCost && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                            <span>≈ {formatCurrency(convertedCost, baseCurrency)}</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="h-3 w-3 opacity-50 hover:opacity-100" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  Converted to {baseCurrency}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                       )}
                     </div>
                  </TableCell>
                  
                  <TableCell className="text-muted-foreground">
                      {dayjs(sub.nextRenewalDate).format("MMM D, YYYY")}
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant={badgeVariant}>
                      {sub.isTrial ? "Trial" : "Active"}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(sub)}>
                          Edit Subscription
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleArchive(sub.id)} className="text-destructive focus:text-destructive">
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      
      <SubscriptionModal
        opened={modalOpen}
        close={() => setModalOpen(false)}
        subToEdit={editingSub}
      />
    </>
  );
}