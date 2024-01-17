"use client";

import {
  InformationCircleIcon,
  CodeBracketSquareIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nunito } from "./fonts";

const links = [
  { name: "About me", href: "/about", icon: InformationCircleIcon },
  { name: "Projects", href: "/projects", icon: CodeBracketSquareIcon },
  { name: "Blog", href: "/blog", icon: PencilSquareIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex items-center space-x-7 mr-4 justify-evenly">
      {links.map(({ name, href, icon: Icon }) => (
        <div
          key={name}
          className={clsx("rounded p-1", {
            "bg-gray-50": pathname === href,
            "hover:bg-gray-800": pathname !== href,
          })}
        >
          <Link
            href={href}
            className={clsx("text-sm", nunito.className, {
              "text-gray-800 font-medium": pathname === href,
              "text-gray-50": pathname !== href,
            })}
          >
            <div className="flex items-center space-x-2">
              <Icon className="h-6 w-6" aria-hidden="true" />
              <p className="hidden md:block">{name}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
