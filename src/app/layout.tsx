import { type ReactNode } from "react";
import { Header } from "~/app/(components)/Header";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import Links from "./(components)/Links";
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
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css"
          integrity="sha384-KyZXEAg3QhqLMpG8r+Knujsl5/1ityelerikPDzjey9QkV/DkzE+BxwFPTw+J6KK2"
          crossOrigin="anonymous"
        />
      </head>
      <ClerkProvider>
        <body>
          <div className="min-h-screen bg-white">
            <Header>
              <Links />
            </Header>
            <main className="flex-grow">{children}</main>
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
};

export default Layout;
