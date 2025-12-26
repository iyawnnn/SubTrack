import type { Metadata } from "next";
import localFont from "next/font/local";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/charts/styles.css";
import "./globals.css";

// Configure Satoshi Font
const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  weight: "300 900",
});

// Create Midnight Azure Theme
const theme = createTheme({
  fontFamily: "var(--font-satoshi)",
  primaryColor: "azure",
  colors: {
    // Custom Azure Blue Palette (Index 6 is #0070f3)
    azure: [
      "#eef3ff",
      "#dce4f5",
      "#b9c7e2",
      "#94a8d0",
      "#748dc1",
      "#5f7cb8",
      "#5474b4",
      "#44639f",
      "#39588f",
      "#0070f3",
    ],
    // Custom Dark Palette to match #161616 surface and #0a0a0a bg
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#373A40",
      "#2C2E33",
      "#25262b",
      "#161616", // Surface/Card color (index 7)
      "#141517",
      "#0a0a0a", // Background color (index 9)
    ],
  },
});

export const metadata: Metadata = {
  title: "SubTrack | B2B Subscription Management",
  description:
    "Manage subscriptions and vendors with enterprise-grade insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={satoshi.variable}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Notifications position="top-right" />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
