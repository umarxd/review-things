import "~/styles/globals.css";

import { Roboto_Mono } from "next/font/google";
import { type Metadata } from "next";
import Navbar from "~/components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Providers from "~/components/Providers";

const robotoMono = Roboto_Mono({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={` ${robotoMono.className} `}>
      <body>
        <Providers>
          <Navbar />

          <div className="h-screen py-8">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
