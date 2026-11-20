import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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
      <body className="min-h-screen bg-[#303136] font-sans text-sm text-zinc-200 antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
