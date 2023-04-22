// app/layout.tsx
// "use client";
import { type ReactNode } from "react";
import { Header } from "~/pages/components/Header";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import "~/styles/globals.css";
import { TrpcProvider } from "~/context/TrpcProvider";

type LayoutProps = {
  children: ReactNode;
};

export const metadata = {
  title: "EduBuddy",
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <TrpcProvider>
        <ClerkProvider>
          <body>
            <div className="min-h-screen bg-white">
              <Header />
              <main className="flex-grow">{children}</main>
            </div>
          </body>
        </ClerkProvider>
      </TrpcProvider>
    </html>
  );
};

export default Layout;
