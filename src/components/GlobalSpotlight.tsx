"use client";

import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight";
import { IconSearch, IconDashboard, IconArchive, IconPlus, IconReceipt, IconCreditCard } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { SubscriptionModal } from "./dashboard/SubscriptionModal";
import { rem, Text, Group, Badge } from "@mantine/core";
import { useMemo } from "react";
// Import styles in your layout or here if using css modules
import '@mantine/spotlight/styles.css';

interface SimpleSub {
  id: string;
  vendorName: string;
}

export function GlobalSpotlight({ subscriptions }: { subscriptions: SimpleSub[] }) {
  const router = useRouter();
  
  // Modal State for "Add Subscription" action
  const [opened, { open, close }] = useDisclosure(false);

  // Memoize actions to prevent unnecessary recalculations (optimizes lag)
  const actions: SpotlightActionData[] = useMemo(() => {
    const staticActions: SpotlightActionData[] = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        description: 'Go to financial overview',
        onClick: () => router.push('/dashboard'),
        leftSection: <IconDashboard style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
      },
      {
        id: 'archive',
        label: 'Archive',
        description: 'View cancelled subscriptions',
        onClick: () => router.push('/archive'),
        leftSection: <IconArchive style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
      },
      {
        id: 'add-new',
        label: 'Add Subscription',
        description: 'Track a new expense',
        onClick: () => open(),
        leftSection: <IconPlus style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
      },
    ];

    const subActions: SpotlightActionData[] = subscriptions.map((sub) => ({
      id: sub.id,
      label: sub.vendorName,
      description: 'View subscription details',
      // 👇 NAVIGATE TO DETAILED PAGE
      onClick: () => router.push(`/subscriptions/${sub.id}`),
      leftSection: <IconCreditCard style={{ width: rem(24), height: rem(24) }} stroke={1.5} color="var(--mantine-color-violet-filled)" />,
    }));

    return [...staticActions, ...subActions];
  }, [subscriptions, router, open]);

  return (
    <>
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        // 👇 LARGER SEARCH BAR STYLING
        searchProps={{
          leftSection: <IconSearch style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
          placeholder: "Search subscriptions or actions...",
          size: "lg", // Makes standard size larger
          styles: {
            input: { height: '60px', fontSize: '1.2rem' } // Custom height override
          }
        }}
        shortcut={['mod + K', '/']}
      />
      
      {/* This Modal lives here so Spotlight can trigger it globally */}
      <SubscriptionModal opened={opened} close={close} subToEdit={null} />
    </>
  );
}