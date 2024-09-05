"use client";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Layout from "@/components/sections/layout";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/lib/config";
import { BalanceProvider } from "@/components/sections/context";
import { AirstackProvider } from "@airstack/airstack-react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
const airstackApiKey = process.env.NEXT_PUBLIC_AIRSTACK_API_KEY ?? "";

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <html lang="en" suppressHydrationWarning>
          <head />
          <body
            className={cn(
              "h-screen bg-accent font-sans antialiased",
              fontSans.variable
            )}
          >
            <ThemeProvider attribute="class" defaultTheme="dark">
              <BalanceProvider>
                <AirstackProvider apiKey={airstackApiKey}>
                  <Layout>
                    {children}
                    <ThemeSwitcher />
                    <Toaster />
                  </Layout>
                </AirstackProvider>
              </BalanceProvider>
            </ThemeProvider>
          </body>
        </html>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
