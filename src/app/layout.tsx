// app/layout.tsx
// "use client";
import { type ReactNode } from "react";
import { Header } from "~/pages/components/Header";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import Head from "next/head";
import "~/styles/globals.css";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <title>Next.js 13 with Clerk</title>
      </Head>
      <ClerkProvider>
        <body>
          <div className="min-h-screen bg-white">
            <Header />
            <main className="flex-grow">{children}</main>
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
};

export default Layout;
