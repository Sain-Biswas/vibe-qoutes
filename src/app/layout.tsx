import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Snippets — Capture Wisdom, Organize Insight",
  description:
    "Save meaningful passages from Kafka, Dostoevsky, the Quran, Bible, Gita and more. Organize with tags, trace sources, and deepen your understanding of the world's greatest literature and philosophy.",
  keywords: [
    "snippets",
    "reading",
    "quotes",
    "philosophy",
    "religion",
    "literature",
    "books",
    "notes",
    "highlights",
    "Kafka",
    "Dostoevsky",
    "Quran",
    "Bible",
    "Gita",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
