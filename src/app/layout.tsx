import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/charts/styles.css";

import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
  createTheme,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { SessionProvider } from "next-auth/react";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  weight: "300 900",
});

export const metadata: Metadata = {
  title: "SubTrack",
  description: "Manage your subscriptions with ease.",
};

// 👇 1. Define the Global Theme Here
const theme = createTheme({
  primaryColor: "violet",
  fontFamily: "var(--font-satoshi)",
  defaultRadius: "md",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${satoshi.variable} antialiased`}>
        <SessionProvider>
          {/* 👇 2. Pass the theme to the provider */}
          <MantineProvider theme={theme} defaultColorScheme="auto">
            <Notifications position="top-right" />
            {children}
          </MantineProvider>
        </SessionProvider>
      </body>
    </html>
  );
}