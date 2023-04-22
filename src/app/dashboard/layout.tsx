"use client";
import Link from "next/link";
import { api } from "~/utils/api";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <nav className="sidebar h-screen w-[300px] overflow-y-auto bg-white p-2 text-center shadow-md lg:left-0">
        <ul className="relative m-0 list-none px-[0.2rem]">
          <li className="relative">
            <Link
              href="/dashboard/profile"
              className="block rounded-md px-4 py-2 text-primary transition-colors hover:bg-neutral hover:text-white"
            >
              Profile
            </Link>
          </li>
          <li className="relative">
            <Link
              href="/dashboard/settings"
              className="block rounded-md px-4 py-2 text-primary transition-colors hover:bg-neutral hover:text-white"
            >
              Settings
            </Link>
          </li>
          <li className="relative">
            <Link
              href="/logout"
              className="block rounded-md px-4 py-2 text-primary transition-colors hover:bg-neutral hover:text-white"
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}

export default api.withTRPC(Layout);
