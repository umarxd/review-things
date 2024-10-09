import "~/styles/globals.css";

import { Roboto_Mono } from "next/font/google";
import { type Metadata } from "next";
import Navbar from "~/components/Navbar";
import Providers from "~/components/Providers";
import { ThemeProvider } from "~/components/ui/theme-provider";
import { ThemeToggle } from "~/components/ui/theme-toggle";

const robotoMono = Roboto_Mono({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Review Things",
  description: "Reviewing app created using nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`bg-background ${robotoMono.className} `}>
      <body>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />

            <div className="h-screen py-12">{children}</div>
            <div className="fixed bottom-2 left-2">
              <ThemeToggle />
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
