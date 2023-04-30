import { auth } from "@clerk/nextjs/app-beta";
import Link from "next/link";

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

export default function Links() {
  const { userId } = auth();

  return (
    <>
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
    </>
  );
}
