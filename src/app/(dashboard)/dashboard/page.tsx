import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { calculateMonthlyBurnRate } from "@/lib/calculations";
import { Group, Title, Text, Container } from "@mantine/core";
import { AddButton } from "@/components/dashboard/AddButton";
import {
  StatsSection,
  ChartsSection,
  TableSection,
  InsightsSection,
} from "@/components/dashboard/DashboardWidgets";

// Intelligence Imports
import {
  getRedundancyInsights,
  getGraveyardStats,
  getCashFlowRunway,
} from "@/lib/intelligence";

// Static Rates (In a real app, fetch these from DB or API)
const RATES = {
  USD: 1,
  PHP: 58.0,
  EUR: 0.93,
  GBP: 0.79,
  AUD: 1.52,
  CAD: 1.36,
  JPY: 155.0,
};

async function getSubscriptionData() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const data = await prisma.subscription.findMany({
    where: { userId: session.user.id },
    orderBy: { cost: "desc" },
    include: { vendor: true },
  });

  return data.map((sub) => ({
    ...sub,
    cost: Number(sub.cost),
    // Ensure these match the types expected by intelligence.ts
    status: sub.status as string,
    frequency: sub.frequency as string,
  }));
}

export default async function DashboardPage() {
  const session = await auth();
  const subs = await getSubscriptionData();

  // 1. Get User's Preferred Currency (Default to USD if not set)
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: { preferredCurrency: true },
  });
  const baseCurrency = user?.preferredCurrency || "USD";

  // 2. Financial Engine (Pass rates & currency)
  const monthlyBurn = calculateMonthlyBurnRate(subs, RATES, baseCurrency);
  const annualProjection = monthlyBurn * 12;
  const activeTrials = subs.filter((s) => s.isTrial).length;

  // 3. Intelligence Engine 🧠
  const redundancy = getRedundancyInsights(subs);
  const graveyard = getGraveyardStats(subs, RATES, baseCurrency);
  const runway = getCashFlowRunway(subs, RATES, baseCurrency);

  // Bundle data
  const dashboardData = {
    subs,
    monthlyBurn,
    annualProjection,
    activeTrials,
    currency: baseCurrency,
  };

  return (
    <Container size="lg" py="lg">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2}>Financial Overview</Title>
          <Text c="dimmed">Track your recurring expenses in one place.</Text>
        </div>
        <AddButton />
      </Group>

      {/* 1. Main Stats (Burn Rate, etc.) */}
      <StatsSection {...dashboardData} />

      {/* 2. Intelligence Layer (Redundancy, Graveyard, Forecast) */}
      <InsightsSection
        redundancy={redundancy}
        graveyard={graveyard}
        runway={runway}
        currency={baseCurrency}
      />

      {/* 3. Charts */}
      <ChartsSection subs={subs} />

      {/* 4. Table */}
      <TableSection subs={subs} />
    </Container>
  );
}
