import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { Link } from "@/app/ui/link";
import clsx from "clsx";
import { nunito } from "../ui/fonts";

export default function Page() {
  return (
    <div className="flex-grow w-full bg-gray-100 p-4 h-full flex flex-col items-center">
      <h1 className="text-3xl text-gray-700 underline">Ashby Thorpe</h1>
      <a
        href="/cv.pdf"
        download="ashbythorpe-cv.pdf"
        className="no-underline bg-blue-600 rounded p-2 mt-4 text-white flex hover:bg-blue-700"
      >
        <DocumentArrowDownIcon className="h-6 w-6" />
        <p className="">Download CV</p>
      </a>
      <h2 className="text-2xl text-gray-700 mt-4 my-4">
        Programming experience
      </h2>
      <ul className="lg:px-20 md:px-10 px-4 list-image-[url('/checkmark.svg')] [&_li]:pl-2">
        <li>
          I have used <span className={clsx(nunito, "font-semibold")}>R</span>{" "}
          for several data science projects. I have experience using the{" "}
          <Link href="https://tidyverse.org/">Tidyverse</Link>,{" "}
          <Link href="https://www.tidymodels.org/">Tidymodels</Link>, and{" "}
          <Link href="https://shiny.rstudio.com/">Shiny</Link> packages.
        </li>
        <li>
          Being the first programming language I learnt,{" "}
          <span className={clsx(nunito, "font-semibold")}>Python</span> has been
          my language of choice for small scripts and projects. Notably, I
          recently used{" "}
          <Link href="https://beautiful-soup-4.readthedocs.io/en/latest/">
            Beautiful Soup
          </Link>{" "}
          and <Link href="https://www.selenium.dev/">Selenium</Link> for a web
          scraping project.
        </li>
        <li>
          I have experience with{" "}
          <span className={clsx(nunito, "font-semibold")}>JavaScript</span>/
          <span className={clsx(nunito, "font-semibold")}>TypeScript</span>, and
          have used the <Link href="https://nextjs.org/">Next.js</Link> and{" "}
          <Link href="https://reactjs.org/">React</Link> frameworks.
        </li>
        <li>
          In my free time, I learnt{" "}
          <span className={clsx(nunito, "font-semibold")}>Rust</span>, and am
          currently using it to implement a simple neural network.
        </li>
        <li>
          I have learnt <span className={clsx(nunito, "font-semibold")}>C</span>{" "}
          and <span className={clsx(nunito, "font-semibold")}>Haskell</span>{" "}
          during my time at university, and used them for a few small projects.
        </li>
        <li>
          I am currently teaching myself{" "}
          <span className={clsx(nunito, "font-semibold")}>Java</span>.
        </li>
        <li>
          I have made extensive use of{" "}
          <span className={clsx(nunito, "font-semibold")}>Git</span>.
        </li>
      </ul>
    </div>
  );
}
