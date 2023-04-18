import Link from 'next/link';
// TODO: Implement sidenav for dashboard layout
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
		<div>
    <nav className="bg-white shadow-md rounded-md p-4 space-y-4">
      <Link href="/profile">
        <a className="block px-4 py-2 text-primary hover:bg-neutral hover:text-white rounded-md transition-colors">
          Profile
        </a>
      </Link>
      <Link href="/settings">
        <a className="block px-4 py-2 text-primary hover:bg-neutral hover:text-white rounded-md transition-colors">
          Settings
        </a>
      </Link>
      <Link href="/logout">
        <a className="block px-4 py-2 text-primary hover:bg-neutral hover:text-white rounded-md transition-colors">
          Logout
        </a>
      </Link>
    </nav>
		{children}
		</div>
  );
};



  return children;
}
