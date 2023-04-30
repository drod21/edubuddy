import { useId } from "react";
import SideNav from "./SideNav";
import SideNavItem from "./SideNavItem";
import { sideNavRoutes } from "~/utils/sidenavRoutes";
export const revalidate = 0;

function Layout({ children }: { children: React.ReactNode }) {
  const id = useId();

  return (
    <div className="flex md:flex-row">
      <SideNav>
        {sideNavRoutes.map((route) => (
          <SideNavItem key={route.href + id} href={route.href}>
            {route.label}
          </SideNavItem>
        ))}
      </SideNav>
      <div className="mx-2 flex-grow">{children}</div>
    </div>
  );
}

export default Layout;
