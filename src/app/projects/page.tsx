import { Project } from "../ui/project";

export default function Page() {
  return (
    <>
      <div className="flex flex-col h-full w-full items-center bg-black-50">
        <h1 className="text-4xl font-semibold mt-8">Projects</h1>
        <p className="mt-4 ms-4">
          This is an array of open source projects I've worked on independently
          over the past few years.
        </p>
      </div>
      <div className="flex flex-grow h-full w-full bg-black-50 flex-wrap p-4">
        <div className="flex flex-col w-full md:w-1/2 items-center">
          <Project
            title="selenider"
            href="https://ashbythorpe.github.io/selenider/"
          >
            A semi-popular R package to facilitate high level browser
            automation, using Selenium and the Chrome Devtools Protocol.
          </Project>
          <Project
            title="selenium-r"
            href="https://ashbythorpe.github.io/selenium-r/"
          >
            Interface to Selenium from R.
          </Project>
          <Project
            title="financialDataAnalysis"
            href="https://github.com/ashbythorpe/financialDataAnalysis"
          >
            A website made using Shiny, to analyze, forecast and visualise
            financial data.
          </Project>
        </div>
        <div className="flex flex-col w-full md:w-1/2 items-center">
          <Project
            title="nestedmodels"
            href="https://ashbythorpe.github.io/nestedmodels/"
          >
            An R package, enhancing the tidymodels framework to support the
            modelling of nested data.
          </Project>
          <Project
            title="ashbythorpe.com"
            href="https://github.com/ashbythorpe/ashbythorpe.com"
          >
            This website! Made using React and Next.js. Includes a fully
            functional login and comment system.
          </Project>
          <Project
            title="r-analyzer"
            href="https://github.com/ashbythorpe/r-analyzer"
          >
            An (soon-to-be) implementation of the Language Server Protocol for
            R, written in Rust. Currently consists of a hand-written
            fault-tolerant Pratt parser.
          </Project>
        </div>
      </div>
    </>
  );
}
