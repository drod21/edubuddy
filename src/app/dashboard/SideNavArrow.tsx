import type { Dispatch, SetStateAction } from "react";

export default function SideNavArrow({
  sideNavOpen,
  setSideNavOpen,
}: {
  sideNavOpen: boolean;
  setSideNavOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      className="text-neutral focus:outline-none md:hidden"
      onClick={() => setSideNavOpen((prev) => !prev)}
    >
      <svg
        className={`h-6 w-6 transition-transform duration-200 ${
          sideNavOpen ? "" : "rotate-180"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M14.707 5.293a1 1 0 010 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
}
