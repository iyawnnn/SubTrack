"use client";

import { Avatar, Menu, rem, Text, ActionIcon } from "@mantine/core";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface UserMenuProps {
  image?: string | null;
  name?: string | null;
  email?: string | null;
}

export function UserMenu({ image, name, email }: UserMenuProps) {
  const getInitials = (n?: string | null) => {
    if (!n) return "??";
    return n
      .split(" ")
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <Menu 
      shadow="lg" 
      width={260} // Wider for better mobile readability
      position="bottom-end" 
      withArrow 
      arrowPosition="center"
      trigger="click" // 👈 FIX: Forces click-only (stops hover glitches on mobile)
      zIndex={1000}   // 👈 FIX: Ensures it sits above everything
      withinPortal    // 👈 FIX: Renders outside the DOM hierarchy to avoid clipping
      transitionProps={{ transition: 'pop-top-right', duration: 200 }}
    >
      <Menu.Target>
        {/* 👇 FIX: Changed to ActionIcon for better touch handling */}
        <ActionIcon 
          variant="transparent" 
          size="lg" 
          radius="xl"
          aria-label="User menu"
        >
          <Avatar 
            src={image} 
            radius="xl" 
            size={36} 
            color="violet" 
            style={{ cursor: 'pointer' }}
          >
            {getInitials(name)}
          </Avatar>
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown p="xs">
        <Menu.Label pb={4}>Signed in as</Menu.Label>
        <Menu.Item 
          leftSection={<IconUser size={16} />} 
          disabled 
          style={{ opacity: 1, color: 'var(--mantine-color-text)' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Text size="sm" fw={600}>{name || "User"}</Text>
            <Text size="xs" c="dimmed" style={{ wordBreak: 'break-all' }}>
              {email}
            </Text>
          </div>
        </Menu.Item>
        
        <Menu.Divider my="xs" />

        <Menu.Label>Settings</Menu.Label>
        
        {/* 👇 Larger touch targets (py={8}) */}
        <Menu.Item 
          component={Link}
          href="/settings"
          py={8}
          leftSection={<IconSettings style={{ width: rem(18), height: rem(18) }} />}
        >
          <Text size="sm">Account settings</Text>
        </Menu.Item>
        
        <Menu.Divider my="xs" />
        
        <Menu.Item 
          color="red" 
          py={8}
          leftSection={<IconLogout style={{ width: rem(18), height: rem(18) }} />}
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <Text size="sm">Sign out</Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}