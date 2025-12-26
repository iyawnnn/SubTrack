"use client";

import { SimpleGrid, Card, Text, Group, Badge, ThemeIcon, Progress, ActionIcon, Menu, rem } from "@mantine/core";
import { IconDots, IconCreditCard, IconCalendar, IconExternalLink } from "@tabler/icons-react";
import dayjs from "dayjs";
import { formatCurrency } from "@/lib/currency-helper";
import { motion } from "framer-motion";

// Re-using your interface
interface Subscription {
  id: string;
  vendor: { name: string; website: string | null };
  cost: number;
  currency: string;
  frequency: string;
  nextRenewalDate: Date;
  category: string;
}

const MotionCard = motion.create(Card);

export function SubscriptionGrid({ data }: { data: Subscription[] }) {
  
  if (data.length === 0) {
    return <Text ta="center" c="dimmed" py="xl">No subscriptions found. Press ⌘K to add one.</Text>;
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
      {data.map((sub, index) => {
        const daysLeft = dayjs(sub.nextRenewalDate).diff(dayjs(), 'day');
        // Calculate progress (visual flair): arbitrary 30 day cycle for visual
        const progressValue = Math.max(0, Math.min(100, (daysLeft / 30) * 100)); 
        const isUrgent = daysLeft <= 3;

        return (
          <MotionCard
            key={sub.id}
            padding="lg"
            radius="md"
            withBorder
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            style={{ cursor: 'pointer' }}
            // Add hover effect in CSS or via sx
          >
            <Group justify="space-between" mb="xs">
              <Group gap="sm">
                <ThemeIcon size="lg" radius="md" variant="light" color="violet">
                  {/* Replace with actual logo if available, else Icon */}
                  <IconCreditCard size={20} />
                </ThemeIcon>
                <div>
                  <Text fw={600}>{sub.vendor.name}</Text>
                  <Text size="xs" c="dimmed">{sub.category}</Text>
                </div>
              </Group>
              <Menu position="bottom-end">
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray"><IconDots size={16} /></ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>Edit</Menu.Item>
                  <Menu.Item color="red">Archive</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>

            <Group align="flex-end" gap={4} mt="md">
              <Text size="xl" fw={700} lh={1}>
                {formatCurrency(sub.cost, sub.currency)}
              </Text>
              <Text size="sm" c="dimmed" mb={2}>
                /{sub.frequency === "MONTHLY" ? "mo" : "yr"}
              </Text>
            </Group>

            <Group justify="space-between" mt="md" mb={4}>
              <Badge 
                color={isUrgent ? "red" : "gray"} 
                variant={isUrgent ? "light" : "outline"} 
                size="sm"
              >
                {daysLeft < 0 ? "Overdue" : `${daysLeft} days left`}
              </Badge>
              <Text size="xs" c="dimmed">
                {dayjs(sub.nextRenewalDate).format("MMM D")}
              </Text>
            </Group>

            <Progress 
              value={100 - progressValue} // Reverse: Empty means time is running out? Or Full means safe? 
              // Better: Full bar = Full month. 
              color={isUrgent ? "red" : "violet"} 
              size="sm" 
              radius="xl" 
              mt="xs" 
            />
          </MotionCard>
        );
      })}
    </SimpleGrid>
  );
}