"use client";

import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Group,
  Title,
  Button,
  Container,
  Text,
  UnstyledButton,
  Stack,
  ThemeIcon,
  Kbd, // 👈 Import Kbd
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconSearch,
  IconLayoutDashboard,
  IconArchive,
  IconGridDots,
  IconX,
  IconChevronRight,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "./UserMenu";
import { spotlight } from "@mantine/spotlight";
import { AnimatePresence, motion } from "framer-motion";

interface DashboardShellProps {
  children: React.ReactNode;
  user: { name?: string | null; email?: string | null; image?: string | null };
}

export function DashboardShell({ children, user }: DashboardShellProps) {
  const pathname = usePathname();
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure(false);

  const navLinks = [
    { link: "/dashboard", label: "Overview", icon: IconLayoutDashboard },
    { link: "/archive", label: "Archive", icon: IconArchive },
  ];

  return (
    <AppShell header={{ height: 70 }} padding="md">
      <AppShellHeader className="glass-header" withBorder={false}>
        <Container size="xl" h="100%">
          <Group h="100%" justify="space-between" wrap="nowrap">
            
            {/* LEFT: Brand + Links */}
            <Group gap="xl">
              <Title order={3} c="violet" style={{ letterSpacing: '-0.5px' }}>
                SubTrack
              </Title>

              <Group gap="xs" visibleFrom="sm">
                {navLinks.map((item) => {
                  const isActive = pathname === item.link;
                  return (
                    <Button
                      key={item.link}
                      component={Link}
                      href={item.link}
                      variant={isActive ? "light" : "subtle"}
                      color={isActive ? "violet" : "gray"}
                      size="sm"
                      radius="md"
                      fw={isActive ? 600 : 500}
                      leftSection={<item.icon size={16} />}
                    >
                      {item.label}
                    </Button>
                  );
                })}
              </Group>
            </Group>

            {/* RIGHT: Search + User + Mobile Toggle */}
            <Group gap="sm">
              
              {/* Desktop Search Bar */}
              <UnstyledButton
                onClick={() => spotlight.open()}
                visibleFrom="sm"
                w={260}
                className="search-trigger" // Uses new CSS for white bg + darker border
                style={{
                  borderRadius: '8px',
                  padding: '6px 8px 6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.2s',
                }}
              >
                <IconSearch size={14} style={{ opacity: 0.5 }} />
                <Text size="sm" style={{ flex: 1, color: 'inherit', opacity: 0.7 }}>Search</Text>
                
                {/* 👇 The Command+K Badge */}
                <Kbd size="xs" style={{ fontSize: '10px', fontWeight: 700 }}>⌘K</Kbd>
              </UnstyledButton>

              <UnstyledButton hiddenFrom="sm" onClick={() => spotlight.open()}>
                <ThemeIcon variant="default" size="lg" radius="md">
                  <IconSearch size={18} />
                </ThemeIcon>
              </UnstyledButton>

              <UserMenu image={user?.image} name={user?.name} email={user?.email} />

              <ActionIconTrigger opened={mobileOpened} onClick={toggleMobile} />
            </Group>

          </Group>
        </Container>
      </AppShellHeader>

      <AppShellMain>
        <Container size="xl">
          {children}
        </Container>
      </AppShellMain>

      <AnimatePresence>
        {mobileOpened && (
          <MobileMenuOverlay 
            links={navLinks} 
            onClose={closeMobile} 
            pathname={pathname}
          />
        )}
      </AnimatePresence>

    </AppShell>
  );
}

// ... ActionIconTrigger and MobileMenuOverlay remain unchanged ...
function ActionIconTrigger({ opened, onClick }: { opened: boolean; onClick: () => void }) {
    return (
      <UnstyledButton
        hiddenFrom="sm"
        onClick={onClick}
        style={{
          width: 34,
          height: 34,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          backgroundColor: opened ? 'var(--mantine-color-default-hover)' : 'transparent',
          color: 'var(--mantine-color-text)',
          transition: 'background-color 0.2s',
        }}
      >
        {opened ? <IconX size={20} /> : <IconGridDots size={20} />}
      </UnstyledButton>
    );
  }
  
  function MobileMenuOverlay({ 
    links, 
    onClose, 
    pathname, 
  }: { 
    links: any[], 
    onClose: () => void, 
    pathname: string,
  }) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="mobile-overlay" 
        style={{
          position: "fixed",
          top: 70, 
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: "blur(12px)",
          zIndex: 100,
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack gap="sm" w="100%" maw={400}>
          <Text c="dimmed" size="xs" fw={700} tt="uppercase" mb="xs">
            Navigation
          </Text>
          
          {links.map((item, index) => (
            <motion.div
              key={item.link}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link 
                href={item.link} 
                onClick={onClose}
                style={{ textDecoration: 'none' }}
              >
                <Group 
                  justify="space-between" 
                  p="md"
                  className="mobile-link"
                  data-active={pathname === item.link}
                  style={{
                    borderRadius: '12px',
                  }}
                >
                  <Group>
                    <ThemeIcon 
                      variant={pathname === item.link ? "filled" : "light"} 
                      color={pathname === item.link ? "violet" : "gray"} 
                      size="lg" 
                      radius="md"
                    >
                      <item.icon size={20} />
                    </ThemeIcon>
                    <Text fw={600} c={pathname === item.link ? "violet" : "var(--mantine-color-text)"}>
                      {item.label}
                    </Text>
                  </Group>
                  <IconChevronRight size={16} color="var(--mantine-color-dimmed)" />
                </Group>
              </Link>
            </motion.div>
          ))}
        </Stack>
      </motion.div>
    );
  }