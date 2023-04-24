import { useId } from "react";
import SideNavItem from "./SideNavItem";

export const revalidate = 0;

const sideNavRoutes = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/learn", label: "Learn" },
  { href: "/dashboard/teach", label: "Teach" },
  { href: "/dashboard/practice", label: "Practice" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/settings", label: "Settings" },
  { href: "/logout", label: "Logout" },
];

export default function SideNav() {
  const id = useId();

  return (
    <nav className="sidebar h-screen w-[300px] overflow-y-auto bg-white p-2 text-left shadow-md lg:left-0">
      <ul className="relative m-0 list-none px-[0.2rem]">
        {sideNavRoutes.map((route) => (
          <SideNavItem key={route.href + id} href={route.href}>
            {route.label}
          </SideNavItem>
        ))}
      </ul>
    </nav>
  );
}
