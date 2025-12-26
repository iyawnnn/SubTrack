"use client";

import {
  Select,
  Group,
  Text,
  Switch,
  Button,
  Stack,
  useMantineColorScheme,
} from "@mantine/core";
import { useState } from "react";
import { updateUserSettings } from "@/actions/user-actions";
import { notifications } from "@mantine/notifications";
import { IconSun, IconMoon } from "@tabler/icons-react";

const CURRENCIES = ["USD", "PHP", "EUR", "GBP", "AUD", "CAD", "JPY"];

export function SettingsForm({ initialCurrency }: { initialCurrency: string }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [currency, setCurrency] = useState<string | null>(initialCurrency);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!currency) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("preferredCurrency", currency);

    const result = await updateUserSettings(formData);

    if (result.success) {
      notifications.show({
        title: "Saved",
        message: "Preferences updated",
        color: "green",
      });
    } else {
      notifications.show({
        title: "Error",
        message: "Failed to save",
        color: "red",
      });
    }
    setLoading(false);
  };

  return (
    <Stack gap="xl">
      {/* Theme Switcher */}
      <Group justify="space-between">
        <div>
          <Text fw={500}>Appearance</Text>
          <Text size="sm" c="dimmed">
            Toggle between Light and Dark mode
          </Text>
        </div>
        <Switch
          size="lg"
          onLabel={<IconSun size={16} />}
          offLabel={<IconMoon size={16} />}
          checked={colorScheme === "light"}
          onChange={() => toggleColorScheme()}
        />
      </Group>

      {/* Currency Select */}
      <Group justify="space-between">
        <div>
          <Text fw={500}>Base Currency</Text>
          <Text size="sm" c="dimmed">
            This will be used to calculate your total burn rate
          </Text>
        </div>
        <Select
          data={CURRENCIES}
          value={currency}
          onChange={setCurrency}
          w={120}
          allowDeselect={false}
        />
      </Group>

      <Group justify="flex-end" mt="md">
        <Button onClick={handleSave} loading={loading}>
          Save Changes
        </Button>
      </Group>
    </Stack>
  );
}
