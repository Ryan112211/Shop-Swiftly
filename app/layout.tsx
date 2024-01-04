import { cn, getCategories } from "@/lib/utils";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { NavigationMenuSwift } from "@/components/navigation-bar";
import { ThemeProvider } from "@/components/theme-provider";
import "react-medium-image-zoom/dist/styles.css";
import { Toaster } from "@/components/ui/sonner";

type RootLayoutProps = {
  children: React.ReactNode;
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getCategories();

  return (
    <html lang="en" suppressHydrationWarning>
      <head />

      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased p-10",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors />
          <NavigationMenuSwift categories={data} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
