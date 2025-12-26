"use client";

import {
  Grid,
  Paper,
  Group,
  ThemeIcon,
  Text,
  Stack,
  Title,
} from "@mantine/core";
import {
  IconCoin,
  IconCalendarStats,
  IconAlertCircle,
} from "@tabler/icons-react";
import { StaggerContainer, StaggerItem, StatCard } from "./DashboardMotion";
import { SpendingChart } from "./SpendingChart";
import { CategoryChart } from "./CategoryChart";
import { UpcomingBills } from "./UpcomingBills";
import { SubscriptionTable } from "./SubscriptionTable";
import { InsightsCard, GraveyardCard, ForecastWidget } from "./Insights";
import { formatCurrency } from "@/lib/currency-helper";

// --- Types ---
interface Subscription {
  id: string;
  vendor: { name: string; website: string | null };
  cost: number;
  currency: string;
  frequency: string;
  startDate: Date;
  nextRenewalDate: Date;
  isTrial: boolean;
  category: string;
}

interface DashboardDataProps {
  subs: Subscription[];
  monthlyBurn: number;
  annualProjection: number;
  activeTrials: number;
  currency: string; // 👈 Added currency prop
}

// --- 1. Stats Section ---
export function StatsSection({
  monthlyBurn,
  annualProjection,
  activeTrials,
  currency,
}: DashboardDataProps) {
  return (
    <StaggerContainer>
      <Grid gutter="md" mb="xl">
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <StaggerItem>
            <StatCard shadow="xs" p="xl" radius="md" withBorder>
              <Group>
                <ThemeIcon color="blue" variant="light" size={48} radius="md">
                  <IconCoin size="1.5rem" stroke={1.5} />
                </ThemeIcon>
                <div>
                  <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                    Monthly Burn
                  </Text>
                  {/* Updated to use dynamic currency */}
                  <Text fw={700} size="xl">
                    {formatCurrency(monthlyBurn, currency || "USD")}
                  </Text>
                </div>
              </Group>
            </StatCard>
          </StaggerItem>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 4 }}>
          <StaggerItem>
            <StatCard shadow="xs" p="xl" radius="md" withBorder>
              <Group>
                <ThemeIcon color="violet" variant="light" size={48} radius="md">
                  <IconCalendarStats size="1.5rem" stroke={1.5} />
                </ThemeIcon>
                <div>
                  <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                    Annual Projection
                  </Text>
                  {/* Updated to use dynamic currency */}
                  <Text fw={700} size="xl">
                    {formatCurrency(annualProjection, currency || "USD")}
                  </Text>
                </div>
              </Group>
            </StatCard>
          </StaggerItem>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 4 }}>
          <StaggerItem>
            <StatCard shadow="xs" p="xl" radius="md" withBorder>
              <Group>
                <ThemeIcon color="orange" variant="light" size={48} radius="md">
                  <IconAlertCircle size="1.5rem" stroke={1.5} />
                </ThemeIcon>
                <div>
                  <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                    Active Trials
                  </Text>
                  <Text fw={700} size="xl">
                    {activeTrials}
                  </Text>
                </div>
              </Group>
            </StatCard>
          </StaggerItem>
        </Grid.Col>
      </Grid>
    </StaggerContainer>
  );
}

// --- 2. NEW: Insights Section ---
export function InsightsSection({
  redundancy,
  graveyard,
  runway,
  currency,
}: {
  redundancy: any[];
  graveyard: any;
  runway: any;
  currency: string;
}) {
  return (
    <StaggerContainer>
      <Grid gutter="md" mb="xl">
        {/* Redundancy Alert - Only shows if there are duplicates */}
        {redundancy.length > 0 && (
          <Grid.Col span={{ base: 12, md: 4 }}>
            <StaggerItem>
              <InsightsCard redundancies={redundancy} />
            </StaggerItem>
          </Grid.Col>
        )}

        {/* Graveyard Stats (Money Saved) */}
        <Grid.Col span={{ base: 12, md: redundancy.length > 0 ? 4 : 6 }}>
          <StaggerItem>
            <GraveyardCard
              savedAmount={graveyard.totalSavedMonthly}
              currency={currency}
            />
          </StaggerItem>
        </Grid.Col>

        {/* Forecast Widget (Runway) */}
        <Grid.Col span={{ base: 12, md: redundancy.length > 0 ? 4 : 6 }}>
          <StaggerItem>
            <ForecastWidget
              d30={runway.d30}
              d60={runway.d60}
              d90={runway.d90}
              currency={currency}
            />
          </StaggerItem>
        </Grid.Col>
      </Grid>
    </StaggerContainer>
  );
}

// --- 3. Charts Section ---
export function ChartsSection({ subs }: { subs: Subscription[] }) {
  return (
    <StaggerContainer>
      <Grid gutter="md" mb="xl">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <StaggerItem style={{ height: "100%" }}>
            <SpendingChart data={subs} />
          </StaggerItem>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <StaggerItem>
            <Stack>
              <CategoryChart data={subs} />
              <UpcomingBills data={subs} />
            </Stack>
          </StaggerItem>
        </Grid.Col>
      </Grid>
    </StaggerContainer>
  );
}

// --- 4. Table Section ---
export function TableSection({ subs }: { subs: Subscription[] }) {
  return (
    <StaggerContainer>
      <StaggerItem>
        <Paper p="md" withBorder radius="md">
          <Title order={4} mb="md" px="xs">
            Active Subscriptions
          </Title>
          <SubscriptionTable data={subs} />
        </Paper>
      </StaggerItem>
    </StaggerContainer>
  );
}
