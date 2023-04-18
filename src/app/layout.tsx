// app/layout.tsx
// "use client";
import { type ReactNode } from "react";
import { Header } from "~/pages/components/Header";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import "~/styles/globals.css";

type LayoutProps = {
  children: ReactNode;
};

export const metadata = {
  title: "EduBuddy",
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
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
