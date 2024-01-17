import NavLinks from "./nav-links";
import GitHubIcon from "../github-icon";
import Link from "next/link";

export default function NavHeader() {
  return (
    <header className="bg-gray-900 z-50 sticky top-0 w-full">
      <nav className="flex justify-between px-4 py-2 h-full items-center">
        <Link
          href="/"
          className="font-mono text-gray-600 hover:text-sky-300 transition-colors duration-300 ease-in-out underline decoration-gray-900 hover:decoration-teal-400 mr-2 md:mr-4"
        >
          <h1>ashbythorpe</h1>
        </Link>
        <NavLinks />
        <div className="flex-shrink items-center md:border-l md:border-gray-400 pl-2 md:pl-4 h-full">
          <a
            href="https://github.com/ashbythorpe"
            className="text-gray-50 hover:text-gray-500"
          >
            <GitHubIcon className="w-6 h-auto" />
          </a>
        </div>
      </nav>
    </header>
  );
}
