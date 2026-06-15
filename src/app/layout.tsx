import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AxeDevtools from "@/components/AxeDevtools/AxeDevtools";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "버디버디 스터디자료모음",
  description: "버디버디 스터디에서 다룬 주제를 정리한 자료 모음",
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face {
            font-family: bbc-icon;
            src:
              url("${basePath}/fonts/bbc-icon/bbc-icon.woff2") format("woff2"),
              url("${basePath}/fonts/bbc-icon/bbc-icon.woff") format("woff"),
              url("${basePath}/fonts/bbc-icon/bbc-icon.ttf") format("truetype");
            font-weight: normal;
            font-style: normal;
          }
        `}} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <AxeDevtools />
      </body>
    </html>
  );
}
