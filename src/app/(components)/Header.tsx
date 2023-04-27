import Link from "next/link";
import { auth } from "@clerk/nextjs/app-beta";

type LinkItemProps = {
  href: string;
  children: React.ReactNode;
};
const LinkItem = ({ href = "", children }: LinkItemProps) => {
  return (
    <Link
      className="text-white transition-colors hover:text-accent"
      href={href}
    >
      {children}
    </Link>
  );
};

export const Header: React.FC = () => {
  const { userId } = auth();
  console.log(auth());

  return (
    <header className="bg-primary py-4 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">
            <Link href="/">EduBuddy</Link>
          </div>
          <nav className="space-x-6">
            <LinkItem href="/about">About</LinkItem>
            <LinkItem href="/features">Features</LinkItem>
            <LinkItem href="/pricing">Pricing</LinkItem>
            {!userId && <LinkItem href="/sign-in">Sign In</LinkItem>}
            {!userId && (
              <Link
                className="rounded-md bg-secondary px-6 py-2 transition-colors hover:bg-accent"
                href="/signup"
              >
                Sign Up
              </Link>
            )}
            {userId && <LinkItem href="/dashboard">Dashboard</LinkItem>}
          </nav>
        </div>
      </div>
    </header>
  );
};
