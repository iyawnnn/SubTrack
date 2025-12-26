import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Title, Text, Container, Paper, Divider } from "@mantine/core";
import { SettingsForm } from "@/components/dashboard/SettingsForm"; // Ensure this matches previous implementation

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.id) return null;

  // Fetch current settings
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { preferredCurrency: true },
  });

  return (
    <Container size="sm" py="xl">
      <Title order={2} mb="xs">
        Settings
      </Title>
      <Text c="dimmed" mb="xl">
        Manage your preferences and application defaults.
      </Text>

      <Paper withBorder radius="md" p="xl">
        <Title order={4} mb="md">
          General Preferences
        </Title>
        <Divider mb="lg" />

        {/* Pass initial currency to client form */}
        <SettingsForm initialCurrency={user?.preferredCurrency || "USD"} />
      </Paper>
    </Container>
  );
}
