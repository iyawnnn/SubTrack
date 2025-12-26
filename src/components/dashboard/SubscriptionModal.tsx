"use client";

import { useForm } from "@mantine/form";
import {
  Modal,
  TextInput,
  NumberInput,
  Select,
  Button,
  Group,
  Switch,
  Stack,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import {
  addSubscription,
  updateSubscription,
} from "@/actions/subscription-actions";
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CURRENCIES, CURRENCY_SYMBOLS } from "@/lib/currency-helper"; // Ensure this import exists

interface SubscriptionData {
  id: string;
  vendor: { name: string };
  cost: number;
  currency: string; // 👈 Ensure this is here
  frequency: string;
  startDate: Date;
  isTrial: boolean;
  category: string;
}

interface SubscriptionModalProps {
  opened: boolean;
  close: () => void;
  subToEdit?: SubscriptionData | null;
}

const CATEGORIES = [
  "Entertainment",
  "Work",
  "Utilities",
  "Dev Tools",
  "Personal",
];

export function SubscriptionModal({
  opened,
  close,
  subToEdit,
}: SubscriptionModalProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: "",
      cost: 0,
      currency: "USD", // 👈 Default value
      frequency: "MONTHLY",
      category: "Personal",
      startDate: new Date(),
      isTrial: false,
    },
    validate: {
      name: (value) => (value.length < 2 ? "Name is too short" : null),
      cost: (value) => (value < 0 ? "Cost cannot be negative" : null),
      startDate: (value) => (!value ? "Date is required" : null),
    },
  });

  // Get dynamic symbol
  const currentSymbol = CURRENCY_SYMBOLS[form.values.currency] || "$";

  useEffect(() => {
    if (subToEdit) {
      form.setValues({
        name: subToEdit.vendor.name,
        cost: Number(subToEdit.cost),
        currency: subToEdit.currency || "USD", // 👈 Load existing currency
        frequency: subToEdit.frequency,
        category: subToEdit.category || "Personal",
        startDate: new Date(subToEdit.startDate),
        isTrial: subToEdit.isTrial,
      });
    } else {
      form.reset();
    }
  }, [subToEdit]);

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    let result;

    const payload = {
      ...values,
      frequency: values.frequency as "MONTHLY" | "YEARLY",
    };

    if (subToEdit) {
      result = await updateSubscription(subToEdit.id, payload);
    } else {
      result = await addSubscription(payload);
    }

    setLoading(false);

    if (result.success) {
      notifications.show({
        title: "Success",
        message: subToEdit ? "Subscription updated" : "Subscription added",
        color: "green",
      });
      if (!subToEdit) form.reset();
      router.refresh();
      close();
    } else {
      notifications.show({
        title: "Error",
        message: result.message,
        color: "red",
      });
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        close();
        form.reset();
      }}
      title={subToEdit ? "Edit Subscription" : "Add Subscription"}
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Vendor Name"
            placeholder="Netflix, AWS, etc."
            required
            {...form.getInputProps("name")}
          />

          <Group grow align="flex-start">
            <NumberInput
              label="Price"
              decimalScale={2}
              allowNegative={false}
              prefix={currentSymbol + " "}
              required
              {...form.getInputProps("cost")}
              style={{ flex: 2 }}
            />
            {/* 👇 THIS WAS MISSING IN YOUR FILE.
               Make sure this Select component is here!
            */}
            <Select
              label="Currency"
              data={CURRENCIES}
              required
              allowDeselect={false}
              searchable
              {...form.getInputProps("currency")}
              style={{ flex: 1 }}
            />
          </Group>

          <Group grow>
            <Select
              label="Billing Cycle"
              data={["MONTHLY", "YEARLY"]}
              required
              allowDeselect={false}
              {...form.getInputProps("frequency")}
            />
            <Select
              label="Category"
              data={CATEGORIES}
              required
              allowDeselect={false}
              {...form.getInputProps("category")}
            />
          </Group>

          <DatePickerInput
            label="Start Date"
            placeholder="Pick a date"
            required
            {...form.getInputProps("startDate")}
          />

          <Group justify="space-between" mt="xs">
            <Switch
              label="This is a Free Trial"
              {...form.getInputProps("isTrial", { type: "checkbox" })}
            />
          </Group>

          <Button type="submit" fullWidth loading={loading} mt="md">
            {subToEdit ? "Update Subscription" : "Save Subscription"}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
