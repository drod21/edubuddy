"use client";
import { type PropsWithChildren, useState } from "react";
import SideNavArrow from "./SideNavArrow";
import classNames from "classnames";
import { Bars3Icon } from "@heroicons/react/24/outline";

// components/Sidebar.tsx
import React from "react";
import cn from "classnames";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import Logo from "./logo";
// 👇 props to get and set the collapsed state from parent component
type Props = {
  collapsed: boolean;
  setCollapsed(collapsed: boolean): void;
};
const Sidebar = ({
  children,
  collapsed,
  setCollapsed,
}: PropsWithChildren<Props>) => {
  // 👇 use the correct icon depending on the state.
  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;
  return (
    <div
      className={classNames({
        "fixed z-20 bg-indigo-700 text-zinc-50 md:static md:translate-x-0":
          true,
        "transition-all duration-300 ease-in-out": true,
        "w-[300px]": !collapsed,
        "w-16": collapsed,
      })}
    >
      <div
        className={classNames({
          "sticky inset-0 flex h-screen w-full flex-col justify-between": true,
        })}
      >
        {/* logo and collapse button */}
        <div
          className={classNames({
            "flex items-center border-b border-b-indigo-800 transition-none":
              true,
            "justify-between p-4": !collapsed,
            "justify-center py-4": collapsed,
          })}
        >
          {!collapsed && <span className="whitespace-nowrap"></span>}
          <button
            className="grid h-10 w-10 place-content-center rounded-full opacity-100 hover:bg-indigo-800 md:opacity-100"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-grow">
          <ul
            className={classNames({
              "my-2 flex flex-col items-stretch gap-2": true,
              hidden: collapsed,
            })}
          >
            {children}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default function SideNav(props: PropsWithChildren) {
  const [collapsed, setSidebarCollapsed] = useState(false);
  return (
    <div
      className={classNames({
        // 👇 use grid layout
        "grid min-h-screen": true,
        // 👇 toggle the width of the sidebar depending on the state
        "grid-cols-sidebar": !collapsed,
        "grid-cols-sidebar-collapsed": collapsed,
        // 👇 transition animation classes
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
      })}
    >
      {/* sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setSidebarCollapsed}>
        {props.children}
      </Sidebar>
    </div>
  );
}
