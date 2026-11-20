import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppShell } from "@/components/kronos/app-shell";
import { Toaster } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: { default: "Kronos", template: "%s · Kronos" },
  description: "Kronos human resources dashboard",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Dark only, by design.
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="min-h-screen font-sans text-sm antialiased">
        <TooltipProvider>
          <Toaster>
            <AppShell>{children}</AppShell>
          </Toaster>
        </TooltipProvider>
      </body>
    </html>
  );
}
