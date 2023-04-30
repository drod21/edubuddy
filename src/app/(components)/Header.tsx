"use client";
import Link from "next/link";
import { type ReactNode, useState } from "react";

export const Header = (props: { children: ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-primary py-4 text-white">
      <div className="container mx-auto px-4">
        <div
          className={`flex items-center justify-${
            mobileMenuOpen ? "center" : "between"
          }`}
        >
          <div
            className={`${mobileMenuOpen ? "hidden" : ""} text-2xl font-bold `}
          >
            <Link href="/">EduBuddy</Link>
          </div>
          <div className={mobileMenuOpen ? "hidden" : "block"}>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="text-neutral focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <nav
            className={`${
              mobileMenuOpen
                ? "flex h-screen flex-col justify-center"
                : "hidden"
            } space-y-4 md:flex md:space-x-6 md:space-y-0`}
          >
            {props.children}
          </nav>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-25"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};
