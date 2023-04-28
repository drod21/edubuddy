import SideNav from "./SideNav";
export const revalidate = 0;

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row">
      <SideNav />
      {children}
    </div>
  );
}

export default Layout;
