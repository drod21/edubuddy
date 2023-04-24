import Link from "next/link";
import SideNav from "./SideNav";
export const revalidate = 0;

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <SideNav />
      {children}
    </div>
  );
}

export default Layout;
