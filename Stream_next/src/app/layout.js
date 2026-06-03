import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "../../src/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Stream DB",
  description: "To download your desired movies & shows",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scheme-dark dark`}>
      <body className="bg-zinc-900 text-zinc-100 min-h-full text-md py-2 px-2 flex flex-col w-full items-center">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
