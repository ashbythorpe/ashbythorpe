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
    <div className="flex items-center space-x-7 justify-evenly justify-self-center mx-auto">
      {links.map(({ name, href, icon: Icon }) => (
        <Link
          href={href}
          key={name}
          className={clsx(
            "rounded py-1 px-2 text-sm font-medium hover:underline hover:bg-black-700/15",
            nunito,
            {
              "bg-black-700/10": pathname === href,
            },
          )}
        >
          <div className="flex items-center space-x-2">
            <Icon className="h-6 w-6" aria-hidden="true" />
            <p className="hidden md:block">{name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
