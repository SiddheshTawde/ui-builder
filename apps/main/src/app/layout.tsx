import type { Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import "@repo/ui-components/dist/index.css";
import Header from "@root/components/core/header.core";
import { Toaster } from "@root/components/ui/toaster";

export const metadata: Metadata = {
  title: "UI Builder",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${GeistSans.variable} ${GeistMono.variable}`}
        suppressHydrationWarning={true}
      >
        <body>
          <Header />
          {children}

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}