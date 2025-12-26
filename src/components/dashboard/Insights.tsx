"use client";

import { Paper, Text, Group, ThemeIcon, RingProgress, Stack, Badge, Grid } from "@mantine/core";
import { IconAlertTriangle, IconLeaf, IconTrendingUp } from "@tabler/icons-react";
import { formatCurrency } from "@/lib/currency-helper";

// --- 1. Redundancy / Insights Card ---
export function InsightsCard({ redundancies }: { redundancies: any[] }) {
  if (redundancies.length === 0) return null; // Don't show if empty

  return (
    <Paper p="md" radius="md" withBorder style={{ borderColor: 'var(--mantine-color-orange-8)' }}>
      <Group mb="xs">
        <ThemeIcon color="orange" variant="light">
          <IconAlertTriangle size={18} />
        </ThemeIcon>
        <Text fw={600} size="sm">Redundancy Alerts</Text>
      </Group>
      
      <Stack gap="xs">
        {redundancies.map((item) => (
          <Group key={item.category} justify="space-between" align="center">
            <div>
              <Text size="xs" c="dimmed">{item.category}</Text>
              <Text size="xs" fw={500}>{item.vendors.join(", ")}</Text>
            </div>
            <Badge color="orange" variant="light">{item.count} Subs</Badge>
          </Group>
        ))}
      </Stack>
    </Paper>
  );
}

// --- 2. Graveyard (Savings) Card ---
export function GraveyardCard({ savedAmount, currency }: { savedAmount: number, currency: string }) {
  return (
    <Paper p="md" radius="md" withBorder style={{ borderColor: 'var(--mantine-color-teal-8)' }}>
      <Group>
        <ThemeIcon color="teal" variant="light" size="lg" radius="md">
          <IconLeaf size={24} />
        </ThemeIcon>
        <div>
          <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
            Total Saved
          </Text>
          <Text fw={700} size="xl" c="teal">
            {formatCurrency(savedAmount, currency)}/mo
          </Text>
        </div>
      </Group>
      <Text size="xs" c="dimmed" mt="sm">
        From cancelled subscriptions
      </Text>
    </Paper>
  );
}

// --- 3. Forecast Widget (Runway) ---
export function ForecastWidget({ d30, d60, d90, currency }: { d30: number, d60: number, d90: number, currency: string }) {
  return (
    <Paper p="md" radius="md" withBorder>
      <Group mb="md">
        <ThemeIcon color="violet" variant="light">
          <IconTrendingUp size={18} />
        </ThemeIcon>
        <Text fw={600} size="sm">Cash Flow Forecast</Text>
      </Group>

      <Grid>
        <Grid.Col span={4}>
          <Stack gap={2} align="center">
            <Text size="xs" c="dimmed">30 Days</Text>
            <Text fw={600} size="sm">{formatCurrency(d30, currency)}</Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={4} style={{ borderLeft: '1px solid var(--mantine-color-default-border)' }}>
          <Stack gap={2} align="center">
            <Text size="xs" c="dimmed">60 Days</Text>
            <Text fw={600} size="sm">{formatCurrency(d60, currency)}</Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={4} style={{ borderLeft: '1px solid var(--mantine-color-default-border)' }}>
          <Stack gap={2} align="center">
            <Text size="xs" c="dimmed">90 Days</Text>
            <Text fw={600} size="sm">{formatCurrency(d90, currency)}</Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}