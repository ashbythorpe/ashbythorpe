import NavLinks from "./nav-links";
import GitHubIcon from "../github-icon";
import Link from "next/link";

export default function NavHeader() {
  return (
    <header className="bg-black-100 z-50 sticky top-0 w-full">
      <nav className="flex justify-between px-4 py-2 h-full items-center">
        <div className="flex-shrink-0 md:w-1/4 flex">
          <Link
            href="/"
            className="font-mono text-black-600 hover:text-cerise-red-700 transition-colors duration-300 ease-in-out underline decoration-black-100 hover:decoration-energy-yellow-300"
          >
            <h1>ashbythorpe</h1>
          </Link>
        </div>
        <NavLinks />
        <div className="flex-shrink-0 md:w-1/4 flex justify-end">
          <div className="items-center md:border-l md:border-gray-400 pl-2 md:pl-4 h-full justify-self-end">
            <a
              href="https://github.com/ashbythorpe"
              className="text-black-700 hover:text-black-900"
            >
              <GitHubIcon className="w-6 h-auto" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
