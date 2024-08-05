import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Basic Info",
    href: "/basic-info",
  },
  {
    label: "Credits",
    href: "/credits",
  },
  {
    label: "Gaps and Needs",
    href: "/gaps-and-needs",
  },
  {
    label: "Objectives and Outcomes",
    href: "/objectives-and-outcomes",
  },
  {
    label: "Commercial Support",
    href: "/commercial-support",
  },
  {
    label: "Commendation Criteria",
    href: "/commendation-criteria",
  },
  {
    label: "Files",
    href: "/files",
  },
  {
    label: "Comments",
    href: "/comments",
  },
];

export function Nav() {
  return (
    <ul className="flex flex-col gap-y-1 -mx-4">
      {navItems.map((item) => (
        <li key={item.href}>
          <NavLink
            to={item.href}
            className={({ isActive }) =>
              cn(
                "block py-2 px-4 rounded-md text-sm hover:bg-muted",
                isActive
                  ? "font-medium text-foreground bg-muted"
                  : "font-normal text-muted-foreground hover:text-foreground"
              )
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
