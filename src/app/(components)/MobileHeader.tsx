"use client";
import { type PropsWithChildren, useState } from "react";
import "./MobileHeader.css";

export default function MobileHeader({ children }: PropsWithChildren) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <section id="mobile-menu" className="flex lg:hidden">
      {!isNavOpen && (
        <div
          id="hamburger-menu"
          className=" space-y-2"
          onClick={() => setIsNavOpen(true)}
        >
          <span className="block h-0.5 w-8 animate-pulse bg-gray-600" />
          <span className="block h-0.5 w-8 animate-pulse bg-gray-600" />
          <span className="block h-0.5 w-8 animate-pulse bg-gray-600" />
        </div>
      )}
      {isNavOpen && (
        <div>
          <div
            className="absolute right-0 top-0 px-8 py-8"
            onClick={() => setIsNavOpen(false)}
          >
            <svg
              className="h-8 w-8 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <div
            id="mobile-nav-open"
            className="flex min-h-[250px] flex-col items-center justify-between"
          >
            {children}
          </div>
        </div>
      )}
    </section>
  );
}
