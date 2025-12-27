import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  weight: "300 900",
});

export const metadata: Metadata = {
  title: "SubTrack",
  description: "Manage your subscriptions with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 👇 FIX: Removed className="dark" so the theme provider controls it
    <html lang="en" suppressHydrationWarning>
      <body className={`${satoshi.variable} font-satoshi antialiased bg-background text-foreground`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-right" richColors closeButton />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}