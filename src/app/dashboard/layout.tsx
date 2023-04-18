import Link from "next/link";
// TODO: Implement sidenav for dashboard layout
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <nav className="sidebar h-screen w-[300px] overflow-y-auto bg-white p-2 text-center shadow-md lg:left-0">
        {/* <nav className="absolute left-0 top-0 z-[1035] h-full w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"> */}
        <ul className="relative m-0 list-none px-[0.2rem]">
          <li className="relative">
            <Link
              href="/profile"
              className="block rounded-md px-4 py-2 text-primary transition-colors hover:bg-neutral hover:text-white"
            >
              Profile
            </Link>
          </li>
          <li className="relative">
            <Link
              href="/settings"
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
