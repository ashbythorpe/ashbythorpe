import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { Link } from "@/app/ui/link";
import clsx from "clsx";
import { nunito } from "../ui/fonts";

export default function Page() {
  return (
    <div className="flex-grow w-full bg-gray-100 h-full md:grid md:grid-cols-2 py-4 px-5 md:px-10">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl text-gray-700 underline mt-4 my-4">
          Ashby Thorpe
        </h1>
        <ul className="lg:px-20 md:px-10 px-4 my-4 list-disc [&_li]:pl-2 [&_li::marker]:text-black-600 [&_li::marker]:text-2xl">
          <li>
            Second year student at the University of Bristol studying Maths and
            Computer Science.
          </li>
          <li>Excellent programming and numerical skills.</li>
          <li>
            Experience in software engineering, artificial intelligence and data
            analysis.
          </li>
          <li>Confident team-worker, problem-solver and communicator.</li>
        </ul>
        <a
          href="/cv.pdf"
          download="ashbythorpe-cv.pdf"
          className="no-underline space-x-2 bg-blue-600 rounded p-2 my-6 text-white flex hover:bg-blue-700"
        >
          <DocumentArrowDownIcon className="h-6 w-6" />
          <p className="">Download CV</p>
        </a>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl text-gray-700 underline mt-4 my-4">
          Programming experience
        </h2>
        <ul className="lg:px-20 md:px-10 px-4 list-disc [&_li]:pl-2 [&_li::marker]:text-black-600 [&_li::marker]:text-2xl">
          <li>
            I have used <span className={clsx(nunito, "font-semibold")}>R</span>{" "}
            for several data science projects. I have experience using the{" "}
            <Link href="https://tidyverse.org/">Tidyverse</Link>,{" "}
            <Link href="https://www.tidymodels.org/">Tidymodels</Link>, and{" "}
            <Link href="https://shiny.rstudio.com/">Shiny</Link> packages.
          </li>
          <li>
            In my free time, I learnt{" "}
            <span className={clsx(nunito, "font-semibold")}>Rust</span>, and am
            currently using it to implement a{" "}
            <Link href="https://microsoft.github.io/language-server-protocol/">
              Language Server
            </Link>
            , which is a very complex task.
          </li>
          <li>
            Being the first programming language I learnt,{" "}
            <span className={clsx(nunito, "font-semibold")}>Python</span> has
            been my language of choice for small scripts and projects. Notably,
            I used{" "}
            <Link href="https://beautiful-soup-4.readthedocs.io/en/latest/">
              Beautiful Soup
            </Link>{" "}
            and <Link href="https://www.selenium.dev/">Selenium</Link> for a web
            scraping project.
          </li>
          <li>
            I have experience with{" "}
            <span className={clsx(nunito, "font-semibold")}>JavaScript</span>/
            <span className={clsx(nunito, "font-semibold")}>TypeScript</span>,
            and have used the <Link href="https://nextjs.org/">Next.js</Link>{" "}
            and <Link href="https://reactjs.org/">React</Link> frameworks for my
            personal website and{" "}
            <Link href="https://github.com/kasimrafique/BrisHack2024">
              another project
            </Link>{" "}
            I worked on during a hackathon.
          </li>
          <li>
            I have learnt{" "}
            <span className={clsx(nunito, "font-semibold")}>Java</span>,{" "}
            <span className={clsx(nunito, "font-semibold")}>C</span> and{" "}
            <span className={clsx(nunito, "font-semibold")}>Haskell</span>{" "}
            during my time at university, and used them for a few small
            projects. Notably, I created an concurrent implementation of the{" "}
            <Link href="https://en.wikipedia.org/wiki/Monte_Carlo_tree_search">
              MCTS
            </Link>{" "}
            algorithm as part of a pair project for university (see{" "}
            <Link href="https://www.researchgate.net/publication/224259872_Monte-Carlo_Tree_Search_for_the_Game_of_Scotland_Yard">
              the paper
            </Link>{" "}
            we used)
          </li>
          <li>
            I have made extensive use of{" "}
            <span className={clsx(nunito, "font-semibold")}>Git</span>.
          </li>
        </ul>
      </div>
    </div>
  );
}
