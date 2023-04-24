import Link from "next/link";
import type { PropsWithChildren } from "react";

export const revalidate = 0;

export default function SideNavItem(
  props: PropsWithChildren<{ href: string }>
) {
  return (
    <li className="relative">
      <Link
        href={props.href}
        className="block rounded-md px-4 py-2 text-primary transition-colors hover:bg-neutral hover:text-white"
      >
        {props.children}
      </Link>
    </li>
  );
}
