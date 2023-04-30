import classNames from "classnames";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export const revalidate = 0;

export default function SideNavItem(
  props: PropsWithChildren<{ href: string }>
) {
  return (
    <li
      className={classNames({
        "flex text-indigo-100 hover:bg-indigo-900": true, //colors
        "transition-colors duration-300": true, //animation
        "mx-3 gap-4 rounded-md p-2 ": true,
      })}
    >
      <Link
        href={props.href}
        className="block rounded-md px-4 py-2 text-white transition-colors hover:bg-neutral hover:text-white"
      >
        {props.children}
      </Link>
    </li>
  );
}
